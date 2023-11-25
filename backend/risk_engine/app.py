import sys
import os
sys.path.append(os.curdir + '/package')

import json
import boto3
import base64
import hashlib
import re
import openai
from requests_toolbelt.multipart import decoder
import time

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


CAPITAL_PROMPT = """
Please analyze the attached document, which contains a table relevant to investment or shareholder information. 

Investor Name
Holder Type
Shares Held
Investment Type

Based on the extracted data, please provide a rating for capital risk the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
For example, if the company has a high amount of debt, you should provide a high rating for capital risk.
Your response should be in JSON format and include the following fields:

- "capital_risk_rating": The company's capital risk rating
- "capital_risk_rating_reason": The reason for the company's capital risk rating
"""

RISK_ENGINE_PROMT = """
You are an AI trained to analyze 10-K reports and proved risk evaluation for approving loan
You have just finished analyzing the attached 10-K and provided report for each section, that can in SECTION_REPORTS:
You need to provide risk rating for the company based on the reports from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
Your response should be in JSON format and include the following fields:

- "risk_rating": The company's risk rating
- "risk_rating_reason": The reason for the company's risk rating


SECTION_REPORTS:
"""

def option_handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'body': ''
    }

def upload_business_overview(event, context):
    result = process_file('business_overview', event)

    if result['statusCode'] == 500:
        return result
    
    response_body = json.loads(result['body'])
    company_info = get_mocked_company_info(response_body['result']['id'])

    result['body'] = json.dumps({
        'result': {
            'id': response_body['result']['id'],
            'company_info': company_info,
            'message': response_body['result']['message'],
        }
    })

    return result

def upload_financial_statements(event, context):
    result = process_file('financial_statements', event)

    if result['statusCode'] == 500:
        return result

    response_body = json.loads(result['body'])
    company_statements = get_mocked_company_statement(response_body['result']['id'])

    result['body'] = json.dumps({
        'result': {
            'id': response_body['result']['id'],
            'company_statements': company_statements,
            'message': response_body['result']['message'],
        }
    })

    return result

def upload_compliance(event, context):
    result = process_file('compliance', event)

    if result['statusCode'] == 500:
        return result

    response_body = json.loads(result['body'])
    revenue = get_mocked_revenue(response_body['result']['id'])

    result['body'] = json.dumps({
        'result': {
            'id': response_body['result']['id'],
            'revenue': revenue,
            'message': response_body['result']['message'],
        }
    })

    return result
    

def upload_capital(event, context):
    return process_file('capital', event)

    
def process_file(type_of_file, event):
    try:
        file_content = get_file_content(event)
        checksum = calculate_checksum(file_content)
        file_name = type_of_file + "_"+checksum+".pdf" 

        if is_file_exists(file_name):
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps({
                    'result': {
                        'id': checksum,
                        'message': 'File already exists',
                    }
                })
            }

        save_fail_to_s3(file_name, file_content)

        # analyze_file(checksum, type_of_file, file_content)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
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
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'error': {
                    'message': 'Error in uploading file: ' + str(e),
                }
            })
        }

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
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
        capital_id = body.get('capital_id', '')

        if not all([business_overview_id, financial_statements_id, compliance_id, capital_id]):
            raise ValueError("Missing required field.")

        sha256_hash = hashlib.sha256()
        sha256_hash.update((business_overview_id + financial_statements_id + compliance_id + capital_id).encode('utf-8'))
        checksum = sha256_hash.hexdigest()

        reports_file_name = "reports_"+checksum+".json"

        if is_file_exists(reports_file_name):
            combined_reports = get_file_content_from_s3(reports_file_name)

            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                },
                'body': json.dumps({
                    'result': json.loads(combined_reports)
                })
            }

        
        if not is_file_exists("business_overview_"+business_overview_id+".json"):
            raise ValueError("Business overview results is not ready yet")

        if not is_file_exists("financial_statements_"+financial_statements_id+".json"):
            raise ValueError("Financial statements results is not ready yet")

        if not is_file_exists("compliance_"+compliance_id+".json"):
            raise ValueError("Compliance results is not ready yet")

        if not is_file_exists("capital_"+capital_id+".json"):
            raise ValueError("Capital results is not ready yet")

        business_overview_result = get_file_content_from_s3("business_overview_"+business_overview_id+".json")
        financial_statements_result = get_file_content_from_s3("financial_statements_"+financial_statements_id+".json")
        compliance_result = get_file_content_from_s3("compliance_"+compliance_id+".json")
        capital_result = get_file_content_from_s3("capital_"+capital_id+".json")

        combined_reports = {
            'business_overview': json.loads(business_overview_result),
            'financial_statements': json.loads(financial_statements_result),
            'compliance': json.loads(compliance_result),
            'capital': json.loads(capital_result),
        }

        risk_rating = calculate_risk_rating(json.dumps(combined_reports))

        if risk_rating is None:
            raise ValueError("Failed to calculate risk rating")

        combined_reports['risk_rating'] = json.loads(risk_rating)

        save_fail_to_s3(reports_file_name, json.dumps(combined_reports))

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
            },
            'body': json.dumps({
                'result': combined_reports
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
            },
            'body': json.dumps({
                'error': {
                    'message': 'Error in processing file: ' + str(e),
                }
            })
        }

def calculate_risk_rating (combined_reports):
    client = openai.OpenAI()

    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI trained to analyze 10-K reports and proved risk evaluation for approving loan"},
            {"role": "user", "content": RISK_ENGINE_PROMT + json.dumps(combined_reports)},
        ],
    )
    
    assistant_reply = completion.choices[0].message.content

    return parse_result(assistant_reply)
    

def analyze_file(id, type_of_file, content):
    client = openai.OpenAI()

    assistant = client.beta.assistants.create(
        name="Risk Engine",
        instructions="You are an AI trained to analyze 10-K reports, and provide ratings for various aspects of a company.",
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
        "compliance": COMPLIANCE_PROMPT,
        "capital": CAPITAL_PROMPT,
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

    if parsed_result is None:
        print("Failed to parse GPT result")
        return

    save_fail_to_s3(type_of_file+"_"+id+".json", json.dumps(parsed_result))

    return

def parse_result(result):
    match = re.search(r'(\{[^\}]+\})', result, re.MULTILINE | re.DOTALL)

    json_code_block = match.group(1).strip() if match else None

    return json_code_block

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

            for message in messages:
                print(message.content[0].text.value)
                return message.content[0].text.value

            raise Exception("Failed to retrieve messages")

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

    has_boundary = re.search(r'boundary=(.*)', content_type)

    content = base64.b64decode(event['body'])
    suffix = b''
    if not has_boundary:
        boundary = content.split(b'\r\n',2)[0]
        content_type = 'multipart/form-data; boundary=' + boundary.decode()
        suffix = b''.join((b'\r\n', boundary, b'--\r\n'))
        
    file_content = decoder.MultipartDecoder(content, content_type).parts[0].content

    if suffix and suffix == file_content[-len(suffix):]:
        file_content = file_content[:-len(suffix)]

    if not file_content:
        raise Exception("Can't find file content")

    return file_content


def get_mocked_company_info(id):
    #TODO: Mock for now in future this information will be fetched from database or goverment services
    return {
        "name": "Booking Holdings Inc",
        "registration_number": "06-1528493",
        "incorporation_date": "2001-07-30",
        "registration_address": "800 Connecticut Avenue, Norwalk, CT",
        "registration_postcode": "06854",
        "origin_country": "Nederland",
        "business_address": "800 Connecticut Avenue, Norwalk, CT",
        "business_postcode": "06854",
        "industry": "Travel Services",
    }

def get_mocked_company_statement(id):
    return [
        {
            "year": "2020",
            "revenue": "10,000,000",
            "equity": "5,000,000",
            "liabilities": "5,000,000",
            "cash_from_operations": "2,000,000",
            "cash_from_investing": "1,000,000",
            "net_cash": "3,000,000",
        },
        {
            "year": "2019",
            "revenue": "9,000,000",
            "equity": "4,000,000",
            "liabilities": "5,000,000",
            "cash_from_operations": "1,000,000",
            "cash_from_investing": "1,000,000",
            "net_cash": "2,000,000",
        },
        {
            "year": "2018",
            "revenue": "8,000,000",
            "equity": "3,000,000",
            "liabilities": "5,000,000",
            "cash_from_operations": "1,000,000",
            "cash_from_investing": "1,000,000",
            "net_cash": "2,000,000",
        },
    ]

def get_mocked_revenue(id):
    return [
        {
            "month": "2020-01",
            "revenue": 1000000,
        },
        {
            "month": "2020-02",
            "revenue": 800000,
        },
        {
            "month": "2020-03",
            "revenue": 900000,
        },
        {
            "month": "2020-04",
            "revenue": 400000,
        },
        {
            "month": "2020-05",
            "revenue": 300000,
        },
        {
            "month": "2020-06",
            "revenue": 900000,
        },
        {
            "month": "2020-07",
            "revenue": 1300000,
        },
        {
            "month": "2020-08",
            "revenue": 1200000,
        },
        {
            "month": "2020-09",
            "revenue": 1600000,
        },
        {
            "month": "2020-10",
            "revenue": 1300000,
        },
        {
            "month": "2020-11",
            "revenue": 1200000,
        },
        {
            "month": "2020-12",
            "revenue": 1100000,
        },
    ]