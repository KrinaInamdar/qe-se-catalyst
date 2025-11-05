# AWS Cloud Computing Demo - IaaS, PaaS, and SaaS

## Demo Overview
This demo showcases AWS services across different cloud computing models:
- **IaaS/PaaS Hybrid (Infrastructure/Platform as a Service)**: Elastic Beanstalk, S3, CloudFront
- **PaaS (Platform as a Service)**: Lambda, SNS, SQS
- **SaaS (Software as a Service)**: AWS Console, CloudWatch

**Total Duration**: 20 minutes
- Part 1 (Elastic Beanstalk Deployment): 8-10 minutes
- Part 2 (Serverless Lambda): 8-10 minutes
- Q&A Buffer: 2 minutes

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured (`aws configure`)
- EB CLI installed (`brew install awsebcli`)
- Python 3.8+ installed

## Demo Architecture

### Part 1: IaaS/PaaS - Elastic Beanstalk Web Application
- Deploy a Flask web application to Elastic Beanstalk
- Configure S3 bucket for file storage
- Optional CloudFront CDN for content delivery
- Integrated load balancing and auto-scaling

### Part 2: PaaS - Serverless Architecture
- Lambda function triggered by SNS notification
- Lambda function processing messages from SQS queue
- Integration demonstrating event-driven architecture

## Quick Start

### Part 1 - Elastic Beanstalk Demo
```bash
cd part1-ec2-demo
./deploy-beanstalk.sh
```

### Part 2 - Serverless Demo
```bash
cd part2-serverless-demo
./deploy-lambda.sh
```

## Demo Flow
1. Show slides explaining IaaS, PaaS, SaaS concepts
2. Execute Part 1: Elastic Beanstalk deployment demonstration
3. Execute Part 2: Serverless Lambda demonstration
4. Highlight key differences and use cases

## Cleanup
Always remember to clean up resources to avoid charges:
```bash
./cleanup.sh
```
