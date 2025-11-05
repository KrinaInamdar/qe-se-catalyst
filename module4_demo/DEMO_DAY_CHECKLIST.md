# Demo Day Checklist

## 📅 One Week Before

- [ ] Read all documentation files
- [ ] Install AWS CLI
- [ ] Configure AWS credentials
- [ ] Create SSH key pair
- [ ] Run `./verify-setup.sh`
- [ ] Test Part 1 (EC2 demo)
- [ ] Test Part 2 (Lambda demo)
- [ ] Run `./cleanup.sh`
- [ ] Review cost estimates
- [ ] Set up AWS billing alerts

---

## 📅 One Day Before

- [ ] Run `./verify-setup.sh` again
- [ ] Test complete demo flow
- [ ] Time yourself (should be ~20 minutes)
- [ ] Print `QUICK_REFERENCE.md`
- [ ] Prepare backup plans
- [ ] Check AWS Free Tier usage
- [ ] Clean up any test resources
- [ ] Charge laptop fully
- [ ] Test projector/screen sharing
- [ ] Prepare architecture diagrams

---

## 🕐 2 Hours Before

- [ ] Run `./cleanup.sh` for clean slate
- [ ] Verify AWS CLI still works: `aws sts get-caller-identity`
- [ ] Check internet connection
- [ ] Test terminal visibility (font size)
- [ ] Open browser tabs:
  - [ ] AWS Console → EC2
  - [ ] AWS Console → Lambda
  - [ ] AWS Console → CloudWatch
  - [ ] AWS Console → SNS
  - [ ] AWS Console → SQS
- [ ] Close unnecessary applications
- [ ] Silence notifications
- [ ] Have power adapter ready

---

## 🕐 30 Minutes Before

- [ ] Open 3 terminal windows:
  - [ ] Terminal 1: For EC2 demo
  - [ ] Terminal 2: For Lambda demo
  - [ ] Terminal 3: For logs/testing
- [ ] Navigate to project directory in all terminals
- [ ] Set terminal font size to 16-18pt
- [ ] Test terminal visibility on projector
- [ ] Have `QUICK_REFERENCE.md` open on laptop
- [ ] Have `PRESENTATION_SCRIPT.md` open on phone/tablet
- [ ] Final AWS CLI test: `aws ec2 describe-regions --query 'Regions[0]'`
- [ ] Verify no resources running: 
  - [ ] `aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceId'`
  - [ ] `aws lambda list-functions --query 'Functions[?starts_with(FunctionName, \`demo\`)].FunctionName'`

---

## 🕐 5 Minutes Before

- [ ] Close email, Slack, messaging apps
- [ ] Turn off phone notifications
- [ ] Have water bottle ready
- [ ] Position `QUICK_REFERENCE.md` for easy viewing
- [ ] Take deep breath
- [ ] Ready to present!

---

## 🎤 During Presentation Checklist

### Introduction (1 min)
- [ ] Welcome audience
- [ ] Introduce IaaS, PaaS, SaaS concepts
- [ ] Explain demo structure

### Part 1: EC2 Demo (8 min)
- [ ] Navigate to `part1-ec2-demo`
- [ ] Briefly show `app.py` code
- [ ] Run `./setup-ec2.sh`
- [ ] Explain IaaS concepts while deploying
- [ ] Note PUBLIC_IP from output
- [ ] Wait ~2 minutes for application
- [ ] Open browser to `http://PUBLIC_IP:5000`
- [ ] Show application running
- [ ] Explain key IaaS points:
  - [ ] Full infrastructure control
  - [ ] OS management responsibility
  - [ ] 24/7 running costs
  - [ ] Manual scaling needed

### Part 2: Lambda Demo (9 min)
- [ ] Navigate to `part2-serverless-demo`
- [ ] Explain serverless architecture
- [ ] Run `./deploy-lambda.sh`
- [ ] Explain PaaS concepts while deploying
- [ ] Note SNS Topic ARN and SQS Queue URL
- [ ] Test 1: Send SNS notification
- [ ] Show CloudWatch logs (real-time)
- [ ] Test 2: Send SQS message
- [ ] Show processing in logs
- [ ] Run `./test-lambda.sh` for complete flow
- [ ] Explain key PaaS points:
  - [ ] No server management
  - [ ] Auto-scaling
  - [ ] Pay-per-execution
  - [ ] Event-driven

### Comparison & Conclusion (2 min)
- [ ] Show IaaS vs PaaS comparison table
- [ ] Discuss cost differences
- [ ] Explain use case scenarios
- [ ] Mention SaaS examples (AWS Console, CloudWatch)
- [ ] Open for questions

---

## ✅ Immediately After Presentation

- [ ] Run `./cleanup.sh`
- [ ] Verify EC2 instances terminated
- [ ] Verify Lambda functions deleted
- [ ] Verify SNS topics deleted
- [ ] Verify SQS queues deleted
- [ ] Check AWS Console to confirm
- [ ] Thank audience
- [ ] Share GitHub repository link
- [ ] Offer to answer follow-up questions

---

## 📊 Within 24 Hours After

- [ ] Check AWS billing for any unexpected charges
- [ ] Review what went well
- [ ] Note what could improve
- [ ] Delete CloudWatch Log groups if desired:
  - [ ] `/aws/lambda/demo-sns-handler`
  - [ ] `/aws/lambda/demo-sqs-processor`
  - [ ] `/aws/lambda/demo-order-processor`
- [ ] Share presentation slides with participants
- [ ] Send follow-up resources email

---

## 🆘 Emergency Procedures

### If AWS CLI Fails
- [ ] Switch to AWS Console UI
- [ ] Walk through manual creation
- [ ] Use pre-prepared screenshots
- [ ] Focus on concepts over live demo

### If Internet Connection Drops
- [ ] Switch to offline slides
- [ ] Show architecture diagrams
- [ ] Walk through code locally
- [ ] Focus on conceptual explanations
- [ ] Show pre-recorded demo video (if prepared)

### If Demo Doesn't Work
- [ ] Stay calm - audience is forgiving
- [ ] Use backup screenshots
- [ ] Explain what should happen
- [ ] Show CloudWatch logs for debugging
- [ ] Turn into learning opportunity

### If Running Over Time
- [ ] Skip detailed code walkthrough
- [ ] Reduce to one Lambda test
- [ ] Jump straight to comparison table
- [ ] Shorten Q&A

### If Running Under Time
- [ ] Go deeper into CloudWatch metrics
- [ ] Show AWS Console navigation
- [ ] Explain additional services
- [ ] Open floor for more questions
- [ ] Discuss real-world use cases

---

## 📝 Notes Section

Use this space for your own notes during practice runs:

**Practice Run 1 (Date: _______)**
- What went well:
- What to improve:
- Timing:

**Practice Run 2 (Date: _______)**
- What went well:
- What to improve:
- Timing:

**Final Notes:**
- 
- 
- 

---

## 🎯 Success Criteria

You've succeeded if participants understand:
- [ ] Difference between IaaS, PaaS, and SaaS
- [ ] When to use EC2 vs Lambda
- [ ] Cost implications of each model
- [ ] Basic AWS service integration
- [ ] How to get started with AWS

---

## 💡 Pro Tips

✅ **Do:**
- Speak clearly and maintain good pace
- Make eye contact with audience
- Show enthusiasm about technology
- Admit when you don't know something
- Use analogies to explain concepts
- Engage audience with questions

❌ **Don't:**
- Rush through demos
- Skip error messages
- Apologize for technical issues
- Read slides word-for-word
- Use too much jargon
- Forget to clean up resources

---

## 📞 Emergency Contacts

- AWS Support: https://console.aws.amazon.com/support
- AWS Status: https://status.aws.amazon.com
- Your AWS Account ID: ________________
- Backup Presenter (if any): ________________
- IT Support: ________________

---

**Remember: You've practiced this. You know the material. You've got this! 🚀**

**Most Important:** Run `./cleanup.sh` after demo! ⚠️
