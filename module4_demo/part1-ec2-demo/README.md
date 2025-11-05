# Part 1: AWS Demo - Elastic Beanstalk + S3 + CloudFront

## 🎯 Overview

This demo showcases AWS IaaS and PaaS capabilities by deploying a Flask web application using:
- **AWS Elastic Beanstalk** - Platform as a Service for web app deployment
- **Amazon S3** - Object storage for uploaded files
- **Amazon CloudFront** - Content Delivery Network (CDN) for fast file delivery

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       User's Browser                         │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────▼──────────┐
         │  CloudFront CDN      │ (Optional)
         │  - Edge Locations    │
         │  - Caching           │
         └───────────┬──────────┘
                     │
         ┌───────────▼──────────┐         ┌───────────────┐
         │  Elastic Beanstalk   │◄────────│   S3 Bucket   │
         │  - Load Balancer     │         │  - File Storage│
         │  - EC2 Instances     │         │  - Public Read │
         │  - Auto Scaling      │         └───────────────┘
         │  - Health Monitoring │
         └──────────────────────┘
```

## 📋 Features

### Web Application
- File upload interface with drag & drop support
- Display instance information (hostname, IP)
- List all uploaded files from S3
- Real-time file browsing from S3 bucket
- Responsive UI with AWS branding

### AWS Services Integration
- **Elastic Beanstalk**: Manages EC2 instances, load balancer, auto-scaling
- **S3**: Stores uploaded files with public read access
- **CloudFront**: (Optional) Delivers files via global CDN
- **IAM**: Manages permissions for EB instances to access S3

## 🚀 Quick Start

### Prerequisites
- AWS CLI configured (use `aws-azure-login` for federated auth)
- Python 3.7+ (for local testing)
- pip3 installed

### Deploy the Application

```bash
cd part1-ec2-demo

# Deploy everything (EB + S3 + CloudFront)
./deploy-beanstalk.sh
```

The script will:
1. ✅ Check prerequisites
2. ✅ Create S3 bucket for file storage
3. ✅ Create CloudFront distribution (optional)
4. ✅ Package the application
5. ✅ Initialize Elastic Beanstalk
6. ✅ Create and deploy the environment
7. ✅ Configure environment variables

**Deployment time:** 5-7 minutes

### Access the Application

After deployment, you'll see:
```
Application URL: http://demo-webapp-env.us-east-1.elasticbeanstalk.com
```

Open this URL in your browser to:
- Upload files to S3
- View instance information
- Browse uploaded files

## 🧪 Test the Application

### Upload a File
1. Click "Choose File" or drag & drop a file
2. Supported formats: PNG, JPG, GIF, PDF, TXT
3. Click "Upload to S3"
4. File is stored in S3 and accessible via CloudFront (if enabled)

### View Instance Info
- Hostname of the EB instance
- Local IP address
- S3 bucket name
- CloudFront status
- Timestamp

### Browse Files
- Lists all files in S3 bucket
- Shows file size and upload date
- Click "View →" to open file via CloudFront/S3

## 📊 Architecture Components

### Elastic Beanstalk
- **Platform:** Python 3.9
- **Instance Type:** t2.micro (Free Tier eligible)
- **Deployment:** Single instance (for demo)
- **Health Monitoring:** Built-in
- **Auto-scaling:** Configured but using single instance mode

### S3 Bucket
- **Purpose:** Store uploaded files
- **Access:** Public read (for demo purposes)
- **Naming:** `demo-webapp-bucket-<timestamp>`
- **Region:** us-east-1

### CloudFront (Optional)
- **Purpose:** CDN for fast global delivery
- **Origin:** S3 bucket
- **Caching:** Enabled
- **HTTPS:** Supported
- **Deployment time:** 15-20 minutes to fully activate

## 🔧 Configuration Files

### `.ebextensions/python.config`
- Configures WSGI path
- Sets environment variables
- Configures IAM role for S3 access

### `app.py`
- Flask web application
- S3 integration using boto3
- File upload/download handlers
- API endpoints for info and file listing

### `requirements.txt`
```
Flask==3.0.0
gunicorn==21.2.0
boto3==1.34.0
Werkzeug==3.0.0
```

## 🧹 Cleanup

**Important:** Always clean up after demos to avoid AWS charges!

```bash
./cleanup-beanstalk.sh
```

This will:
1. Terminate Elastic Beanstalk environment
2. Delete Elastic Beanstalk application
3. Empty and delete S3 bucket
4. Disable CloudFront distribution (deletion takes 15-20 min)
5. Remove local configuration files

## 💰 Cost Information

### Expected Costs (per hour)
- **Elastic Beanstalk:** Free (you only pay for underlying resources)
- **EC2 t2.micro:** $0.0116/hour (Free Tier: 750 hours/month)
- **S3 Storage:** $0.023/GB/month (Free Tier: 5GB)
- **S3 Requests:** $0.0004/1000 requests (Free Tier: 2000 PUT, 20000 GET)
- **CloudFront:** $0.085/GB (Free Tier: 50GB/month)

**Total demo cost:** < $0.10 if cleaned up within an hour

### Free Tier Benefits
- **EC2:** 750 hours/month of t2.micro
- **S3:** 5GB storage, 20,000 GET requests, 2,000 PUT requests
- **CloudFront:** 50GB data transfer out
- **Data Transfer:** 15GB out per month

## 📚 What You'll Learn

### IaaS Concepts
- Virtual machine management (EC2)
- Load balancing
- Auto-scaling principles
- Network configuration

### PaaS Concepts
- Platform-managed deployments
- Automatic scaling
- Health monitoring
- Zero-downtime updates

### Storage & CDN
- Object storage (S3)
- Content delivery networks
- Caching strategies
- Global distribution

### AWS Integration
- IAM roles and policies
- Service-to-service communication
- Environment configuration
- Resource tagging

## 🐛 Troubleshooting

### Deployment Fails
```bash
# Check EB CLI logs
eb logs

# Check AWS Console
# Go to Elastic Beanstalk → Environments → Logs
```

### Application Not Loading
```bash
# Check environment health
eb health

# Check application logs
eb logs --stream
```

### S3 Upload Fails
- Verify IAM role has S3 permissions
- Check bucket policy in AWS Console
- Verify environment variables are set

### CloudFront Not Working
- CloudFront takes 15-20 minutes to fully deploy
- Check distribution status in AWS Console
- Verify origin is correctly configured

## 📖 Presentation Tips

### Demo Flow (10 minutes)
1. **Show architecture diagram** (1 min)
2. **Run deployment script** (mention it takes 5-7 min, have it pre-deployed)
3. **Show AWS Console** - EB environment, S3 bucket, CloudFront
4. **Demo the application** - Upload file, view instance info
5. **Explain PaaS benefits** - No server management, auto-scaling
6. **Show file in S3** - AWS Console
7. **Show file via CloudFront** - Explain CDN benefits
8. **Cleanup demo** - Show cleanup script

### Key Talking Points
- ✅ **PaaS vs IaaS:** EB manages infrastructure, you focus on code
- ✅ **Scalability:** EB can auto-scale based on load
- ✅ **Integration:** Easy integration with S3, CloudFront, RDS, etc.
- ✅ **Monitoring:** Built-in health checks and logging
- ✅ **Cost-effective:** Pay only for what you use, Free Tier eligible

## 🔗 Additional Resources

- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Amazon CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Free Tier](https://aws.amazon.com/free/)

---

**Ready to deploy?** Run `./deploy-beanstalk.sh` and your AWS demo will be live in minutes! ☁️
