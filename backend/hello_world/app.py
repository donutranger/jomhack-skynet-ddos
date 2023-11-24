import json
import boto3
import os
import base64
import hashlib
from cgi import parse_header, parse_multipart, FieldStorage
from io import BytesIO
import re



def upload_business_overview(event, context):
    try:
        file_content = get_file_content(event)
        checksum = calculate_checksum(file_content)
        file_name = "buisnes_overview_"+checksum+".pdf" 
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

def process_business_overview(event, context):
    print("Processing buisnes overview...")

    print(event)


    # try:
    #     file_content = base64.b64decode(event['body'])
    #     file_name = "buisnes_overview.pdf"
    #     s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)
    #     return {
    #         'statusCode': 200,
    #         'body': 'File uploaded successfully'
    #     }
    # except Exception as e:
    return {
        'statusCode': 500,
        'body': 'Error in processing file: '
    }


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
