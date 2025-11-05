# Pre-Demo Setup Guide

## Complete Setup Instructions (Do This 1 Day Before)

### 1. AWS Account Setup

#### Create or Verify AWS Account
1. Go to https://aws.amazon.com
2. Sign in or create new account
3. Set up billing alerts (recommended)
4. Verify Free Tier eligibility

#### Configure AWS CLI - Standard Authentication
```bash
# Install AWS CLI (if not installed)
# macOS
brew install awscli

# Verify installation
aws --version

# Configure credentials
aws configure
```

**Enter when prompted:**
- AWS Access Key ID: [From IAM Console]
- AWS Secret Access Key: [From IAM Console]
- Default region: `us-east-1`
- Default output format: `json`

**To get credentials:**
1. Go to AWS Console → IAM
2. Create user with programmatic access
3. Attach policies: EC2FullAccess, LambdaFullAccess, SNSFullAccess, SQSFullAccess, IAMFullAccess
4. Save credentials securely

---

#### 🔐 Configure AWS CLI - For Federated/Azure AD Users

**If your organization uses Azure AD for AWS authentication** (common in enterprise environments), you'll need `aws-azure-login`:

##### Install aws-azure-login
```bash
# Install Node.js (if not installed)
brew install node

# Verify Node.js installation
node --version
npm --version

# Install aws-azure-login globally
npm install -g aws-azure-login
```

##### Configure aws-azure-login
```bash
aws-azure-login --configure
```

You'll be prompted for:
- **Azure Tenant ID**: (Ask your IT administrator or check company documentation)
- **Azure App ID URI**: Usually `https://signin.aws.amazon.com/saml`
- **Default AWS Region**: `us-east-1`
- **Default Role ARN**: The role you use to access AWS (e.g., includes `Admin` or similar)

##### Login to AWS
```bash
# Login with GUI mode (recommended)
aws-azure-login -m gui --no-sandbox

# Or use profile-specific login
aws-azure-login --profile default -m gui --no-sandbox
```

This will:
1. Open a browser window
2. Prompt you to log in with your company credentials (Azure AD)
3. Complete MFA/2FA if required
4. Assume the AWS role automatically

##### Verify Authentication
```bash
# Check your AWS identity
aws sts get-caller-identity

# Should show:
# - Your UserId
# - Account ID (e.g., 863615190391)
# - Role ARN
```

**Important Notes:**
- Azure AD sessions expire after a few hours
- If you get `ExpiredToken` errors, run `aws-azure-login -m gui --no-sandbox` again
- Keep the terminal window open during your demo
- The `--no-sandbox` flag helps avoid browser compatibility issues

---

### 2. Create SSH Key Pair

#### Option A: AWS Console
1. Go to EC2 Console → Key Pairs
2. Click "Create key pair"
3. Name: `demo-key`
4. Type: RSA
5. Format: .pem
6. Click "Create"
7. Save file to `~/.ssh/demo-key.pem`
8. Set permissions: `chmod 400 ~/.ssh/demo-key.pem`

#### Option B: AWS CLI
```bash
# Create key pair
aws ec2 create-key-pair \
    --key-name demo-key \
    --query 'KeyMaterial' \
    --output text > ~/.ssh/demo-key.pem

# Set permissions
chmod 400 ~/.ssh/demo-key.pem
```

### 3. Test AWS Connectivity

```bash
# Verify AWS CLI works
aws sts get-caller-identity

# Should return your account ID and user info

# Verify EC2 access
aws ec2 describe-regions

# Verify Lambda access
aws lambda list-functions
```

### 4. Clone/Download Demo Files

```bash
# Navigate to your working directory
cd ~/Documents/Repos

# If using Git
git clone [your-repo-url] qe-se-catalyst
cd qe-se-catalyst

# Verify file structure
ls -la
```

### 5. Make Scripts Executable

```bash
# From project root
chmod +x cleanup.sh

# Part 1 scripts
chmod +x part1-ec2-demo/setup-ec2.sh

# Part 2 scripts
chmod +x part2-serverless-demo/deploy-lambda.sh
chmod +x part2-serverless-demo/test-lambda.sh
chmod +x part2-serverless-demo/cleanup-lambda.sh
```

### 6. Test Run (Optional but Recommended)

#### Test EC2 Deployment
```bash
cd part1-ec2-demo
./setup-ec2.sh
```

**Wait 3 minutes, then:**
```bash
# Get the public IP from script output
# Test in browser: http://PUBLIC_IP:5000

# Clean up
INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=Demo-Web-App" \
    --query 'Reservations[0].Instances[0].InstanceId' \
    --output text)

aws ec2 terminate-instances --instance-ids $INSTANCE_ID
```

#### Test Lambda Deployment
```bash
cd ../part2-serverless-demo
./deploy-lambda.sh

# Test
./test-lambda.sh

# Clean up
./cleanup-lambda.sh
```

### 7. Prepare Presentation Environment

#### Terminal Setup
```bash
# Increase font size for visibility
# Terminal → Preferences → Profiles → Text
# Set font size to 16-18 pt

# Use a clean terminal profile
# Consider using iTerm2 with a clear color scheme
```

#### Browser Setup
1. Open Chrome/Firefox
2. Bookmark these URLs:
   - EC2 Console: https://console.aws.amazon.com/ec2
   - Lambda Console: https://console.aws.amazon.com/lambda
   - CloudWatch: https://console.aws.amazon.com/cloudwatch
   - SNS Console: https://console.aws.amazon.com/sns
   - SQS Console: https://console.aws.amazon.com/sqs
3. Clear browser history and cache
4. Close unnecessary tabs

#### Create Cheat Sheet
Print or have on second monitor:
- `QUICK_REFERENCE.md`
- AWS Account ID
- Public IP placeholder
- SNS Topic ARN placeholder
- SQS Queue URL placeholder

### 8. Final Verification Checklist

Run this verification script:

```bash
#!/bin/bash
echo "=== Pre-Demo Verification ==="
echo ""

echo "1. AWS CLI Configuration:"
aws sts get-caller-identity && echo "✓ AWS CLI configured" || echo "✗ AWS CLI NOT configured"
echo ""

echo "2. SSH Key Pair:"
aws ec2 describe-key-pairs --key-names demo-key > /dev/null 2>&1 && echo "✓ SSH key exists" || echo "✗ SSH key NOT found"
echo ""

echo "3. Required Files:"
[ -f "part1-ec2-demo/setup-ec2.sh" ] && echo "✓ EC2 setup script" || echo "✗ EC2 script missing"
[ -f "part2-serverless-demo/deploy-lambda.sh" ] && echo "✓ Lambda deploy script" || echo "✗ Lambda script missing"
[ -f "cleanup.sh" ] && echo "✓ Cleanup script" || echo "✗ Cleanup script missing"
echo ""

echo "4. Script Permissions:"
[ -x "part1-ec2-demo/setup-ec2.sh" ] && echo "✓ EC2 script executable" || echo "✗ Run: chmod +x part1-ec2-demo/setup-ec2.sh"
[ -x "part2-serverless-demo/deploy-lambda.sh" ] && echo "✓ Lambda script executable" || echo "✗ Run: chmod +x part2-serverless-demo/deploy-lambda.sh"
[ -x "cleanup.sh" ] && echo "✓ Cleanup script executable" || echo "✗ Run: chmod +x cleanup.sh"
echo ""

echo "5. Existing Resources (should be clean):"
EXISTING_INSTANCES=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=Demo-Web-App" "Name=instance-state-name,Values=running" --query 'Reservations[*].Instances[*].InstanceId' --output text)
if [ -z "$EXISTING_INSTANCES" ]; then
    echo "✓ No existing EC2 instances"
else
    echo "⚠ Found existing instances: $EXISTING_INSTANCES"
    echo "  Run cleanup.sh to remove"
fi

EXISTING_LAMBDAS=$(aws lambda list-functions --query 'Functions[?starts_with(FunctionName, `demo`)].FunctionName' --output text)
if [ -z "$EXISTING_LAMBDAS" ]; then
    echo "✓ No existing Lambda functions"
else
    echo "⚠ Found existing functions: $EXISTING_LAMBDAS"
    echo "  Run cleanup.sh to remove"
fi
echo ""

echo "=== Verification Complete ==="
```

Save as `verify-setup.sh` and run:
```bash
chmod +x verify-setup.sh
./verify-setup.sh
```

### 9. Day-Of Checklist

**30 Minutes Before:**
- [ ] Run `./cleanup.sh` to ensure clean environment
- [ ] Verify AWS CLI still works
- [ ] Close unnecessary applications
- [ ] Set terminal font to 16-18pt
- [ ] Have QUICK_REFERENCE.md open
- [ ] Test internet connection
- [ ] Charge laptop fully
- [ ] Have power adapter ready

**10 Minutes Before:**
- [ ] Open required terminals (2-3 windows)
- [ ] Navigate to project directory
- [ ] Open browser with AWS Console
- [ ] Open architecture diagrams
- [ ] Silence phone notifications
- [ ] Close Slack, email, etc.

**Right Before:**
- [ ] Deep breath
- [ ] Quick AWS CLI test: `aws sts get-caller-identity`
- [ ] Ready to go! 🚀

---

## Troubleshooting Pre-Setup

### AWS CLI Not Working
```bash
# Reinstall
brew reinstall awscli

# Or use pip
pip3 install --upgrade awscli

# Verify
which aws
aws --version
```

### Permission Denied Errors
```bash
# Check IAM user permissions in AWS Console
# Ensure policies attached:
# - AmazonEC2FullAccess
# - AWSLambda_FullAccess
# - AmazonSNSFullAccess
# - AmazonSQSFullAccess
# - IAMFullAccess (or IAMReadOnlyAccess minimum)
```

### Key Pair Issues
```bash
# Delete and recreate
aws ec2 delete-key-pair --key-name demo-key
aws ec2 create-key-pair --key-name demo-key --query 'KeyMaterial' --output text > ~/.ssh/demo-key.pem
chmod 400 ~/.ssh/demo-key.pem
```

### Region Issues
```bash
# Ensure using us-east-1 throughout
aws configure set region us-east-1

# Or edit directly
nano ~/.aws/config
```

---

## Backup Plans

### Plan A: Full Demo (Preferred)
- Run both EC2 and Lambda demos live
- Show all integrations
- 20 minutes total

### Plan B: Lambda Only (If Time/Issues)
- Skip EC2 deployment
- Show pre-deployed EC2 screenshot
- Focus on serverless (more impressive)
- 15 minutes

### Plan C: AWS Console Demo (If CLI Fails)
- Use AWS Console UI for everything
- Slower but visual
- Walk through each service
- 20 minutes

### Plan D: Presentation Only (Internet Fails)
- Use slides with screenshots
- Walk through architecture
- Explain concepts thoroughly
- Show code in editor
- 20 minutes

---

## Cost Management

### Set Billing Alarm
```bash
# Create SNS topic for billing alerts
aws sns create-topic --name billing-alerts

# Subscribe your email
aws sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:ACCOUNT_ID:billing-alerts \
    --protocol email \
    --notification-endpoint your-email@example.com

# Confirm subscription via email
```

### Expected Costs
- **Test run**: < $0.10
- **Actual demo**: < $0.05
- **If forget cleanup**: ~$8/month

### Free Tier Limits
- EC2: 750 hours/month (t2.micro)
- Lambda: 1M requests/month
- SNS: 1,000 publishes/month
- SQS: 1M requests/month

---

## Contact & Support

If issues arise:
1. Check `QUICK_REFERENCE.md` troubleshooting section
2. Review AWS CloudWatch Logs
3. Verify IAM permissions
4. Check AWS Service Health Dashboard
5. Have AWS Console ready as backup

Good luck with your presentation! 🎤
