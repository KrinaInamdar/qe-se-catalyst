#!/bin/bash

# Test script for serverless demo
# Demonstrates the complete flow of Lambda, SNS, and SQS

echo "======================================"
echo "Testing Serverless Demo"
echo "======================================"
echo ""

REGION="us-east-1"
SNS_TOPIC_ARN=$(aws sns list-topics --query "Topics[?contains(TopicArn, 'demo-notifications')].TopicArn" --output text)
SQS_QUEUE_URL=$(aws sqs get-queue-url --queue-name demo-processing-queue --query 'QueueUrl' --output text 2>/dev/null)

if [ -z "$SNS_TOPIC_ARN" ]; then
    echo "Error: SNS topic not found. Please run deploy-lambda.sh first."
    exit 1
fi

echo "Test 1: Sending SNS notification..."
aws sns publish \
    --topic-arn $SNS_TOPIC_ARN \
    --subject "Demo Test - Order Notification" \
    --message "New order received from demo testing" \
    --region $REGION

echo "✓ SNS notification sent"
echo "  This will trigger the SNS Handler Lambda function"
echo ""
sleep 2

echo "Test 2: Sending message to SQS queue..."
aws sqs send-message \
    --queue-url $SQS_QUEUE_URL \
    --message-body '{"order_id":"TEST-001","customer":"Demo Customer","amount":150.00,"items":["Product A","Product B"]}' \
    --region $REGION

echo "✓ Message sent to SQS"
echo "  This will trigger the SQS Processor Lambda function"
echo ""
sleep 2

echo "Test 3: Invoking Order Processor Lambda..."
aws lambda invoke \
    --function-name demo-order-processor \
    --payload '{"customer_name":"Jane Smith","items":[{"name":"Demo Product","quantity":3,"price":49.99}],"total_amount":149.97}' \
    --region $REGION \
    response.json > /dev/null 2>&1

if [ -f response.json ]; then
    echo "✓ Order Processor Lambda invoked"
    echo "  Response:"
    cat response.json | python3 -m json.tool
    rm response.json
fi
echo ""

echo "======================================"
echo "Viewing Lambda Function Logs"
echo "======================================"
echo ""
echo "Fetching recent logs..."
echo ""

echo "--- SNS Handler Logs ---"
aws logs tail /aws/lambda/demo-sns-handler --since 5m --format short 2>/dev/null || echo "No recent logs"
echo ""

echo "--- SQS Processor Logs ---"
aws logs tail /aws/lambda/demo-sqs-processor --since 5m --format short 2>/dev/null || echo "No recent logs"
echo ""

echo "--- Order Processor Logs ---"
aws logs tail /aws/lambda/demo-order-processor --since 5m --format short 2>/dev/null || echo "No recent logs"
echo ""

echo "======================================"
echo "Test Complete!"
echo "======================================"
echo ""
echo "To view live logs, run:"
echo "  aws logs tail /aws/lambda/demo-sns-handler --follow"
echo "  aws logs tail /aws/lambda/demo-sqs-processor --follow"
echo "  aws logs tail /aws/lambda/demo-order-processor --follow"
echo ""
