# Security Compliance Guide - AWS Innovation Labs

## 🚨 Important: Slalom AWS Innovation Labs Security Policies

This demo has been updated to comply with Slalom AWS Innovation Labs security policies. The following restrictions apply:

---

## ✅ Compliance Updates Made

### 1. **S3 Buckets - Private Only**
- ✅ All S3 buckets created are **private by default**
- ✅ No public read/write access configured
- ✅ Access only via authenticated IAM roles

**Changes made:**
- Removed public bucket policies
- Added IAM role-based access for Elastic Beanstalk instances
- Pre-signed URLs for temporary file access (if needed)

### 2. **Security Groups - Restricted Access**
- ✅ **NO 0.0.0.0/0 access allowed**
- ✅ HTTP/HTTPS restricted to specific IP ranges
- ✅ SSH access limited to Slalom office IPs only

**Changes made:**
- Modified security group rules in EB configuration
- Added IP restriction prompts in deployment scripts
- Documented required IP ranges

### 3. **Instance Types - Approved Only**
- ✅ Using **t3.micro** (approved instance type)
- ✅ Falls within InfoSec approved list

### 4. **Authentication - Azure AD Only**
- ✅ Using `aws-azure-login` (InfoSec approved)
- ✅ No local IAM user accounts created
- ✅ No access keys stored in repository

### 5. **Resource Lifecycle**
- ⚠️ **EC2 instances must be terminated within 2 weeks**
- ⚠️ **S3 buckets must be deleted within 60 days**
- ⚠️ Demo resources should be cleaned up immediately after use

---

## 🔒 Security Group Configuration

### Required IP Restrictions

**For Slalom Office Access**, you must provide:
1. Your Slalom office public IP range
2. Or your current location IP address

**How to get your IP:**
```bash
curl ifconfig.me
```

**During deployment**, you'll be prompted:
```
Enter allowed IP range for HTTP/HTTPS access (e.g., 203.0.113.0/24 or 203.0.113.45/32):
```

### Recommended Configurations

#### Option 1: Slalom Office Only (Most Secure)
```
Allowed IPs: [Your Slalom Office CIDR Range]
Example: 198.51.100.0/24
```

#### Option 2: Specific IP Only (For Demo)
```
Allowed IPs: [Your Current IP]/32
Example: 203.0.113.45/32
```

⚠️ **DO NOT USE:** 0.0.0.0/0 (This will be automatically blocked by InfoSec)

---

## 📋 Pre-Deployment Checklist

Before running any deployment scripts:

- [ ] Verify you're using `aws-azure-login` for authentication
- [ ] Confirm your deployment will use approved instance types (t3.micro)
- [ ] Have your Slalom office IP range ready
- [ ] Understand that resources must be cleaned up within 2 weeks
- [ ] Review that S3 buckets will be private (no public access)
- [ ] Confirm no sensitive/confidential data will be uploaded

---

## 🧹 Mandatory Cleanup

### After Demo (IMMEDIATELY)
```bash
# Clean up all resources
./cleanup.sh
```

### Maximum Retention Periods
- **EC2 Instances:** 2 weeks maximum
- **EBS Volumes:** 3 weeks maximum
- **S3 Buckets:** 60 days maximum (with exception approval)

⚠️ **InfoSec reserves the right to terminate non-compliant resources**

---

## 🚫 What You CANNOT Do

1. ❌ Create security groups with 0.0.0.0/0 access
2. ❌ Create public S3 buckets
3. ❌ Use instance types not on the approved list
4. ❌ Create local IAM users with console access
5. ❌ Store confidential/restricted client data
6. ❌ Leave resources running beyond 2 weeks
7. ❌ Use EC2 instances as proxies
8. ❌ Allow SSH from 0.0.0.0/0

---

## ✅ What You CAN Do

1. ✅ Use approved instance types (t2.micro, t3.micro, t3.small, etc.)
2. ✅ Create private S3 buckets with IAM role access
3. ✅ Restrict security groups to specific IP ranges
4. ✅ Use aws-azure-login for authentication
5. ✅ Deploy Lambda functions (serverless)
6. ✅ Use IAM roles instead of IAM users
7. ✅ Tag all resources with Owner and Market tags

---

## 📞 Getting Help / Exceptions

### For Security Exceptions:
- Email: security@slalom.com
- Use case: Justify why you need an exception
- Timeline: Provide expected duration (max 60 days)

### For Access Issues:
- Submit ticket to IT Support: help.slalom.com
- InfoSec team for access-based exceptions

### For Instance Type Exceptions:
- Must be approved by InfoSec
- Time-bound: Maximum 60 days
- Audit occurs every 90 days

---

## 🏷️ Required Resource Tags

All resources should be tagged with:

```
Owner: [your-slalom-email@slalom.com]
Market: [e.g., Seattle, Chicago, etc.]
Purpose: [e.g., "Cloud Computing Demo"]
```

Cloud Custodian auto-tags these for supported services, but manual tagging is encouraged.

---

## 🔐 S3 Bucket Security Configuration

All S3 buckets in this demo are configured as:

```json
{
  "BlockPublicAcls": true,
  "IgnorePublicAcls": true,
  "BlockPublicPolicy": true,
  "RestrictPublicBuckets": true
}
```

**Access Method:**
- IAM role attached to Elastic Beanstalk instances
- Pre-signed URLs for temporary file access (expires in 1 hour)
- No public bucket policies

---

## ⚖️ Compliance Summary

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| No 0.0.0.0/0 Security Groups | ✅ Compliant | IP restrictions enforced in deployment |
| Private S3 Buckets Only | ✅ Compliant | Block public access enabled |
| Approved Instance Types | ✅ Compliant | Using t3.micro |
| Azure AD Authentication | ✅ Compliant | aws-azure-login configured |
| No Local IAM Users | ✅ Compliant | IAM roles only |
| 2-Week EC2 Limit | ⚠️ User Responsibility | Cleanup scripts provided |
| Resource Tagging | ⚠️ User Responsibility | Auto-tagged by Cloud Custodian |

---

## 📚 Related Documentation

- [AWS Innovation Labs Wiki](https://slalom.atlassian.net/wiki/spaces/NDC/)
- [IAM User Exceptions Process](https://slalom.atlassian.net/wiki/spaces/NDC/pages/808486418/IAM+User+Exceptions)
- [aws-azure-login Setup Guide](https://github.com/sportradar/aws-azure-login)

---

## ⚠️ Important Reminder

**This environment is for TESTING ONLY. Do not put solutions into production.**

**NO confidential or restricted data belonging to clients, partners, or Slalom is allowed.**

---

*Last Updated: November 2025*
*Compliance Version: 1.0*
