import json
import random
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import logging
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
logger = logging.getLogger()
logger.setLevel(logging.INFO)
patch_all()
# Initialize the DynamoDB resource outside the handler to reuse across invocations
dynamodb = boto3.resource('dynamodb')

## Define table name and key names
table_name = 'magic8ball-ddb-tbl'
partition_key_name = 'lookup'
sort_key_name = 'value'

# Reference the table
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # Generate a random number between 1 and 20
    random_number = random.randint(1, 20)
    try:
        # Query the table
        response = table.query(
            KeyConditionExpression=Key(partition_key_name).eq(random_number)
        )
        
        # Check if any items are returned
        items = response.get('Items', [])
        if items:
            # Assuming there's at least one item, get the first item's image file name
            image_file_name = items[0].get(sort_key_name, None)
            if image_file_name:
                # Construct the URL path
                url = f"./images/{image_file_name}"
                return {
                    'statusCode': 200,
                    'body': url,
                    'headers': 
                        {
                        'Access-Control-Allow-Headers' : 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                        'Content-Type' : 'text/plain'
                        }
                    }
            else:
                return {
                    'statusCode': 404,
                    'body': 'Image file name not found.',
                    'headers': {
                        'Content-Type': 'text/plain'
                    }
                }
        else:
            return {
                'statusCode': 404,
                'body': 'Item not found.',
                'headers': {
                    'Content-Type': 'text/plain'
                }
            }
    
    except NoCredentialsError:
        return {
            'statusCode': 500,
            'body': 'Credentials not available.',
            'headers': {
                'Content-Type': 'text/plain'
            }
        }
    except PartialCredentialsError:
        return {
            'statusCode': 500,
            'body': 'Incomplete credentials.',
            'headers': {
                'Content-Type': 'text/plain'
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e),
            'headers': {
                'Content-Type': 'text/plain'
            }
        }
