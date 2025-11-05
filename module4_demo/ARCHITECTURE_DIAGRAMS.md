# Architecture Diagrams & Visual Guides

## Demo Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    AWS Cloud Computing Demo                  │
│                                                              │
│  ┌────────────────────┐         ┌───────────────────────┐  │
│  │   Part 1: IaaS    │         │   Part 2: PaaS        │  │
│  │   (EC2)           │         │   (Lambda + SNS/SQS)  │  │
│  └────────────────────┘         └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 1: IaaS Architecture (EC2)

### High-Level View
```
┌──────────────────────────────────────────────────────────┐
│                         Internet                          │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTP Port 5000
                     ▼
┌──────────────────────────────────────────────────────────┐
│               Security Group (Firewall)                   │
│  Inbound Rules:                                          │
│  - Port 5000 (HTTP) from 0.0.0.0/0                      │
│  - Port 22 (SSH) from 0.0.0.0/0                         │
└────────────────────┬─────────────────────────────────────┘
                     ▼
┌──────────────────────────────────────────────────────────┐
│                   EC2 Instance (t2.micro)                 │
│  ┌────────────────────────────────────────────────────┐  │
│  │           Amazon Linux 2 OS                        │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │      Python 3 + Flask Application           │ │  │
│  │  │  - app.py (Flask web server)                │ │  │
│  │  │  - Runs on port 5000                        │ │  │
│  │  │  - Displays instance information            │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

You Manage:
├── Operating System (Amazon Linux 2)
├── Python Runtime
├── Application Code
├── Security Patches
├── Scaling Configuration
└── Server Maintenance
```

### EC2 Component Breakdown
```
┌─────────────────────────────────────────────────┐
│                EC2 Instance                      │
├─────────────────────────────────────────────────┤
│ Instance Type: t2.micro                         │
│ vCPUs: 1                                        │
│ Memory: 1 GB                                    │
│ Storage: 8 GB EBS                               │
│ Network: VPC + Public IP                        │
└─────────────────────────────────────────────────┘
         │
         ├── Operating System Layer
         │   └── Amazon Linux 2
         │
         ├── Runtime Layer
         │   ├── Python 3.9
         │   ├── Flask 3.0.0
         │   └── Gunicorn (WSGI server)
         │
         └── Application Layer
             ├── app.py (Flask app)
             ├── templates/index.html
             └── Systemd service (webapp.service)
```

---

## Part 2: PaaS Architecture (Serverless)

### Complete Serverless Flow
```
┌────────────────────────────────────────────────────────────────┐
│                      Serverless Architecture                    │
└────────────────────────────────────────────────────────────────┘

   ┌─────────────────┐
   │  Order Request  │  (Manual trigger or API Gateway)
   └────────┬────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │  Lambda: Order Processor             │
   │  - Validates order                   │
   │  - Generates order ID                │
   └────────┬─────────────────────┬───────┘
            │                     │
            │ Publish             │ Send Message
            ▼                     ▼
   ┌────────────────┐    ┌──────────────────┐
   │  SNS Topic     │    │   SQS Queue      │
   │  (Pub/Sub)     │    │   (Message       │
   │                │    │    Queue)        │
   └────────┬───────┘    └─────────┬────────┘
            │                      │
            │ Trigger              │ Trigger (Polling)
            ▼                      ▼
   ┌────────────────┐    ┌──────────────────┐
   │  Lambda:       │    │  Lambda:         │
   │  SNS Handler   │    │  SQS Processor   │
   │  - Processes   │    │  - Processes     │
   │    notification│    │    queued        │
   │  - Logs event  │    │    messages      │
   │  - Forwards to │    │  - Sends         │
   │    SQS         │    │    notifications │
   └────────────────┘    └──────────────────┘
```

### Lambda Function Details
```
┌────────────────────────────────────────────────┐
│          Lambda Function (Serverless)          │
├────────────────────────────────────────────────┤
│ Runtime: Python 3.9                            │
│ Memory: 128 MB (default)                       │
│ Timeout: 30 seconds                            │
│ Execution Role: demo-lambda-execution-role     │
├────────────────────────────────────────────────┤
│ Triggers:                                      │
│ ├── SNS Topic Subscription                    │
│ ├── SQS Event Source Mapping                  │
│ └── Direct Invocation (API Gateway)           │
├────────────────────────────────────────────────┤
│ Permissions:                                   │
│ ├── CloudWatch Logs (Write)                   │
│ ├── SNS (Publish)                             │
│ └── SQS (Send/Receive/Delete Messages)        │
└────────────────────────────────────────────────┘

AWS Manages:
├── Server provisioning
├── Operating system
├── Runtime environment
├── Scaling (0 to 1000s)
├── Fault tolerance
├── Availability
└── Patching & updates

You Manage:
└── Application code only!
```

---

## SNS (Simple Notification Service) Architecture

```
                    ┌──────────────────┐
                    │    SNS Topic     │
                    │ "demo-notifications"
                    └────────┬─────────┘
                             │
                    Publish  │  Fan-out (1-to-Many)
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
   │  Lambda     │    │  Email      │   │  SMS        │
   │  Function   │    │  Subscriber │   │  Subscriber │
   │             │    │  (optional) │   │  (optional) │
   └─────────────┘    └─────────────┘   └─────────────┘

Features:
├── Publish once, deliver to many
├── Push-based delivery
├── Supports multiple protocols
│   ├── Lambda
│   ├── Email
│   ├── SMS
│   ├── HTTP/HTTPS
│   └── SQS
└── Immediate delivery (< 1 second)
```

---

## SQS (Simple Queue Service) Architecture

```
                    ┌──────────────────┐
                    │    SQS Queue     │
   Producers        │ "demo-processing-queue"    Consumers
   ────────────────►│                  │◄──────────────────
                    │ ┌──┐ ┌──┐ ┌──┐  │
   Order Processor  │ │M1│ │M2│ │M3│  │  SQS Processor
   Lambda           │ └──┘ └──┘ └──┘  │  Lambda
                    │                  │
                    │ FIFO or Standard │
                    └──────────────────┘

Features:
├── Reliable message queuing
├── Pull-based processing
├── At-least-once delivery
├── Message retention: up to 14 days
├── Automatic scaling
└── Dead-letter queue support

Message Flow:
1. Producer sends message → Queue
2. Message stored reliably
3. Consumer polls queue
4. Consumer processes message
5. Consumer deletes message
```

---

## IaaS vs PaaS Comparison Visual

```
┌──────────────────────────────────────────────────────────────┐
│                    Responsibility Model                       │
└──────────────────────────────────────────────────────────────┘

IaaS (EC2)                              PaaS (Lambda)
                                        
┌──────────────────┐                   ┌──────────────────┐
│  Application     │ ← YOU MANAGE      │  Application     │ ← YOU
├──────────────────┤                   ├──────────────────┤
│  Data            │ ← YOU MANAGE      │                  │
├──────────────────┤                   │                  │
│  Runtime (Python)│ ← YOU MANAGE      │                  │
├──────────────────┤                   │                  │
│  OS (Linux)      │ ← YOU MANAGE      │                  │
├──────────────────┤                   ├──────────────────┤
│  Virtualization  │ ← AWS MANAGES     │  Runtime         │ ← AWS
├──────────────────┤                   ├──────────────────┤
│  Servers         │ ← AWS MANAGES     │  OS              │ ← AWS
├──────────────────┤                   ├──────────────────┤
│  Storage         │ ← AWS MANAGES     │  Servers         │ ← AWS
├──────────────────┤                   ├──────────────────┤
│  Networking      │ ← AWS MANAGES     │  Infrastructure  │ ← AWS
└──────────────────┘                   └──────────────────┘

More Control/Effort                    Less Control/Effort
More Flexibility                       More Convenience
```

---

## Cost Comparison Chart

```
Monthly Cost Estimate (Typical Usage)

EC2 (IaaS)                         Lambda (PaaS)
────────────────────────           ────────────────────────
Running 24/7                       Sporadic execution

┌──────────────────┐               ┌──────────────────┐
│   t2.micro       │               │  1M requests/mo  │
│   $8.50/month    │               │  FREE TIER       │
│                  │               │  $0.20 after FT  │
│  Always-on cost  │               │  Pay per use     │
└──────────────────┘               └──────────────────┘
       High                              Low
    fixed cost                      variable cost

Best for:                          Best for:
• Always-on applications           • Sporadic workloads
• Predictable traffic              • Variable traffic
• Custom configurations            • Event-driven apps
• Long-running processes           • Microservices
```

---

## Event-Driven Architecture Flow

```
┌────────────────────────────────────────────────────────────┐
│              Event-Driven Serverless Pattern               │
└────────────────────────────────────────────────────────────┘

Event Sources                Events              Processors
──────────────              ────────             ──────────

┌─────────────┐             ┌──────┐            ┌──────────┐
│   API       │────────────►│ SNS  │───────────►│ Lambda 1 │
│  Gateway    │             │Topic │            └──────────┘
└─────────────┘             └──────┘                 │
                                                     │
┌─────────────┐             ┌──────┐                ▼
│  S3 Bucket  │────────────►│ SQS  │            ┌──────────┐
│  (Upload)   │             │Queue │───────────►│ Lambda 2 │
└─────────────┘             └──────┘            └──────────┘
                                                     │
┌─────────────┐             ┌──────┐                ▼
│   Scheduler │────────────►│Direct│            ┌──────────┐
│  (Cron)     │             │Invoke│───────────►│ Lambda 3 │
└─────────────┘             └──────┘            └──────────┘

Characteristics:
✓ Loosely coupled components
✓ Asynchronous processing
✓ Automatic scaling
✓ Fault tolerant
✓ Cost effective
```

---

## Demo Deployment Sequence

### Part 1: EC2 Deployment Steps
```
1. setup-ec2.sh execution
   │
   ├─► Step 1: Check AWS CLI
   │
   ├─► Step 2: Get Latest AMI
   │
   ├─► Step 3: Create Security Group
   │           ├─► Allow port 5000 (HTTP)
   │           └─► Allow port 22 (SSH)
   │
   ├─► Step 4: Verify SSH Key Pair
   │
   ├─► Step 5: Launch EC2 Instance
   │           ├─► Attach security group
   │           ├─► Inject user-data script
   │           └─► Tag as "Demo-Web-App"
   │
   ├─► Step 6: Wait for Running State
   │
   └─► Step 7: Display Public IP
                │
                └─► User-data script runs:
                    ├─► Update packages
                    ├─► Install Python 3
                    ├─► Create app files
                    ├─► Install Flask
                    ├─► Create systemd service
                    └─► Start application

Time: ~3 minutes total
```

### Part 2: Lambda Deployment Steps
```
2. deploy-lambda.sh execution
   │
   ├─► Step 1: Check AWS CLI
   │
   ├─► Step 2: Create IAM Role
   │           ├─► Trust policy for Lambda
   │           └─► Attach policies (SNS, SQS, Logs)
   │
   ├─► Step 3: Create SNS Topic
   │
   ├─► Step 4: Create SQS Queue
   │
   ├─► Step 5: Package Lambda Functions
   │           ├─► zip sns_handler.py
   │           ├─► zip sqs_processor.py
   │           └─► zip order_processor.py
   │
   ├─► Step 6: Deploy Lambda Functions
   │           ├─► Upload zip files
   │           ├─► Set environment variables
   │           └─► Configure timeouts
   │
   └─► Step 7: Configure Triggers
               ├─► Subscribe SNS → Lambda
               └─► Connect SQS → Lambda

Time: ~2 minutes total
```

---

## Monitoring & Observability

```
┌────────────────────────────────────────────────────────────┐
│                 AWS CloudWatch Integration                  │
└────────────────────────────────────────────────────────────┘

EC2 Metrics                          Lambda Metrics
──────────────                      ────────────────
• CPU Utilization                   • Invocations
• Network In/Out                    • Duration
• Disk Read/Write                   • Errors
• Status Checks                     • Throttles
                                    • Concurrent Executions

         │                                   │
         └───────────┬───────────────────────┘
                     ▼
         ┌────────────────────┐
         │  CloudWatch Logs   │
         │  - Application logs│
         │  - Error tracking  │
         │  - Performance data│
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │  CloudWatch        │
         │  Dashboards        │
         │  - Visual metrics  │
         │  - Custom graphs   │
         └────────────────────┘
```

---

## Security Model

```
┌────────────────────────────────────────────────────────────┐
│                      Security Layers                        │
└────────────────────────────────────────────────────────────┘

1. IAM (Identity & Access Management)
   ├─► Users & Roles
   ├─► Policies & Permissions
   └─► Access Keys

2. Security Groups (EC2)
   ├─► Inbound Rules (Port 5000, 22)
   ├─► Outbound Rules (All allowed)
   └─► Stateful firewall

3. Execution Roles (Lambda)
   ├─► Lambda can access SNS
   ├─► Lambda can access SQS
   └─► Lambda can write logs

4. Network Security
   ├─► VPC (Virtual Private Cloud)
   ├─► Public/Private Subnets
   └─► Internet Gateway

5. Encryption
   ├─► At rest (EBS, S3)
   ├─► In transit (TLS/SSL)
   └─► KMS key management
```

---

## Scaling Patterns

### EC2 Scaling (Manual/Planned)
```
Traffic:  Low ────► Medium ────► High ────► Low
          │         │            │          │
EC2:      │         │            │          │
┌─────┐   │  ┌─────┬─────┐      │  ┌──┬──┬──┬──┐  │  ┌─────┐
│ i-1 │◄──┘  │ i-1 │ i-2 │◄─────┘  │i1│i2│i3│i4│◄─┘  │ i-1 │
└─────┘      └─────┴─────┘         └──┴──┴──┴──┘     └─────┘
  (1)           (2)                    (4)              (1)

Manual or Auto Scaling Group required
```

### Lambda Scaling (Automatic/Instant)
```
Requests: Low ────► High ────► Very High ────► Low
          │         │          │               │
Lambda:   │         │          │               │
 ┌─┐◄─────┘   ┌─┬─┬─┬─┐◄─────┘ ┌─┬─┬─┬─┬─┬─┬─┬─┐◄─┘   ┌─┐
 │1│         │1│2│3│4│        │1│2│3│4│5│6│7│8│9│    │1│
 └─┘         └─┴─┴─┴─┘        └─┴─┴─┴─┴─┴─┴─┴─┴─┘    └─┘
 (1)           (4)              (100s-1000s)           (1)

Automatic scaling, no configuration needed
```

---

## Use this document for:
- Understanding architecture before demo
- Creating PowerPoint slides
- Explaining concepts to audience
- Quick visual reference during presentation
- Drawing on whiteboard if needed

**Print relevant diagrams for easy reference during your presentation!**
