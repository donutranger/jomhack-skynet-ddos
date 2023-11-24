import json
import boto3
import os
import logging
from botocore.exceptions import ClientError

# Initialize logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Get the table name from environment variables
TABLE_NAME = os.environ.get('DYNAMODB_TABLE', 'wonderlend_skynet')

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    # Log the received event
    logger.info(f"Received event: {event}")
    
    try:
        # Load the body from the event
        body = json.loads(event.get('body', '{}'))
        
        # Extract fields with validation
        org_name = body.get('company_name')
        funds_needed = body.get('funds_needed')
        runway_period = body.get('runway_period')
        use_of_funds = body.get('use_of_funds')
        market_strategy = body.get('market_strategy')
        cust_acq_cost = body.get('cust_acq_cost')
        pdpa_details = body.get('pdpa_details')
        
        # Validate the necessary fields are provided
        if not all([org_name, funds_needed, runway_period, use_of_funds]):
            raise ValueError("Missing required field.")

        # Prepare the item to insert into DynamoDB
        item = {
            'id': context.aws_request_id,
            'org_name': org_name,
            'request_amt': funds_needed,
            'runaway_period': runway_period,
            'use_of_funds': use_of_funds,
            'market_strategy': market_strategy,
            'cust_acq_cost': cust_acq_cost,
            'pdpa_details': pdpa_details,
        }
        
        # Write the item to DynamoDB
        table.put_item(Item=item)
        
        # Return a successful response with the id of the created record
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Input processed and stored successfully', 'id': context.aws_request_id})
        }
    except ClientError as e:
        logger.error(f"Error writing to DynamoDB: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f"Error writing to DynamoDB: {e}"})
        }
    except ValueError as e:
        logger.warning(f"Validation error: {e}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'An unexpected error occurred'})
        }
