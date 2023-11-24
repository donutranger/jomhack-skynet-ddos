import sys
import os
sys.path.append(os.curdir + '/package')

import json
import boto3
import base64
import hashlib
import re
import openai

BUSINESS_OVERVIEW_PROMPT = """
You are an AI trained to analyze 10-K reports and provide ratings for various aspects of a company. 
You have just finished analyzing the attached 10-K report. 
Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
Your response should be in JSON format and include the following fields:

- "market_position_rating": The company's market position rating
- "market_position_rating_reason": The reason for the company's market position rating
- "competitive_analysis_rating": The company's competitive analysis rating
- "competitive_analysis_rating_reason": The reason for the company's competitive analysis rating
- "industry_market_analysis": The company's industry and market analysis rating
- "industry_market_analysis_reason": The reason for the company's industry and market analysis rating
"""




def upload_business_overview(event, context):
    return process_file('business_overview', event)

def upload_financial_statements(event, context):
    return process_file('financial_statements', event)

def upload_compliance(event, context):
    return process_file('compliance', event)

    
def process_file(type_of_file, event):
    try:
        file_content = get_file_content(event)
        checksum = calculate_checksum(file_content)
        file_name = type_of_file + "_"+checksum+".pdf" 
        print(file_name)

        if is_file_exists(file_name):
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'result': {
                        'id': checksum,
                        'message': 'File already exists',
                    }
                })
            }
        
        s3 = boto3.client('s3')
        bucket_name = os.environ['BUCKET_NAME']
        s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'result': {
                    'id': checksum,
                    'message': 'File uploaded successfully',
                }
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': {
                    'message': 'Error in uploading file: ' + str(e),
                }
            })
        }

        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': {
                    'message': 'Error in processing file: ' + str(e),
                }
            })
        }

def analyze_file(type, content):
    client = openai.OpenAI(api_key=os.environ['OPENAI_API_KEY'])

    assistant = client.beta.assistants.create(
        name="Risk Engine",
        instructions="You are an AI trained to analyze 10-K reports",
        tools=[{"type": "retrieval"}],
        model="gpt-4-1106-preview",
    )

    file = client.files.create(
        file=content,
        purpose='assistants'
    )

    client.beta.assistants.files.create(
        assistant_id=assistant.id,
        file_id=file.id
    )

    thread = client.beta.threads.create()
    
    #TODO: change prompt based on type
    promt = BUSINESS_OVERVIEW_PROMPT

    message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    file_ids=[file.id],
    content=promt
    )

    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
        instructions="",
        )


    while True:
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )

        if run.status == "completed":
            print("done!")
            messages = client.beta.threads.messages.list(
                thread_id=thread.id
            )

            print("messages: ")
            for message in messages:
                print({
                    "role": message.role,
                    "message": message.content[0].text.value
                })

            client.beta.assistants.delete(assistant.id)
            
            break
        else:
            print("in progress...")
            time.sleep(5)
    return

def calculate_checksum(file_content):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(file_content)
    return sha256_hash.hexdigest()

def is_file_exists(file_name):
    s3 = boto3.client('s3')
    bucket_name = os.environ['BUCKET_NAME']
    try:
        s3.head_object(Bucket=bucket_name, Key=file_name)
        return True
    except:
        return False

def get_file_content(event):
    content_type = event['headers'].get('Content-Type', '') 
    content_type = content_type or event['headers'].get('content-type', '')

    if not content_type:
        raise Exception("Can't find content-type header")

    b = re.search('boundary=(.*)$', content_type).group(1)
    if not b:
        raise Exception("Can't find content-type boundary")


    boundary = b''.join((b'--', b.encode()))
    content = base64.b64decode(event['body'])

    prefix_len = len(boundary) + 2
    content = content[prefix_len:]
    def test_part(part):
        return (part != b'' and
                part != b'\r\n' and
                part[:4] != b'--\r\n' and
                part != b'--')

    parts = content.split(b''.join((b'\r\n', boundary)))
    parts = tuple(x for x in parts if test_part(x))

    return parts[0]
