# 📚 Documentation Index

## 🔒 SECURITY COMPLIANCE FIRST!

**⚠️ BEFORE YOU START - READ THESE SECURITY DOCUMENTS:**

| File | Critical Information | MUST READ |
|------|---------------------|-----------|
| **[SECURITY_COMPLIANCE.md](SECURITY_COMPLIANCE.md)** | Slalom InfoSec policies & requirements | ✅ YES |
| **[SECURITY_FIXES_SUMMARY.md](SECURITY_FIXES_SUMMARY.md)** | Security modifications & testing | ✅ YES |

**Key Security Requirements:**
- 🔒 S3 buckets are PRIVATE (no public access)
- 🔒 Security groups restricted to YOUR IP only (no 0.0.0.0/0)
- 🔒 Using approved instance types (t3.micro)
- ⏰ Resources MUST be cleaned up within 2 WEEKS
- 🚫 NO confidential/client data allowed

---

## Quick Navigation Guide

This repository contains everything you need for a successful AWS cloud computing demonstration. Use this index to find what you need quickly.

---

## 🚀 Getting Started (Start Here!)

| File | Purpose | When to Use |
|------|---------|-------------|
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | 5-minute quick setup | First time setup |
| **[verify-setup.sh](verify-setup.sh)** | Pre-flight verification | Before every demo |
| **[README.md](README.md)** | Complete documentation | Full reference guide |

**Recommended first steps:**
1. Read `GETTING_STARTED.md` (5 minutes)
2. Run `verify-setup.sh` (1 minute)
3. Test both demos (15 minutes)

---

## 📖 Main Documentation

### 🔒 Security & Compliance (READ FIRST!)

| File | Description | Importance | Read Time |
|------|-------------|------------|-----------|
| **[SECURITY_COMPLIANCE.md](SECURITY_COMPLIANCE.md)** | InfoSec policies, restrictions, requirements | ⚠️ CRITICAL | 10 min |
| **[SECURITY_FIXES_SUMMARY.md](SECURITY_FIXES_SUMMARY.md)** | Security modifications, testing, compliance | ⚠️ CRITICAL | 8 min |

### Core Guides

| File | Description | Pages | Read Time |
|------|-------------|-------|-----------|
| **[README.md](README.md)** | Complete project documentation | Long | 15 min |
| **[DEMO_OVERVIEW.md](DEMO_OVERVIEW.md)** | High-level architecture and concepts | Short | 5 min |
| **[PRE_DEMO_SETUP.md](PRE_DEMO_SETUP.md)** | Detailed setup instructions | Medium | 10 min |

### Presentation Materials

| File | Description | Use Case |
|------|-------------|----------|
| **[PRESENTATION_SCRIPT.md](PRESENTATION_SCRIPT.md)** | Full 20-minute script with timing | During presentation prep |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Command cheat sheet | During live demo |
| **[DEMO_DAY_CHECKLIST.md](DEMO_DAY_CHECKLIST.md)** | Complete checklist | Day before & day of |
| **[ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md)** | Visual architecture guides | For slides & whiteboard |

---

## 💻 Demo Code & Scripts

### Part 1: Elastic Beanstalk Demo (IaaS/PaaS Hybrid) 🔒

| File | Type | Purpose |
|------|------|---------|
| `part1-ec2-demo/app.py` | Python | Flask web app with S3 integration (pre-signed URLs) |
| `part1-ec2-demo/templates/index.html` | HTML | Web interface with file upload |
| `part1-ec2-demo/requirements.txt` | Config | Python dependencies |
| `part1-ec2-demo/deploy-beanstalk.sh` | Bash | **SECURITY-COMPLIANT** deployment script |
| `part1-ec2-demo/cleanup-beanstalk.sh` | Bash | Cleanup script |
| `part1-ec2-demo/.ebextensions/python.config` | Config | EB configuration with IAM roles |
| `part1-ec2-demo/.gitignore` | Config | Git ignore file |
| `part1-ec2-demo/README.md` | Docs | Elastic Beanstalk demo guide |

**🔒 Security Features:**
- Private S3 buckets (no public access)
- Security groups restricted to your IP
- IAM role-based access (no access keys)
- Pre-signed URLs for file access

### Part 2: Serverless Demo (PaaS)

| File | Type | Purpose |
|------|------|---------|
| `part2-serverless-demo/lambda-functions/sns_handler.py` | Python | SNS-triggered Lambda (with loop detection) |
| `part2-serverless-demo/lambda-functions/sqs_processor.py` | Python | SQS-triggered Lambda |
| `part2-serverless-demo/lambda-functions/order_processor.py` | Python | Order processing Lambda |
| `part2-serverless-demo/deploy-lambda.sh` | Bash | Automated deployment |
| `part2-serverless-demo/test-lambda.sh` | Bash | Testing script |
| `part2-serverless-demo/cleanup-lambda.sh` | Bash | Lambda cleanup |
| `part2-serverless-demo/.gitignore` | Config | Git ignore file |
| `part2-serverless-demo/ENHANCEMENT_NOTES.md` | Docs | Message loop prevention details |
| `part2-serverless-demo/README.md` | Docs | Serverless demo guide |

### Utility Scripts

| File | Purpose |
|------|---------|
| `verify-setup.sh` | Pre-flight verification |
| `cleanup.sh` | Complete resource cleanup |

---

## 📋 Documentation by Use Case

### "I'm New to This"
1. **START HERE:** `SECURITY_COMPLIANCE.md` ⚠️ REQUIRED
2. Then: `GETTING_STARTED.md`
3. Setup: `PRE_DEMO_SETUP.md`
4. Verify: Run `verify-setup.sh`
5. Read: `README.md`
6. Learn: `ARCHITECTURE_DIAGRAMS.md`

### "I'm Preparing for My Demo"
1. **Review security:** `SECURITY_COMPLIANCE.md` ⚠️
2. Review script: `PRESENTATION_SCRIPT.md`
3. Print: `QUICK_REFERENCE.md`
4. Check: `DEMO_DAY_CHECKLIST.md`
5. Practice: Run both demos
6. Prepare: Clean up with `cleanup.sh`
7. **Important:** Note your IP for security group access

### "I'm Doing the Demo Right Now"
1. Have open: `QUICK_REFERENCE.md`
2. Follow: `PRESENTATION_SCRIPT.md`
3. Reference: `ARCHITECTURE_DIAGRAMS.md`
4. **Remember:** Application restricted to your IP only

### "Something Went Wrong"
1. Check: `QUICK_REFERENCE.md` → Troubleshooting
2. Security issues: `SECURITY_COMPLIANCE.md` → Testing section
3. Review: `part1-ec2-demo/README.md` or `part2-serverless-demo/README.md`
4. Verify: Run `verify-setup.sh` again
5. S3 access issues: Check IAM role and pre-signed URLs
6. Security group issues: Verify your IP hasn't changed
7. Logs: Check CloudWatch Logs

### "Demo is Over"
1. **CRITICAL:** Run `cleanup.sh` (2-week deadline!)
2. Verify: Check AWS Console for leftover resources
3. Review: `DEMO_DAY_CHECKLIST.md` → After Presentation
4. **Important:** Resources MUST be deleted within 2 weeks per InfoSec policy

---

## 🎯 Quick Reference by Topic

### AWS Setup & Configuration
- **Security policies:** `SECURITY_COMPLIANCE.md` ⚠️
- Initial setup: `PRE_DEMO_SETUP.md` → Steps 1-4
- Verification: `verify-setup.sh`
- AWS CLI commands: `QUICK_REFERENCE.md`
- Azure AD authentication: `PRE_DEMO_SETUP.md` → Authentication

### Elastic Beanstalk (Part 1) 🔒
- Overview: `part1-ec2-demo/README.md`
- Quick start: `GETTING_STARTED.md` → Part 1
- Commands: `QUICK_REFERENCE.md` → Part 1
- Security features: `SECURITY_COMPLIANCE.md`
- Troubleshooting: `part1-ec2-demo/README.md` → Troubleshooting
- **Important:** Private S3 buckets with pre-signed URLs

### Lambda (Part 2)
- Overview: `part2-serverless-demo/README.md`
- Quick start: `GETTING_STARTED.md` → Part 2
- Commands: `QUICK_REFERENCE.md` → Part 2
- Loop prevention: `part2-serverless-demo/ENHANCEMENT_NOTES.md`
- Troubleshooting: `part2-serverless-demo/README.md` → Troubleshooting

### Architecture & Concepts
- Visual diagrams: `ARCHITECTURE_DIAGRAMS.md`
- Architecture explanation: `DEMO_OVERVIEW.md`
- IaaS vs PaaS: `README.md` → Key Takeaways

### Presentation
- Full script: `PRESENTATION_SCRIPT.md`
- Timing guide: `PRESENTATION_SCRIPT.md` → 20-Minute Demo Script
- Talking points: `PRESENTATION_SCRIPT.md` → Demo Talking Points
- Checklist: `DEMO_DAY_CHECKLIST.md`

### Cost & Billing
- Estimates: `README.md` → Cost Information
- Free Tier: `QUICK_REFERENCE.md` → Cost section
- Cleanup: `cleanup.sh`

---

## 📊 File Summary by Size

### Short (< 5 min read)
- `GETTING_STARTED.md`
- `DEMO_OVERVIEW.md`
- `QUICK_REFERENCE.md` (reference, not sequential reading)

### Medium (5-15 min read)
- `PRE_DEMO_SETUP.md`
- `DEMO_DAY_CHECKLIST.md`
- `part1-ec2-demo/README.md`
- `part2-serverless-demo/README.md`

### Long (15+ min read)
- `README.md`
- `PRESENTATION_SCRIPT.md`
- `ARCHITECTURE_DIAGRAMS.md`

---

## 🔧 Scripts Overview

### Executable Scripts (chmod +x needed)

| Script | What It Does | When to Run | Time |
|--------|--------------|-------------|------|
| `verify-setup.sh` | Checks if everything is ready | Before demo | 30 sec |
| `part1-ec2-demo/deploy-beanstalk.sh` | **🔒 SECURE** Deploys EB with IP restrictions | During Part 1 | 5-7 min |
| `part1-ec2-demo/cleanup-beanstalk.sh` | Removes EB resources | After Part 1 | 2 min |
| `part2-serverless-demo/deploy-lambda.sh` | Deploys Lambda demo | During Part 2 | 2 min |
| `part2-serverless-demo/test-lambda.sh` | Tests Lambda functions | After Part 2 deploy | 1 min |
| `part2-serverless-demo/cleanup-lambda.sh` | Removes Lambda resources | After Part 2 | 1 min |
| `cleanup.sh` | **⚠️ MANDATORY** Removes ALL resources | After demo (within 2 weeks) | 3 min |

**🔒 Security Note:** `deploy-beanstalk.sh` automatically:
- Detects your IP address
- Restricts security groups to your IP only
- Creates private S3 buckets
- Sets up IAM roles (no access keys)

### Configuration Scripts (No execution)

| Script | Purpose |
|--------|---------|
| `part1-ec2-demo/.ebextensions/python.config` | EB configuration with IAM roles & instance type |
| `part1-ec2-demo/requirements.txt` | Python dependencies |
| `part1-ec2-demo/.gitignore` | Git ignore patterns |
| `part2-serverless-demo/.gitignore` | Git ignore patterns |

---

## 🎓 Learning Path

### Beginner (Never used AWS)
```
Day 1: Read SECURITY_COMPLIANCE.md ⚠️ + GETTING_STARTED.md + PRE_DEMO_SETUP.md
Day 2: Setup AWS account + Azure AD auth + Run verify-setup.sh
Day 3: Run Part 1 (Elastic Beanstalk demo) - understand IP restrictions
Day 4: Run Part 2 (Lambda demo)
Day 5: Read PRESENTATION_SCRIPT.md
Day 6: Practice complete demo + test security features
Day 7: Present!
```

### Intermediate (Some AWS experience)
```
Hour 1: Read SECURITY_COMPLIANCE.md ⚠️ + GETTING_STARTED.md + verify-setup.sh
Hour 2: Run both demos (note: EB takes 5-7 min vs old EC2 3 min)
Hour 3: Read PRESENTATION_SCRIPT.md + understand security changes
Hour 4: Practice demo with security talking points
Ready to present!
```

### Advanced (AWS expert)
```
15 min: Scan README.md + SECURITY_COMPLIANCE.md ⚠️
15 min: Review security changes (private S3, IP restrictions, IAM roles)
30 min: Run both demos + customize for your needs
Ready to present!
```

---

## 📱 What to Have Open During Demo

### On Your Laptop
1. Terminal (3 windows)
   - Window 1: EC2 demo
   - Window 2: Lambda demo  
   - Window 3: Logs/testing
2. `QUICK_REFERENCE.md` (in editor)
3. AWS Console (browser)
4. Project directory in file explorer

### On Phone/Tablet
1. `PRESENTATION_SCRIPT.md`
2. `DEMO_DAY_CHECKLIST.md`

### Printed
1. `QUICK_REFERENCE.md`
2. `ARCHITECTURE_DIAGRAMS.md` (selected diagrams)

---

## 🔍 Find Information Fast

### "How do I...?"

| Question | Answer Location |
|----------|----------------|
| ...comply with InfoSec? | `SECURITY_COMPLIANCE.md` ⚠️ |
| ...install AWS CLI? | `PRE_DEMO_SETUP.md` → Step 1 |
| ...setup Azure AD auth? | `PRE_DEMO_SETUP.md` → Authentication |
| ...deploy Elastic Beanstalk? | `GETTING_STARTED.md` → Part 1 |
| ...deploy Lambda? | `GETTING_STARTED.md` → Part 2 |
| ...test Lambda? | `part2-serverless-demo/test-lambda.sh` |
| ...access S3 files? | Pre-signed URLs (automatic in app.py) |
| ...change my IP? | Update security group manually or redeploy |
| ...clean up? | `cleanup.sh` ⚠️ WITHIN 2 WEEKS |
| ...troubleshoot? | `QUICK_REFERENCE.md` → Troubleshooting |
| ...understand architecture? | `ARCHITECTURE_DIAGRAMS.md` |
| ...present this? | `PRESENTATION_SCRIPT.md` |

### "What if...?"

| Scenario | Solution Location |
|----------|-------------------|
| ...AWS CLI doesn't work? | `QUICK_REFERENCE.md` → Troubleshooting |
| ...can't access app (403/timeout)? | Check your IP hasn't changed + security group |
| ...S3 upload fails? | Check IAM role attached to EB instance |
| ...S3 file links don't work? | Pre-signed URLs expire after 1 hour - refresh page |
| ...security group blocked? | `SECURITY_COMPLIANCE.md` → your IP was flagged |
| ...EB app won't load? | `part1-ec2-demo/README.md` → Troubleshooting |
| ...Lambda won't trigger? | `part2-serverless-demo/README.md` → Troubleshooting |
| ...I run out of time? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |
| ...internet fails? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |
| ...demo doesn't work? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |
| ...InfoSec contacted me? | `SECURITY_COMPLIANCE.md` → Contact Information |

---

## 📈 Document Dependencies

```
Start Here
    │
    ├─► SECURITY_COMPLIANCE.md ⚠️ READ FIRST!
    │       │
    │       └─► SECURITY_FIXES_SUMMARY.md (technical details)
    │
    ├─► GETTING_STARTED.md
    │       │
    │       ├─► verify-setup.sh
    │       │
    │       └─► PRE_DEMO_SETUP.md
    │               │
    │               └─► README.md (full reference)
    │
    └─► PRESENTATION_SCRIPT.md
            │
            ├─► QUICK_REFERENCE.md (during demo)
            │
            ├─► DEMO_DAY_CHECKLIST.md (preparation)
            │
            └─► ARCHITECTURE_DIAGRAMS.md (visuals)
```

---

## ⚠️ Critical Reminders

### Before Demo
✅ Read `SECURITY_COMPLIANCE.md` - MANDATORY
✅ Run `verify-setup.sh`
✅ Run `cleanup.sh` (clean slate)
✅ Print `QUICK_REFERENCE.md`
✅ Note your current IP address
✅ Understand 2-week resource cleanup deadline

### During Demo
✅ Follow `PRESENTATION_SCRIPT.md`
✅ Have `QUICK_REFERENCE.md` open
✅ Mention security features (private S3, IP restrictions)
✅ Application only works from YOUR IP
✅ Pre-signed URLs expire after 1 hour

### After Demo
✅ Run `cleanup.sh` ⚠️ WITHIN 2 WEEKS (InfoSec policy)
✅ Verify all resources deleted in AWS Console
✅ Check AWS billing
✅ Document any InfoSec alerts received

---

## 🎯 Success Metrics

You're ready when you can:
- [ ] Read and understand `SECURITY_COMPLIANCE.md` ⚠️
- [ ] Explain why S3 buckets are private (InfoSec requirement)
- [ ] Understand security group IP restrictions
- [ ] Run `verify-setup.sh` with no errors
- [ ] Deploy Elastic Beanstalk demo in under 7 minutes
- [ ] Deploy Lambda demo in under 3 minutes
- [ ] Explain IaaS vs PaaS confidently
- [ ] Demonstrate file upload with pre-signed URLs
- [ ] Troubleshoot common issues
- [ ] Complete demo in 20 minutes
- [ ] Clean up all resources within 2 weeks deadline
- [ ] Know InfoSec contact: security@slalom.com

---

## 📞 Need Help?

1. **First**: Check relevant README for your issue
2. **Second**: Review `QUICK_REFERENCE.md` → Troubleshooting
3. **Third**: Check AWS CloudWatch Logs
4. **Last**: Open GitHub issue in this repository

---

## 🗂️ File Organization Summary

```
Repository Root
├── Security Documentation ⚠️ (2 files - READ FIRST!)
│   ├── SECURITY_COMPLIANCE.md (InfoSec policies)
│   └── SECURITY_FIXES_SUMMARY.md (security changes)
│
├── Main Documentation (8 files)
│   ├── README.md (main + security section)
│   ├── GETTING_STARTED.md (quickstart)
│   ├── DEMO_OVERVIEW.md (architecture)
│   ├── PRE_DEMO_SETUP.md (setup + Azure AD)
│   ├── PRESENTATION_SCRIPT.md (script)
│   ├── QUICK_REFERENCE.md (cheat sheet)
│   ├── DEMO_DAY_CHECKLIST.md (checklist)
│   ├── ARCHITECTURE_DIAGRAMS.md (visuals)
│   └── INDEX.md (this file)
│
├── Scripts (2 files)
│   ├── verify-setup.sh (verification)
│   └── cleanup.sh (cleanup - 2 week deadline!)
│
├── Part 1: Elastic Beanstalk 🔒 (8 files)
│   ├── deploy-beanstalk.sh (SECURITY-COMPLIANT)
│   ├── cleanup-beanstalk.sh
│   ├── app.py (with pre-signed URLs)
│   ├── templates/index.html (file upload UI)
│   ├── .ebextensions/python.config (IAM roles)
│   ├── requirements.txt
│   ├── .gitignore
│   └── README.md (with security section)
│
└── Part 2: Lambda (9 files)
    ├── deploy-lambda.sh
    ├── cleanup-lambda.sh
    ├── test-lambda.sh
    ├── lambda-functions/
    │   ├── order_processor.py
    │   ├── sns_handler.py (loop prevention)
    │   └── sqs_processor.py
    ├── ENHANCEMENT_NOTES.md (loop prevention)
    ├── .gitignore
    └── README.md

Total: 29 files organized for easy navigation
Security-enhanced for Slalom AWS Innovation Labs compliance
```

---

**Start your journey: [GETTING_STARTED.md](GETTING_STARTED.md) →**

**Questions? See [README.md](README.md) for complete documentation.**

**Ready to present? Check [DEMO_DAY_CHECKLIST.md](DEMO_DAY_CHECKLIST.md)!**
