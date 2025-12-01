# AWS Cloud Computing Demo - Presentation Script

## 20-Minute Demo Script with Timing

### Introduction (1 minute)

**[Slide: Title Slide]**
"Today, we'll explore cloud computing fundamentals through a live AWS demonstration. We'll cover the three main service models: IaaS, PaaS, and SaaS, with hands-on examples using AWS services."

**Key Points:**
- IaaS: Infrastructure as a Service (EC2)
- PaaS: Platform as a Service (Lambda, SNS, SQS)
- SaaS: Software as a Service (AWS Console, CloudWatch)

---

## Part 1: PaaS Hybrid - Elastic Beanstalk Deployment (8 minutes)

### Setup and Explanation (3 minutes)

**[Slide: IaaS/PaaS Hybrid Concept]**
"Let's start with Elastic Beanstalk - a Platform as a Service that abstracts infrastructure management. With Elastic Beanstalk, AWS manages the infrastructure, load balancing, and scaling, while we focus on our application code."

**[Switch to Terminal]**
```bash
cd part1-ec2-demo
```

"I've prepared a simple Flask web application. Let's deploy it to EC2."

**Show the code briefly:**
```bash
cat app.py
```

**Talking points while showing code:**
- "Simple Python Flask application with S3 integration"
- "Will run on Elastic Beanstalk - a managed platform"
- "We write code, AWS handles infrastructure, scaling, and patching"

### Deploy to Elastic Beanstalk (3 minutes)

**[Terminal]**
```bash
./deploy-beanstalk.sh
```

**While script runs, explain:**
1. "Creating S3 bucket for file storage - secured with PRIVATE access"
2. "Packaging application with dependencies"
3. "Creating Elastic Beanstalk environment"
4. "AWS automatically provisions EC2, load balancer, and auto-scaling"
5. "Security groups restricted to your IP for compliance"

**Key PaaS characteristics to mention:**
- ✓ Platform manages infrastructure automatically
- ✓ Built-in load balancing and auto-scaling
- ✓ AWS handles patching and updates
- ✓ Pay for underlying EC2 instances (hourly)
- ✓ Focus on code, not infrastructure management

### Show Running Application (2 minutes)

**[Browser]**
Open: URL from script output (e.g., `http://demo-webapp-env.us-east-1.elasticbeanstalk.com`)

**Point out on screen:**
- "Application is running on Elastic Beanstalk-managed infrastructure"
- "Upload a file - it's stored in private S3 bucket"
- "Files accessible via pre-signed URLs for security"
- "This is PaaS - AWS manages the infrastructure, we manage the code"

**Comparison point:**
"With Elastic Beanstalk, we don't manage servers. AWS handles capacity, load balancing, scaling, and health monitoring. We deploy code, AWS handles the rest."

---

## Part 2: PaaS - Serverless Architecture (9 minutes)

### Introduction to Serverless (2 minutes)

**[Slide: PaaS Concept]**
"Now let's move to PaaS - Platform as a Service. With serverless, AWS manages all infrastructure. We just upload code."

**[Terminal]**
```bash
cd ../part2-serverless-demo
```

**Architecture explanation:**
"We'll demonstrate three Lambda functions integrated with SNS and SQS:
1. Order Processor - receives and validates orders
2. SNS Handler - triggered by notifications
3. SQS Processor - processes queued messages"

**[Show architecture diagram on slide]**
- "Event-driven architecture"
- "No servers to manage"
- "Auto-scales automatically"
- "Pay only for execution time"

### Deploy Lambda Functions (2 minutes)

**[Terminal]**
```bash
./deploy-lambda.sh
```

**While script runs, explain:**
1. "Creating IAM role - defines what Lambda can access"
2. "Creating SNS topic - for pub/sub notifications"
3. "Creating SQS queue - for reliable message processing"
4. "Deploying Lambda functions - just uploading code"
5. "Configuring triggers - no manual setup needed"

**Key PaaS characteristics:**
- ✓ No server management
- ✓ Automatic scaling
- ✓ Pay per execution (not idle time)
- ✓ Built-in monitoring
- ✓ AWS handles patching, availability

### Live Demonstration (3 minutes)

**Test 1: SNS Trigger**
```bash
aws sns publish --topic-arn [ARN] --subject "Live Demo" --message "Order #12345 received"
```

**[Show CloudWatch Logs]**
```bash
aws logs tail /aws/lambda/demo-sns-handler --follow
```

**Explain what's happening:**
- "Message published to SNS"
- "Lambda automatically triggered in milliseconds"
- "Function processes and forwards to SQS"
- "All without any server management"

**Test 2: SQS Queue**
```bash
aws sqs send-message --queue-url [URL] --message-body '{"order":"test"}'
```

**Show logs:**
```bash
aws logs tail /aws/lambda/demo-sqs-processor --follow
```

**Explain:**
- "Message added to queue"
- "Lambda polls queue automatically"
- "Processes message and completes"
- "Queue ensures no message loss"

**Test 3: Complete Flow**
```bash
./test-lambda.sh
```

**Highlight:**
- "All three components working together"
- "Event-driven, loosely coupled"
- "Each service scales independently"

### Architecture Benefits (2 minutes)

**[Slide: IaaS vs PaaS Comparison]**

| Aspect | PaaS (Elastic Beanstalk) | PaaS (Lambda) |
|--------|------------|---------------|
| **Management** | Platform manages infrastructure | AWS manages everything |
| **Scaling** | Automatic (load balancer) | Automatic, instant |
| **Pricing** | Hourly EC2 instances | Per-execution |
| **Idle Cost** | Yes (instances running) | No (pay only when used) |
| **Setup Time** | Minutes | Seconds |
| **Maintenance** | AWS handles platform updates | None required |
| **Best For** | Web applications, APIs | Event-driven workloads |

**Cost Example:**
"For this demo:
- Elastic Beanstalk: ~$7.50/month for t3.micro (if left running)
- Lambda: ~$0.000001 per execution = pennies for thousands of requests
- Both eligible for AWS Free Tier!"

---

## Conclusion (2 minutes)

### SaaS Quick Mention

**[Slide: SaaS Examples]**
"We've been using SaaS throughout this demo:
- AWS Console - web interface for management
- CloudWatch - monitoring and logging
- No installation, no management, just use the service"

### Summary

**[Slide: Three Service Models]**

**IaaS (EC2 - lower level):**
- Maximum control and flexibility
- You manage OS and applications
- Best for: Custom environments, specific requirements
- Example: Running databases, custom applications

**PaaS (Elastic Beanstalk - managed platform):**
- Simplified deployment and management
- AWS manages infrastructure, you manage code
- Best for: Web applications, APIs
- Example: Web apps, REST APIs

**PaaS (Lambda, SNS, SQS - serverless):**
- Focus purely on code, zero infrastructure
- Automatic scaling and management
- Best for: Event-driven apps, microservices
- Example: Real-time data processing, IoT backends

**SaaS:**
- Fully managed software
- No infrastructure or platform management
- Best for: Standard business applications
- Example: Salesforce, Office 365, Gmail

### When to Use Each

**[Slide: Decision Guide]**
- **Use IaaS (EC2) when:** You need full control, specific configurations, or migrating legacy apps
- **Use PaaS (Elastic Beanstalk) when:** Building web apps, want managed infrastructure, need auto-scaling
- **Use PaaS (Lambda) when:** Event-driven workloads, sporadic usage, want zero server management
- **Use SaaS when:** Standard functionality meets needs, no customization required

### Demo Wrap-up

**[Terminal]**
"Let me show both services running simultaneously:"

**[Browser: EC2 App]** - `http://PUBLIC_IP:5000`
**[Terminal: Lambda Logs]** - Real-time log streaming

"Both serving the same goal, different approaches:
- EC2: Traditional, controllable, always-on
- Lambda: Modern, managed, on-demand"

---

## Q&A (Time Permitting)

**Common Questions & Answers:**

**Q: "What about data persistence?"**
A: "Both models support databases. EC2 can host databases directly. Lambda connects to managed databases like RDS or DynamoDB."

**Q: "How do costs compare at scale?"**
A: "Depends on usage patterns. Lambda wins for sporadic workloads. EC2 can be cheaper for consistent, high-traffic applications."

**Q: "Can you mix IaaS and PaaS?"**
A: "Absolutely! Most architectures use both. For example, EC2 for databases, Lambda for API processing."

**Q: "What about cold starts with Lambda?"**
A: "Lambda has ~100-300ms cold start. For most use cases, this is acceptable. Use provisioned concurrency for latency-sensitive apps."

---

## Cleanup

**[Important: After Demo]**
```bash
./cleanup.sh
```

"Always clean up demo resources to avoid charges!"

---

## Backup Slides / Extra Content

### Detailed Cost Breakdown

**EC2 t2.micro:**
- On-Demand: $0.0116/hour
- Per month: ~$8.50 (if running 24/7)
- Reserved Instance: ~$4/month (1-year commitment)

**Lambda:**
- First 1M requests: FREE
- After: $0.20 per 1M requests
- Compute: $0.0000166667 per GB-second
- Example: 1M executions at 512MB, 1s each = $8.33/month

### Real-World Use Cases

**IaaS (EC2):**
- Legacy application migration
- Databases requiring specific configurations
- Applications needing GPU compute
- Development and testing environments

**PaaS (Lambda):**
- Image/video processing pipelines
- Real-time file processing
- Scheduled tasks and cron jobs
- API backends with variable traffic
- IoT data processing

---

## Presenter Notes

### Timing Checkpoints
- **5 minutes:** Should be showing EC2 application running
- **10 minutes:** Should have started Lambda deployment
- **15 minutes:** Should be demonstrating live Lambda triggers
- **18 minutes:** Should be in comparison/conclusion
- **20 minutes:** Open for questions

### Key Messages to Drive Home
1. **IaaS = Control** - You manage, you're responsible
2. **PaaS = Convenience** - AWS manages, you focus on code
3. **Cost = Usage-based** - Pay for what you use
4. **No silver bullet** - Each has its place

### Troubleshooting During Demo

**If EC2 app doesn't load:**
- "The user-data script takes 2-3 minutes to complete"
- Show SSH into instance and check logs: `sudo journalctl -u webapp -f`

**If Lambda doesn't trigger:**
- "Let's check CloudWatch Logs directly"
- Open AWS Console and show Lambda configuration

**If time runs short:**
- Skip detailed code walkthrough
- Focus on live demos and comparisons
- Show final architecture diagrams

### Energy and Engagement
- Make it interactive: "Let's see what happens when..."
- Show enthusiasm about serverless benefits
- Acknowledge trade-offs honestly
- Use analogies: "EC2 is like owning a car, Lambda is like Uber"

---

## Post-Demo Resources

Share with audience:
```
GitHub Repository: [your-repo-url]
AWS Documentation: aws.amazon.com/documentation
AWS Free Tier: aws.amazon.com/free
```

**Next Steps for Learners:**
1. Sign up for AWS Free Tier
2. Follow this demo step-by-step
3. Explore AWS tutorials
4. Build a simple serverless API
5. Try AWS Certified Cloud Practitioner exam
