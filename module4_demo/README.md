# AWS Cloud Computing Demo - Complete Guide

## 🔒 SECURITY COMPLIANCE NOTICE

**⚠️ REQUIRED READING: This demo has been updated to comply with Slalom AWS Innovation Labs security policies.**

**See [SECURITY_COMPLIANCE.md](./SECURITY_COMPLIANCE.md) and [SECURITY_FIXES_SUMMARY.md](./SECURITY_FIXES_SUMMARY.md) for:**
- InfoSec policy compliance details
- S3 bucket security (PRIVATE only, no public access)
- Security group restrictions (NO 0.0.0.0/0 allowed)
- Resource lifecycle requirements (EC2 < 2 weeks)
- Approved instance types (t3.micro)

**Key Security Features:**
- ✅ S3 buckets are PRIVATE (IAM role access only)
- ✅ Security groups restricted to YOUR IP (auto-detected)
- ✅ Uses approved instance types from InfoSec whitelist
- ✅ No access keys or local IAM users
- ⚠️ Resources MUST be cleaned up within 2 weeks

---

## 🎯 Overview

This repository contains a comprehensive 20-minute demonstration of AWS cloud computing fundamentals, focusing on:
- **IaaS (Infrastructure as a Service)**: Deploy web application to EC2
- **PaaS (Platform as a Service)**: Serverless architecture with Lambda, SNS, and SQS
- **SaaS (Software as a Service)**: AWS Console and managed services

Perfect for presentations, workshops, and educational purposes.

---

## 📋 What's Included

### Part 1: Elastic Beanstalk Web Application (IaaS/PaaS Hybrid) 🔒
- Flask web application with file upload
- **SECURITY: S3 buckets are PRIVATE** (IAM role access only)
- **SECURITY: Restricted to YOUR IP** (no public access)
- Automated Elastic Beanstalk deployment
- S3 integration with pre-signed URLs

### Part 2: Serverless Architecture (PaaS)
- Three Lambda functions demonstrating event-driven architecture
- SNS (Simple Notification Service) integration
- SQS (Simple Queue Service) processing
- Complete serverless workflow

### Documentation
- **SECURITY_COMPLIANCE.md** - ⚠️ REQUIRED: InfoSec policies and compliance
- **SECURITY_FIXES_SUMMARY.md** - Security modifications and testing
- **PRESENTATION_SCRIPT.md** - Detailed 20-minute presentation script with timing
- **QUICK_REFERENCE.md** - Quick commands and troubleshooting guide
- **PRE_DEMO_SETUP.md** - Complete setup instructions
- **DEMO_OVERVIEW.md** - Architecture and concept overview

---

## 🚀 Quick Start

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- **NO SSH keys needed** (using Elastic Beanstalk managed instances)
- macOS/Linux environment (or WSL on Windows)
- **REQUIRED:** `aws-azure-login` for Slalom AWS Innovation Labs authentication

### ⚠️ Authentication Setup (For Federated/Azure AD Users)

If your AWS account uses **Azure AD authentication** (common in enterprise environments like Slalom), you'll need to use `aws-azure-login` instead of standard AWS credentials:

#### Install aws-azure-login
```bash
# Install Node.js if you don't have it
brew install node

# Install aws-azure-login
npm install -g aws-azure-login
```

#### Configure aws-azure-login
```bash
aws-azure-login --configure
```

Follow the prompts to set up your Azure AD integration.

#### Login Before Running Demo
```bash
aws-azure-login -m gui --no-sandbox
```

This will open a browser window for Azure AD authentication. Complete the login, then verify:

```bash
aws sts get-caller-identity
```

You should see your AWS account information. You're now ready to run the demo!

---

### 1. Verify Setup
```bash
# Run verification script
chmod +x verify-setup.sh
./verify-setup.sh
```

### 2. Run Part 1 - Elastic Beanstalk Demo (IaaS/PaaS)
```bash
cd part1-ec2-demo
chmod +x deploy-beanstalk.sh
./deploy-beanstalk.sh

# Wait 5-7 minutes for deployment
# Access at: URL provided in script output
```

### 3. Run Part 2 - Serverless Demo (PaaS)
```bash
cd ../part2-serverless-demo
chmod +x deploy-lambda.sh
./deploy-lambda.sh

# Test the functions
chmod +x test-lambda.sh
./test-lambda.sh
```

### 4. Clean Up (Important!)
```bash
cd ..
chmod +x cleanup.sh
./cleanup.sh
```

---

## 📁 Repository Structure

```
module4_demo/
├── README.md                           # This file
├── DEMO_OVERVIEW.md                    # High-level architecture overview
├── PRESENTATION_SCRIPT.md              # Detailed 20-min presentation script
├── QUICK_REFERENCE.md                  # Quick commands and troubleshooting
├── PRE_DEMO_SETUP.md                   # Complete setup guide
├── verify-setup.sh                     # Pre-flight verification script
├── cleanup.sh                          # Complete resource cleanup
│
├── part1-ec2-demo/                     # IaaS/PaaS Demo
│   ├── README.md                       # Elastic Beanstalk demo documentation
│   ├── app.py                          # Flask web application with S3
│   ├── requirements.txt                # Python dependencies
│   ├── templates/
│   │   └── index.html                  # Web interface
│   ├── .ebextensions/                  # Elastic Beanstalk configuration
│   ├── deploy-beanstalk.sh             # Automated deployment
│   └── cleanup-beanstalk.sh            # Cleanup script
│
└── part2-serverless-demo/              # PaaS Demo
    ├── README.md                       # Serverless demo documentation
    ├── lambda-functions/
    │   ├── sns_handler.py              # SNS-triggered Lambda
    │   ├── sqs_processor.py            # SQS-triggered Lambda
    │   └── order_processor.py          # Order processing Lambda
    ├── deploy-lambda.sh                # Automated deployment
    ├── test-lambda.sh                  # Test all functions
    └── cleanup-lambda.sh               # Lambda cleanup
```

---

## 🎓 Learning Objectives

After this demo, participants will understand:

1. **IaaS Concepts**
   - Virtual machine provisioning
   - Security group configuration
   - OS and application management
   - Cost implications of always-on infrastructure

2. **PaaS Concepts**
   - Serverless computing benefits
   - Event-driven architecture
   - Message queuing patterns
   - Auto-scaling and high availability

3. **Service Model Comparison**
   - When to use IaaS vs PaaS
   - Cost models (hourly vs per-execution)
   - Management overhead differences
   - Scalability considerations

---

## 📊 Demo Timing (20 Minutes)

| Section | Duration | Description |
|---------|----------|-------------|
| Introduction | 1 min | Overview of cloud service models |
| Part 1: EB Setup | 5 min | Deploy Flask app to Elastic Beanstalk |
| Part 1: Demo | 3 min | Show running application with S3 |
| Part 1: Discussion | 2 min | IaaS/PaaS key points |
| Part 2: Lambda Setup | 2 min | Deploy serverless architecture |
| Part 2: Demo | 3 min | Trigger Lambda functions |
| Part 2: Discussion | 3 min | PaaS benefits |
| Comparison | 2 min | IaaS vs PaaS table |
| Q&A | 1 min | Questions and wrap-up |

---

## 💰 Cost Information

### Expected Demo Costs
- **Elastic Beanstalk**: Free (pay for underlying resources)
- **EC2 t3.micro**: $0.01/hour (Free Tier eligible)
- **S3 Storage**: < $0.01 for demo files
- **Lambda**: $0.00 (within Free Tier)
- **SNS**: $0.00 (first 1000 publishes free)
- **SQS**: $0.00 (first 1M requests free)

**Total Demo Cost**: < $0.05 if cleaned up within an hour

### AWS Free Tier
- Elastic Beanstalk: Free (no additional charge)
- EC2: 750 hours/month (t3.micro)
- S3: 5GB storage, 20,000 GET requests, 2,000 PUT requests
- Lambda: 1M requests/month
- SNS: 1,000 publishes/month
- SQS: 1M requests/month

⚠️ **Always run cleanup script after demo to avoid charges!**

---

## 🔧 Detailed Setup Instructions

### 1. Install AWS CLI

**macOS:**
```bash
brew install awscli
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Verify:**
```bash
aws --version
```

### 2. Configure AWS Credentials

```bash
aws configure
```

Enter:
- **AWS Access Key ID**: [Your access key]
- **AWS Secret Access Key**: [Your secret key]
- **Default region**: `us-east-1`
- **Default output format**: `json`

### 3. Create SSH Key Pair

```bash
aws ec2 create-key-pair \
    --key-name demo-key \
    --query 'KeyMaterial' \
    --output text > ~/.ssh/demo-key.pem

chmod 400 ~/.ssh/demo-key.pem
```

**Note:** While not required for Elastic Beanstalk deployment, this key pair is useful for troubleshooting EB EC2 instances if needed.

### 4. Verify Setup

```bash
./verify-setup.sh
```

For complete setup instructions, see **PRE_DEMO_SETUP.md**.

---

## 🎤 Presentation Guide

### Before Your Presentation

1. **Read the full guide**: Review `PRESENTATION_SCRIPT.md`
2. **Test everything**: Run through both demos completely
3. **Prepare environment**: 
   - Large terminal font (16-18pt)
   - Clean browser with AWS Console bookmarks
   - Print `QUICK_REFERENCE.md`
4. **Clean up**: Run `./cleanup.sh` before demo

### During Your Presentation

1. **Follow the script**: Use `PRESENTATION_SCRIPT.md` for timing
2. **Have backup ready**: Keep `QUICK_REFERENCE.md` open
3. **Show, don't just tell**: Live demos are more impactful
4. **Engage audience**: Ask questions, take brief pauses

### After Your Presentation

1. **Run cleanup**: `./cleanup.sh`
2. **Verify deletion**: Check AWS Console
3. **Share resources**: Provide GitHub link to participants

---

## 🐛 Troubleshooting

### Elastic Beanstalk Application Not Loading

```bash
# Check environment status
eb status

# View environment logs
eb logs

# SSH into EB instance (if needed)
eb ssh
```

### S3 Upload Issues

Check IAM role permissions for Elastic Beanstalk instances:
- AmazonS3FullAccess policy should be attached
- Verify bucket name in environment variables

### Lambda Not Triggering

```bash
# View logs
aws logs tail /aws/lambda/demo-sns-handler --follow

# Test direct invocation
aws lambda invoke \
    --function-name demo-sns-handler \
    --payload '{"test":"message"}' \
    response.json
```

### Permission Errors

- Verify IAM user has required policies
- Wait 10 seconds after creating IAM roles
- Check CloudWatch Logs for detailed errors

For complete troubleshooting, see `QUICK_REFERENCE.md`.

---

## 📚 Additional Resources

### AWS Documentation
- [Elastic Beanstalk Developer Guide](https://docs.aws.amazon.com/elasticbeanstalk/)
- [S3 User Guide](https://docs.aws.amazon.com/s3/)
- [Lambda Developer Guide](https://docs.aws.amazon.com/lambda/)
- [SNS Documentation](https://docs.aws.amazon.com/sns/)
- [SQS Documentation](https://docs.aws.amazon.com/sqs/)

### Learning Resources
- [AWS Free Tier](https://aws.amazon.com/free)
- [AWS Training](https://aws.amazon.com/training)
- [AWS Certified Cloud Practitioner](https://aws.amazon.com/certification/certified-cloud-practitioner/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## ⚠️ Important Notes

1. **Clean up resources**: Always run `./cleanup.sh` after demos
2. **Monitor costs**: Set up billing alerts in AWS Console
3. **Free Tier limits**: Monitor usage to stay within free tier
4. **Security**: Never commit AWS credentials to Git
5. **Regional resources**: Demo uses us-east-1; adjust if needed

---

## 🎯 Key Takeaways

### IaaS/PaaS Hybrid (Elastic Beanstalk + S3)
✅ Managed platform with infrastructure control  
✅ Automatic scaling and load balancing  
✅ Integrated monitoring and health checks  
✅ Easy deployment and updates  
❌ Less control than pure IaaS  
❌ Platform-specific limitations  

### PaaS (Lambda, SNS, SQS)
✅ No server management  
✅ Automatic scaling  
✅ Pay per execution  
❌ Less control over environment  

---

**Ready to start? Run `./verify-setup.sh` and begin your cloud computing journey! ☁️**
