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

FINANCIAL_STATEMENTS_PROMPT = """
You are an AI trained to analyze 10-K Part 2 reports and provide ratings for various aspects of a company. 
You have just finished analyzing the attached 10-K report Part 2. 
Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
Your response should be in JSON format and include the following fields:

- "liquidity_rating": The company's liquidity rating
- "liquidity_rating_reason": The reason for the company's liquidity rating
- "solvency_rating": The company's solvency rating
- "solvency_rating_reason": The reason for the company's solvency rating
- "financial_risk_rating": The company's financial risk rating
- "financial_risk_rating_reason": The reason for the company's financial risk rating
"""

COMPLIANCE_PROMPT = """
You are an AI trained to analyze 10-K Part 4 reports and provide ratings for various aspects of a company. 
You have just finished analyzing the attached 10-K report Part 4. 
Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
Your response should be in JSON format and include the following fields:

- "compliance_rating": The company's compliance rating
- "compliance_rating_reason": The reason for the company's compliance rating
- "market_risk_rating": The company's market risk rating
- "market_risk_rating_reason": The reason for the company's market risk rating
- "revenue_growth_rating": The company's revenue growth rating
- "revenue_growth_rating_reason": The reason for the company's revenue growth rating
- "esg_rating": The company's ESG (Environmental, Social, Governance) rating
- "esg_rating_reason": The reason for the company's ESG rating
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

        save_fail_to_s3(file_name, file_content)

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

def risk_report(event, context):
    try: 
        if event.get('body', '') == '':
            raise ValueError("Missing required field.")

        json_body = base64.b64decode(event['body'])
        body = json.loads(json_body)

        business_overview_id = body.get('business_overview_id', '')
        financial_statements_id = body.get('financial_statements_id', '')
        compliance_id = body.get('compliance_id', '')

        if not all([business_overview_id, financial_statements_id, compliance_id]):
            raise ValueError("Missing required field.")
        
        if not is_file_exists("business_overview_"+business_overview_id+".json"):
            raise ValueError("Business overview results is not ready yet")

        if not is_file_exists("financial_statements_"+financial_statements_id+".json"):
            raise ValueError("Financial statements results is not ready yet")

        if not is_file_exists("compliance_"+compliance_id+".json"):
            raise ValueError("Compliance results is not ready yet")

        business_overview_result = get_file_content_from_s3("business_overview_"+business_overview_id+".json")
        financial_statements_result = get_file_content_from_s3("financial_statements_"+financial_statements_id+".json")
        compliance_result = get_file_content_from_s3("compliance_"+compliance_id+".json")

        return {
            'statusCode': 200,
            'body': json.dumps({
                'result': {
                    'business_overview': json.loads(business_overview_result),
                    'financial_statements': json.loads(financial_statements_result),
                    'compliance': json.loads(compliance_result),
                }
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': {
                    'message': 'Error in processing file: ' + str(e),
                }
            })
        }

def analyze_file(id, type_of_file, content):
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
    
    promts = {
        "business_overview": BUSINESS_OVERVIEW_PROMPT,
        "financial_statements": FINANCIAL_STATEMENTS_PROMPT,
        "compliance": COMPLIANCE_PROMPT
    }

    promt = promts[type_of_file]

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

    result = wait_for_assistant_to_complete(thread.id, run.id) 

    client.beta.assistants.delete(assistant.id)

    parsed_result = parse_result(result)

    save_fail_to_s3(type_of_file+"_"+id+".json", json.dumps(parsed_result))

    return

def parse_result(result):
    #TODO: parse result to extract json, for now just return it as is

    return result

def get_file_content_from_s3(file_name):
    s3 = boto3.client('s3')
    bucket_name = os.environ['BUCKET_NAME']
    response = s3.get_object(Bucket=bucket_name, Key=file_name)
    content = response['Body'].read().decode('utf-8')

    return content
    
def save_fail_to_s3(file_name, content):
    s3 = boto3.client('s3')
    bucket_name = os.environ['BUCKET_NAME']
    s3.put_object(Bucket=bucket_name, Key=file_name, Body=content)

    return

def wait_for_assistant_to_complete(thread_id, run_id):
    client = openai.OpenAI(api_key=os.environ['OPENAI_API_KEY'])

    while True:
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )

        if run.status == "completed":
            messages = client.beta.threads.messages.list(
                thread_id=thread_id
            )

            return messages[0].content[0].text.value
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
