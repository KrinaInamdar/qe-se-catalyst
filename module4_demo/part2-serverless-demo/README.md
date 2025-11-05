# Part 2: Serverless Demo - PaaS (Platform as a Service)

## Overview
This demo showcases AWS Lambda functions integrated with SNS and SQS, demonstrating the Platform as a Service (PaaS) serverless architecture model.

## What You'll Demonstrate
- Event-driven serverless computing with Lambda
- SNS (Simple Notification Service) for pub/sub messaging
- SQS (Simple Queue Service) for message queuing
- Integration between Lambda, SNS, and SQS
- Serverless architecture benefits

## Architecture

```
Order Processor Lambda ──► SNS Topic ──► SNS Handler Lambda
         │                                        │
         └──────────► SQS Queue ◄────────────────┘
                          │
                          └──► SQS Processor Lambda
```

### Components
1. **Order Processor Lambda**: Receives orders and initiates processing
2. **SNS Topic**: Broadcasts notifications about new orders
3. **SNS Handler Lambda**: Triggered by SNS notifications
4. **SQS Queue**: Queues orders for processing
5. **SQS Processor Lambda**: Processes orders from the queue

## Prerequisites
1. AWS Account with Lambda, SNS, SQS permissions
2. AWS CLI configured (`aws configure`)
3. Python 3.8+ installed locally (for testing)

## Files in This Demo
- `lambda-functions/sns_handler.py` - Lambda triggered by SNS
- `lambda-functions/sqs_processor.py` - Lambda triggered by SQS
- `lambda-functions/order_processor.py` - Main order processing Lambda
- `deploy-lambda.sh` - Automated deployment script
- `test-lambda.sh` - Test script to trigger all functions
- `cleanup-lambda.sh` - Resource cleanup script

## Quick Start

### Automated Deployment
```bash
cd part2-serverless-demo
chmod +x deploy-lambda.sh
./deploy-lambda.sh
```

The script will:
1. Create IAM role for Lambda execution
2. Create SNS topic for notifications
3. Create SQS queue for message processing
4. Deploy all three Lambda functions
5. Configure triggers and permissions
6. Display test commands

**Deployment takes 1-2 minutes.**

## Testing the Demo

### Run Automated Tests
```bash
chmod +x test-lambda.sh
./test-lambda.sh
```

### Manual Testing

#### Test 1: Trigger SNS Handler
```bash
aws sns publish \
    --topic-arn arn:aws:sns:us-east-1:YOUR_ACCOUNT:demo-notifications \
    --subject "Demo Test" \
    --message "Hello from SNS!"
```

**What happens:**
- SNS publishes the message
- SNS Handler Lambda is automatically triggered
- Lambda processes the message and forwards to SQS
- Logs show the complete flow

#### Test 2: Send Message to SQS
```bash
aws sqs send-message \
    --queue-url https://sqs.us-east-1.amazonaws.com/YOUR_ACCOUNT/demo-processing-queue \
    --message-body '{"order_id":"TEST-001","customer":"Demo User","amount":99.99}'
```

**What happens:**
- Message is added to SQS queue
- SQS Processor Lambda is automatically triggered
- Lambda processes the message
- Optional: Sends notification via SNS

#### Test 3: Invoke Order Processor
```bash
aws lambda invoke \
    --function-name demo-order-processor \
    --payload '{"customer_name":"Jane Doe","items":[{"name":"Widget","qty":2}],"total_amount":99.99}' \
    response.json
```

**What happens:**
- Lambda validates the order
- Sends message to SQS queue
- Sends notification via SNS
- Both handlers are triggered automatically

## View Lambda Logs

### Real-time Log Streaming
```bash
# SNS Handler logs
aws logs tail /aws/lambda/demo-sns-handler --follow

# SQS Processor logs
aws logs tail /aws/lambda/demo-sqs-processor --follow

# Order Processor logs
aws logs tail /aws/lambda/demo-order-processor --follow
```

### Recent Logs (Last 5 minutes)
```bash
aws logs tail /aws/lambda/demo-sns-handler --since 5m
```

## Demo Talking Points

### During Setup (2 minutes)
- "We're deploying Lambda functions - serverless compute"
- "No servers to manage, pay only for execution time"
- "Auto-scales from zero to thousands of requests"
- "This is Platform as a Service - AWS manages infrastructure"

### Architecture Explanation (3 minutes)
- "SNS provides pub/sub messaging - broadcast to multiple subscribers"
- "SQS provides reliable queuing - processes messages sequentially"
- "Lambda functions are event-driven - triggered automatically"
- "This is fully managed - no servers, no patching, no scaling configuration"

### Live Demo (3 minutes)
1. **Send SNS notification**: Show instant trigger
2. **Send SQS message**: Show queue-based processing
3. **View CloudWatch Logs**: Show execution details
4. **Highlight metrics**: Show invocation count, duration, costs

### PaaS Key Points
✓ No server management required
✓ Automatic scaling and high availability
✓ Pay-per-execution pricing model
✓ Focus on code, not infrastructure
✓ Integrated monitoring and logging
✓ Examples: Lambda, SNS, SQS, API Gateway

### Cost Comparison (1 minute)
- "Lambda Free Tier: 1M requests/month free"
- "Typical demo cost: < $0.01"
- "Production costs: only pay for actual usage"
- "Compare to EC2: no idle server costs"

## Monitoring in AWS Console

### Lambda Console
```
AWS Console → Lambda → Functions → demo-sns-handler
- View metrics: Invocations, Duration, Errors
- Monitor logs in real-time
- Check concurrent executions
```

### SNS Console
```
AWS Console → SNS → Topics → demo-notifications
- View subscriptions
- Monitor published messages
- Check delivery status
```

### SQS Console
```
AWS Console → SQS → Queues → demo-processing-queue
- View messages in queue
- Monitor message count
- Check approximate age of messages
```

## Cleanup
```bash
chmod +x cleanup-lambda.sh
./cleanup-lambda.sh
```

Or manually:
```bash
# Delete Lambda functions
aws lambda delete-function --function-name demo-sns-handler
aws lambda delete-function --function-name demo-sqs-processor
aws lambda delete-function --function-name demo-order-processor

# Delete SNS topic
aws sns delete-topic --topic-arn arn:aws:sns:us-east-1:ACCOUNT:demo-notifications

# Delete SQS queue
aws sqs delete-queue --queue-url YOUR_QUEUE_URL

# Delete IAM role (detach policies first)
aws iam detach-role-policy --role-name demo-lambda-execution-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy --role-name demo-lambda-execution-role --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess
aws iam detach-role-policy --role-name demo-lambda-execution-role --policy-arn arn:aws:iam::aws:policy/AmazonSQSFullAccess
aws iam delete-role --role-name demo-lambda-execution-role
```

## Troubleshooting

### Lambda not triggered
- Check event source mappings: `aws lambda list-event-source-mappings --function-name demo-sqs-processor`
- Verify SNS subscription: `aws sns list-subscriptions-by-topic --topic-arn YOUR_TOPIC_ARN`
- Check IAM permissions on the Lambda execution role

### Permission errors
- Ensure Lambda execution role has necessary permissions
- Wait 10 seconds after role creation for propagation
- Check CloudWatch Logs for detailed error messages

### Messages not processing
- Check SQS queue for messages: `aws sqs receive-message --queue-url YOUR_QUEUE_URL`
- Verify Lambda function is enabled
- Check for Lambda errors in CloudWatch Logs

## Advanced: Subscribe Email to SNS

To receive email notifications during the demo:
```bash
aws sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:ACCOUNT:demo-notifications \
    --protocol email \
    --notification-endpoint your-email@example.com
```

**Note**: Confirm the subscription via the email you receive.

## Time Budget
- **Setup explanation**: 2 minutes
- **Execute deployment**: 2 minutes
- **Demo live triggers**: 3 minutes
- **Show logs and monitoring**: 2 minutes
- **Total**: 9 minutes

## Key Differences: IaaS vs PaaS

| Aspect | IaaS (EC2) | PaaS (Lambda) |
|--------|------------|---------------|
| Server Management | You manage | AWS manages |
| Scaling | Manual/Auto-scaling groups | Automatic |
| Pricing | Hourly (running time) | Per-execution |
| Patching | Your responsibility | AWS handles it |
| Idle Costs | Yes (instance runs 24/7) | No (pay per use) |
| Setup Complexity | Higher | Lower |
| Control | Full control | Limited control |
