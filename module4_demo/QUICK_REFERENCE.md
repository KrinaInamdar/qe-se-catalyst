# AWS Cloud Computing Demo - Quick Reference

## Pre-Demo Checklist

### Before Presentation
- [ ] AWS CLI configured (`aws configure`)
- [ ] SSH key pair created in AWS (named `demo-key`)
- [ ] Test deployment in advance (day before)
- [ ] Clean up any existing demo resources
- [ ] Verify AWS Free Tier status
- [ ] Prepare browser bookmarks for AWS Console
- [ ] Test terminal screen visibility
- [ ] Have architecture diagrams ready

### Have Ready
- [ ] AWS Account credentials
- [ ] Terminal with large font
- [ ] Browser windows pre-configured
- [ ] This quick reference guide
- [ ] Backup plan for internet issues

---

## Part 1: Elastic Beanstalk Demo (10 minutes)

### Commands
```bash
# Navigate to demo directory
cd part1-ec2-demo

# Show application code (30 seconds)
cat app.py | head -30

# Deploy to Elastic Beanstalk (5-7 minutes)
chmod +x deploy-beanstalk.sh
./deploy-beanstalk.sh

# Note the application URL from output
# Wait 5-7 minutes for environment to be ready

# Open in browser
# URL will be: http://demo-webapp-env.us-east-1.elasticbeanstalk.com

# Test file upload to S3
# Upload a file through the web interface

# Verify application health
eb status
```

### Talking Points
- ✓ "This is PaaS - AWS manages the infrastructure"
- ✓ "Elastic Beanstalk handles EC2, load balancers, auto-scaling"
- ✓ "S3 provides scalable object storage"
- ✓ "CloudFront can deliver files globally with low latency"
- ✓ "Platform handles deployments, updates, and monitoring"
- ✓ "We focus on code, AWS handles infrastructure"

---

## Part 2: Serverless Demo (9 minutes)

### Commands
```bash
# Navigate to serverless directory
cd ../part2-serverless-demo

# Deploy Lambda functions (2 minutes)
chmod +x deploy-lambda.sh
./deploy-lambda.sh

# Note the ARNs and URLs from output

# Test 1: SNS notification
aws sns publish \
    --topic-arn <SNS_TOPIC_ARN> \
    --subject "Live Demo" \
    --message "New order received"

# View SNS Handler logs
aws logs tail /aws/lambda/demo-sns-handler --follow

# Test 2: SQS message
aws sqs send-message \
    --queue-url <SQS_QUEUE_URL> \
    --message-body '{"order":"demo","amount":99.99}'

# View SQS Processor logs
aws logs tail /aws/lambda/demo-sqs-processor --follow

# Test 3: Complete flow
chmod +x test-lambda.sh
./test-lambda.sh
```

### Talking Points
- ✓ "This is PaaS - AWS manages everything"
- ✓ "No servers to configure or maintain"
- ✓ "Auto-scales from zero to thousands"
- ✓ "Pay only for execution time"
- ✓ "Focus on code, not infrastructure"

---

## Key Comparison Points

| Feature | PaaS (Elastic Beanstalk) | PaaS (Lambda) |
|---------|------------|---------------|
| Management | AWS manages infrastructure | AWS manages everything |
| Scaling | Automatic (load balancer) | Automatic (instant) |
| Pricing | $8/month (always-on instance) | $0.20 per 1M requests |
| Idle Cost | Yes | No |
| Control | Platform-level | Function-level |
| Best For | Web applications | Event-driven workloads |

---

## Demo Flow Timeline

**0:00-1:00** - Introduction
**1:00-11:00** - Part 1: Elastic Beanstalk (PaaS)
- 1:00-6:00: Deploy and explain
- 6:00-9:00: Show running application and S3
- 9:00-11:00: Platform benefits discussion
**11:00-20:00** - Part 2: Serverless (PaaS)
- 11:00-13:00: Deploy Lambda
- 13:00-16:00: Live demonstrations
- 16:00-20:00: Compare and contrast
**20:00+** - Q&A

---

## Troubleshooting

### Elastic Beanstalk Application Not Loading
```bash
# Check environment status
eb status

# View recent logs
eb logs

# SSH into EB instance (if needed)
eb ssh

# Check application logs
eb logs --all
```

### S3 Upload Issues
- Verify IAM instance profile has S3 access
- Check bucket name in environment variables
- Verify bucket exists: `aws s3 ls`
- Check bucket policy allows uploads

### Lambda Not Triggering
```bash
# Check function exists
aws lambda list-functions | grep demo

# View CloudWatch Logs
aws logs tail /aws/lambda/demo-sns-handler --since 10m

# Test direct invocation
aws lambda invoke --function-name demo-sns-handler \
    --payload '{"Records":[{"Sns":{"Message":"test"}}]}' \
    response.json
```

### Permission Errors
- Wait 10 seconds after IAM role creation
- Verify IAM policies are attached
- Check CloudWatch Logs for detailed errors

---

## Cost Estimates

### This Demo
- **Elastic Beanstalk**: Free (platform itself)
- **EC2 (managed by EB)**: $0.01/hour (terminate after demo)
- **S3 Storage**: < $0.01 (Free Tier: 5GB)
- **CloudFront**: Free (Free Tier: 50GB)
- **Lambda**: $0.00 (within free tier)
- **SNS**: $0.00 (first 1000 publishes free)
- **SQS**: $0.00 (first 1M requests free)
- **Total Demo Cost**: < $0.10 if cleaned up promptly

### Monthly Costs (If Left Running)
- **Elastic Beanstalk EC2**: ~$8.50/month
- **S3 Storage**: ~$0.50/month (with demo files)
- **CloudFront**: ~$0-5/month (low usage)
- **Lambda** (low usage): ~$0-5/month
- **SNS + SQS**: ~$0-2/month

---

## Cleanup Commands

### Quick Cleanup
```bash
# From project root
chmod +x cleanup.sh
./cleanup.sh
```

### Manual Cleanup
```bash
# Elastic Beanstalk
cd part1-ec2-demo
eb terminate demo-webapp-env --force

# S3 Bucket
aws s3 rm s3://demo-webapp-bucket-TIMESTAMP --recursive
aws s3 rb s3://demo-webapp-bucket-TIMESTAMP

# CloudFront (if created)
# Must disable first, then delete after 15-20 min

# Lambda
aws lambda delete-function --function-name demo-sns-handler
aws lambda delete-function --function-name demo-sqs-processor
aws lambda delete-function --function-name demo-order-processor

# SNS
aws sns delete-topic --topic-arn <SNS_TOPIC_ARN>

# SQS
aws sqs delete-queue --queue-url <SQS_QUEUE_URL>
```

---

## AWS Console Quick Links

### Elastic Beanstalk
`https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1`

### S3
`https://console.aws.amazon.com/s3/`

### CloudFront
`https://console.aws.amazon.com/cloudfront/`

### Lambda
`https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions`

### SNS
`https://console.aws.amazon.com/sns/v3/home?region=us-east-1#/topics`

### SQS
`https://console.aws.amazon.com/sqs/v2/home?region=us-east-1#/queues`

### CloudWatch Logs
`https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups`

---

## Sample Questions & Answers

**Q: "When should I use Elastic Beanstalk vs Lambda?"**
A: "Use Elastic Beanstalk for traditional web applications that need to run continuously. Use Lambda for event-driven, sporadic workloads. EB gives you more control, Lambda gives you zero management."

**Q: "How do costs compare at scale?"**
A: "Depends on usage patterns. Lambda wins for sporadic workloads. Elastic Beanstalk can be cheaper for consistent, high-traffic applications with reserved instances."

**Q: "Can you mix PaaS services?"**
A: "Absolutely! Most architectures use multiple services. For example, Elastic Beanstalk for your web app, Lambda for background processing, S3 for storage, and CloudFront for content delivery."

**Q: "What about cold starts with Lambda?"**
A: "Lambda cold starts are ~100-300ms. For most use cases acceptable. Use provisioned concurrency for latency-critical applications."

**Q: "How do I manage databases with Elastic Beanstalk?"**
A: "Use Amazon RDS for managed databases. EB can automatically create and configure RDS instances, or you can connect to existing databases."

---

## Backup Commands

### Get Resource Information
```bash
# List EC2 instances
aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=Demo-Web-App" \
    --query 'Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]' \
    --output table

# List Lambda functions
aws lambda list-functions \
    --query 'Functions[?starts_with(FunctionName, `demo`)].FunctionName' \
    --output table

# Check SNS topics
aws sns list-topics | grep demo

# Check SQS queues
aws sqs list-queues | grep demo
```

---

## Post-Demo Actions

### Immediate
1. ✓ Run cleanup script
2. ✓ Verify all resources deleted
3. ✓ Check for any unexpected charges
4. ✓ Share GitHub repository with audience

### Follow-up
1. ✓ Send presentation slides
2. ✓ Share AWS Free Tier link
3. ✓ Provide learning resources
4. ✓ Offer office hours for questions

---

## Emergency Fallback

### If AWS CLI Fails
- Use AWS Console UI for everything
- Show pre-recorded demo video
- Walk through code and architecture diagrams

### If Internet Fails
- Use local Python Flask app demo
- Show pre-captured screenshots
- Focus on conceptual explanations
- Use architecture diagrams

### If Time Runs Short
- Skip detailed code walkthrough
- Show only one Lambda trigger
- Focus on comparison table
- Jump to conclusion

---

## Resources to Share

```
📚 This Demo Repository
   https://github.com/[your-repo]

📖 AWS Documentation
   https://aws.amazon.com/documentation

🆓 AWS Free Tier
   https://aws.amazon.com/free

🎓 AWS Training
   https://aws.amazon.com/training

📝 AWS Certified Cloud Practitioner
   https://aws.amazon.com/certification/certified-cloud-practitioner
```

---

## Final Checklist

Before starting presentation:
- [ ] AWS CLI working
- [ ] Internet connection stable
- [ ] Terminal font readable
- [ ] Browser windows prepared
- [ ] No other demo resources running
- [ ] Architecture diagrams ready
- [ ] Cleanup script prepared
- [ ] Questions anticipated

Good luck! 🚀
