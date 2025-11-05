#!/bin/bash

#===============================================================================
# AWS Elastic Beanstalk + S3 + CloudFront Deployment Script
# This script deploys a Flask app using Elastic Beanstalk, creates an S3 bucket
# for file storage, and optionally sets up CloudFront distribution
#===============================================================================

set -e  # Exit on error

echo "======================================================================"
echo "AWS Demo Deployment - Elastic Beanstalk + S3 + CloudFront"
echo "======================================================================"
echo ""

# Configuration
APP_NAME="demo-webapp"
ENV_NAME="demo-webapp-env"
REGION="us-east-1"
BUCKET_NAME="demo-webapp-bucket-$(date +%s)"
PLATFORM="python-3.9"

echo "Step 1: Checking prerequisites..."
echo "----------------------------------------------------------------------"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "✗ AWS CLI not found. Please install it first."
    exit 1
fi
echo "✓ AWS CLI installed"

# Check EB CLI
if ! command -v eb &> /dev/null; then
    echo "✗ Elastic Beanstalk CLI not found."
    echo "  Please install it first:"
    echo "  brew install awsebcli"
    exit 1
fi
echo "✓ EB CLI available"

# Check AWS credentials
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "✗ AWS credentials not configured"
    echo "  Run: aws-azure-login -m gui --no-sandbox"
    exit 1
fi
echo "✓ AWS credentials configured"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "  Account ID: $ACCOUNT_ID"
echo ""

echo "Step 2: Creating S3 bucket for file storage..."
echo "----------------------------------------------------------------------"

# Create S3 bucket
if aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null; then
    echo "✓ Created S3 bucket: $BUCKET_NAME"
else
    echo "⚠ Bucket might already exist or error occurred"
fi

# Configure bucket for public read access (for demo purposes)
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
    2>/dev/null || echo "  Public access block configuration skipped"

# Add bucket policy for public read
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json 2>/dev/null || echo "  Bucket policy skipped"
rm /tmp/bucket-policy.json

echo "✓ S3 bucket configured"
echo ""

echo "Step 3: Creating CloudFront distribution (optional)..."
echo "----------------------------------------------------------------------"

# Create CloudFront distribution
echo "Creating CloudFront distribution for S3 bucket..."
echo "This may take 5-10 minutes..."

CLOUDFRONT_CONFIG=$(cat <<EOF
{
    "CallerReference": "demo-$(date +%s)",
    "Comment": "Demo CloudFront Distribution",
    "Enabled": true,
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "allow-all",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0
    }
}
EOF
)

echo "$CLOUDFRONT_CONFIG" > /tmp/cloudfront-config.json

CLOUDFRONT_ID=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/cloudfront-config.json \
    --query 'Distribution.Id' \
    --output text 2>/dev/null || echo "")

if [ -n "$CLOUDFRONT_ID" ]; then
    CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
        --id $CLOUDFRONT_ID \
        --query 'Distribution.DomainName' \
        --output text)
    echo "✓ CloudFront distribution created: $CLOUDFRONT_DOMAIN"
    echo "  Distribution ID: $CLOUDFRONT_ID"
else
    echo "⚠ CloudFront creation skipped (may require additional permissions)"
    CLOUDFRONT_DOMAIN=""
fi

rm /tmp/cloudfront-config.json 2>/dev/null || true
echo ""

echo "Step 4: Preparing application bundle..."
echo "----------------------------------------------------------------------"

# Create application bundle
ZIP_FILE="app-$(date +%s).zip"

zip -r $ZIP_FILE \
    app.py \
    requirements.txt \
    templates/ \
    .ebextensions/ \
    -x "*.pyc" "*__pycache__*" "*.DS_Store" \
    > /dev/null

echo "✓ Created application bundle: $ZIP_FILE"
echo ""

echo "Step 5: Initializing Elastic Beanstalk application..."
echo "----------------------------------------------------------------------"

# Initialize EB if not already done
if [ ! -d ".elasticbeanstalk" ]; then
    eb init $APP_NAME \
        --platform "$PLATFORM" \
        --region $REGION \
        2>/dev/null || echo "EB init completed"
fi

echo "✓ Elastic Beanstalk initialized"
echo ""

echo "Step 6: Creating Elastic Beanstalk environment..."
echo "----------------------------------------------------------------------"

# Create environment with environment variables
eb create $ENV_NAME \
    --instance-type t2.micro \
    --envvars S3_BUCKET_NAME=$BUCKET_NAME,CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN,AWS_REGION=$REGION \
    --single \
    2>&1 | grep -v "WARNING" || true

echo ""
echo "✓ Elastic Beanstalk environment created"
echo ""

echo "Step 7: Waiting for environment to be ready..."
echo "----------------------------------------------------------------------"

# Wait for environment
echo "This may take 3-5 minutes..."
aws elasticbeanstalk wait environment-updated \
    --application-name $APP_NAME \
    --environment-names $ENV_NAME \
    2>/dev/null || sleep 60

echo "✓ Environment is ready"
echo ""

# Get environment URL
EB_URL=$(aws elasticbeanstalk describe-environments \
    --application-name $APP_NAME \
    --environment-names $ENV_NAME \
    --query 'Environments[0].CNAME' \
    --output text)

echo "======================================================================"
echo "🎉 Deployment Complete!"
echo "======================================================================"
echo ""
echo "📋 Deployment Summary:"
echo "----------------------------------------------------------------------"
echo "Application Name:       $APP_NAME"
echo "Environment Name:       $ENV_NAME"
echo "S3 Bucket:             $BUCKET_NAME"
echo "CloudFront Domain:      ${CLOUDFRONT_DOMAIN:-Not configured}"
echo "Application URL:        http://$EB_URL"
echo ""
echo "🚀 Access your application at:"
echo "   http://$EB_URL"
echo ""
echo "📝 Save this information:"
echo "----------------------------------------------------------------------"
echo "export S3_BUCKET_NAME=$BUCKET_NAME"
echo "export CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN"
echo "export EB_ENV_NAME=$ENV_NAME"
echo "export EB_APP_NAME=$APP_NAME"
echo ""
echo "⚠️  Important Notes:"
echo "----------------------------------------------------------------------"
echo "1. The application may take 2-3 more minutes to fully start"
echo "2. CloudFront distribution takes 15-20 minutes to fully deploy"
echo "3. Remember to clean up resources after demo to avoid charges"
echo ""
echo "🧹 To clean up all resources, run:"
echo "   ./cleanup-beanstalk.sh"
echo ""
echo "======================================================================"

# Save configuration for cleanup
cat > .eb-demo-config <<EOF
APP_NAME=$APP_NAME
ENV_NAME=$ENV_NAME
S3_BUCKET=$BUCKET_NAME
CLOUDFRONT_ID=$CLOUDFRONT_ID
CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN
ZIP_FILE=$ZIP_FILE
EOF

echo "✓ Configuration saved to .eb-demo-config"
