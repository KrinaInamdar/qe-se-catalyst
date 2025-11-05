#!/bin/bash

# Cleanup script for serverless demo
# Removes all Lambda functions, SNS topics, SQS queues, and IAM roles

echo "======================================"
echo "Cleaning Up Serverless Demo Resources"
echo "======================================"
echo ""

REGION="us-east-1"
SNS_TOPIC_NAME="demo-notifications"
SQS_QUEUE_NAME="demo-processing-queue"
LAMBDA_ROLE_NAME="demo-lambda-execution-role"

echo "⚠️  This will delete all demo resources!"
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Cleanup cancelled."
    exit 0
fi

echo ""
echo "Step 1: Deleting Lambda functions..."
aws lambda delete-function --function-name demo-sns-handler --region $REGION 2>/dev/null && echo "✓ Deleted demo-sns-handler" || echo "  demo-sns-handler not found"
aws lambda delete-function --function-name demo-sqs-processor --region $REGION 2>/dev/null && echo "✓ Deleted demo-sqs-processor" || echo "  demo-sqs-processor not found"
aws lambda delete-function --function-name demo-order-processor --region $REGION 2>/dev/null && echo "✓ Deleted demo-order-processor" || echo "  demo-order-processor not found"
echo ""

echo "Step 2: Deleting SNS topic..."
SNS_TOPIC_ARN=$(aws sns list-topics --query "Topics[?contains(TopicArn, '$SNS_TOPIC_NAME')].TopicArn" --output text)
if [ -n "$SNS_TOPIC_ARN" ]; then
    aws sns delete-topic --topic-arn $SNS_TOPIC_ARN --region $REGION
    echo "✓ Deleted SNS topic: $SNS_TOPIC_ARN"
else
    echo "  SNS topic not found"
fi
echo ""

echo "Step 3: Deleting SQS queue..."
SQS_QUEUE_URL=$(aws sqs get-queue-url --queue-name $SQS_QUEUE_NAME --region $REGION --query 'QueueUrl' --output text 2>/dev/null)
if [ -n "$SQS_QUEUE_URL" ]; then
    aws sqs delete-queue --queue-url $SQS_QUEUE_URL --region $REGION
    echo "✓ Deleted SQS queue: $SQS_QUEUE_URL"
else
    echo "  SQS queue not found"
fi
echo ""

echo "Step 4: Deleting IAM role..."
if aws iam get-role --role-name $LAMBDA_ROLE_NAME 2>/dev/null; then
    # Detach policies
    aws iam detach-role-policy \
        --role-name $LAMBDA_ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null
    
    aws iam detach-role-policy \
        --role-name $LAMBDA_ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess 2>/dev/null
    
    aws iam detach-role-policy \
        --role-name $LAMBDA_ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonSQSFullAccess 2>/dev/null
    
    # Delete role
    aws iam delete-role --role-name $LAMBDA_ROLE_NAME
    echo "✓ Deleted IAM role: $LAMBDA_ROLE_NAME"
else
    echo "  IAM role not found"
fi
echo ""

echo "Step 5: Cleaning up local files..."
rm -f lambda-functions/*.zip
rm -f response.json
echo "✓ Removed local deployment files"
echo ""

echo "======================================"
echo "Cleanup Complete!"
echo "======================================"
echo ""
echo "All demo resources have been removed."
echo ""
