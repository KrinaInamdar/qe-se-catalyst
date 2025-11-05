# 📚 Documentation Index

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

### Part 1: EC2 Demo (IaaS)

| File | Type | Purpose |
|------|------|---------|
| `part1-ec2-demo/app.py` | Python | Flask web application |
| `part1-ec2-demo/templates/index.html` | HTML | Web interface |
| `part1-ec2-demo/requirements.txt` | Config | Python dependencies |
| `part1-ec2-demo/user-data.sh` | Bash | EC2 bootstrap script |
| `part1-ec2-demo/setup-ec2.sh` | Bash | Automated deployment |
| `part1-ec2-demo/README.md` | Docs | EC2 demo guide |

### Part 2: Serverless Demo (PaaS)

| File | Type | Purpose |
|------|------|---------|
| `part2-serverless-demo/lambda-functions/sns_handler.py` | Python | SNS-triggered Lambda |
| `part2-serverless-demo/lambda-functions/sqs_processor.py` | Python | SQS-triggered Lambda |
| `part2-serverless-demo/lambda-functions/order_processor.py` | Python | Order processing Lambda |
| `part2-serverless-demo/deploy-lambda.sh` | Bash | Automated deployment |
| `part2-serverless-demo/test-lambda.sh` | Bash | Testing script |
| `part2-serverless-demo/cleanup-lambda.sh` | Bash | Lambda cleanup |
| `part2-serverless-demo/README.md` | Docs | Serverless demo guide |

### Utility Scripts

| File | Purpose |
|------|---------|
| `verify-setup.sh` | Pre-flight verification |
| `cleanup.sh` | Complete resource cleanup |

---

## 📋 Documentation by Use Case

### "I'm New to This"
1. Start: `GETTING_STARTED.md`
2. Setup: `PRE_DEMO_SETUP.md`
3. Verify: Run `verify-setup.sh`
4. Read: `README.md`
5. Learn: `ARCHITECTURE_DIAGRAMS.md`

### "I'm Preparing for My Demo"
1. Review: `PRESENTATION_SCRIPT.md`
2. Print: `QUICK_REFERENCE.md`
3. Check: `DEMO_DAY_CHECKLIST.md`
4. Practice: Run both demos
5. Prepare: Clean up with `cleanup.sh`

### "I'm Doing the Demo Right Now"
1. Have open: `QUICK_REFERENCE.md`
2. Follow: `PRESENTATION_SCRIPT.md`
3. Reference: `ARCHITECTURE_DIAGRAMS.md`
4. Commands: See Quick Reference

### "Something Went Wrong"
1. Check: `QUICK_REFERENCE.md` → Troubleshooting
2. Review: `part1-ec2-demo/README.md` or `part2-serverless-demo/README.md`
3. Verify: Run `verify-setup.sh` again
4. Logs: Check CloudWatch Logs

### "Demo is Over"
1. Run: `cleanup.sh`
2. Verify: Check AWS Console
3. Review: `DEMO_DAY_CHECKLIST.md` → After Presentation

---

## 🎯 Quick Reference by Topic

### AWS Setup & Configuration
- Initial setup: `PRE_DEMO_SETUP.md` → Steps 1-4
- Verification: `verify-setup.sh`
- AWS CLI commands: `QUICK_REFERENCE.md`

### EC2 (Part 1)
- Overview: `part1-ec2-demo/README.md`
- Quick start: `GETTING_STARTED.md` → Part 1
- Commands: `QUICK_REFERENCE.md` → Part 1
- Troubleshooting: `part1-ec2-demo/README.md` → Troubleshooting

### Lambda (Part 2)
- Overview: `part2-serverless-demo/README.md`
- Quick start: `GETTING_STARTED.md` → Part 2
- Commands: `QUICK_REFERENCE.md` → Part 2
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
| `part1-ec2-demo/setup-ec2.sh` | Deploys EC2 demo | During Part 1 | 3 min |
| `part2-serverless-demo/deploy-lambda.sh` | Deploys Lambda demo | During Part 2 | 2 min |
| `part2-serverless-demo/test-lambda.sh` | Tests Lambda functions | After Part 2 deploy | 1 min |
| `part2-serverless-demo/cleanup-lambda.sh` | Removes Lambda resources | After Part 2 | 1 min |
| `cleanup.sh` | Removes ALL demo resources | After complete demo | 2 min |

### Configuration Scripts (No execution)

| Script | Purpose |
|--------|---------|
| `part1-ec2-demo/user-data.sh` | EC2 instance bootstrap |
| `part1-ec2-demo/requirements.txt` | Python dependencies |

---

## 🎓 Learning Path

### Beginner (Never used AWS)
```
Day 1: Read GETTING_STARTED.md + PRE_DEMO_SETUP.md
Day 2: Setup AWS account + Run verify-setup.sh
Day 3: Run Part 1 (EC2 demo)
Day 4: Run Part 2 (Lambda demo)
Day 5: Read PRESENTATION_SCRIPT.md
Day 6: Practice complete demo
Day 7: Present!
```

### Intermediate (Some AWS experience)
```
Hour 1: Read GETTING_STARTED.md + verify-setup.sh
Hour 2: Run both demos
Hour 3: Read PRESENTATION_SCRIPT.md
Hour 4: Practice demo
Ready to present!
```

### Advanced (AWS expert)
```
15 min: Scan README.md
15 min: Run both demos
30 min: Customize for your needs
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
| ...install AWS CLI? | `PRE_DEMO_SETUP.md` → Step 1 |
| ...create SSH key? | `PRE_DEMO_SETUP.md` → Step 3 |
| ...deploy EC2? | `GETTING_STARTED.md` → Part 1 |
| ...deploy Lambda? | `GETTING_STARTED.md` → Part 2 |
| ...test Lambda? | `part2-serverless-demo/test-lambda.sh` |
| ...clean up? | `cleanup.sh` |
| ...troubleshoot? | `QUICK_REFERENCE.md` → Troubleshooting |
| ...understand architecture? | `ARCHITECTURE_DIAGRAMS.md` |
| ...present this? | `PRESENTATION_SCRIPT.md` |

### "What if...?"

| Scenario | Solution Location |
|----------|-------------------|
| ...AWS CLI doesn't work? | `QUICK_REFERENCE.md` → Troubleshooting |
| ...EC2 app won't load? | `part1-ec2-demo/README.md` → Troubleshooting |
| ...Lambda won't trigger? | `part2-serverless-demo/README.md` → Troubleshooting |
| ...I run out of time? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |
| ...internet fails? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |
| ...demo doesn't work? | `DEMO_DAY_CHECKLIST.md` → Emergency Procedures |

---

## 📈 Document Dependencies

```
Start Here
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
✅ Run `verify-setup.sh`
✅ Run `cleanup.sh` (clean slate)
✅ Print `QUICK_REFERENCE.md`

### During Demo
✅ Follow `PRESENTATION_SCRIPT.md`
✅ Have `QUICK_REFERENCE.md` open

### After Demo
✅ Run `cleanup.sh` (IMPORTANT!)
✅ Verify resources deleted
✅ Check AWS billing

---

## 🎯 Success Metrics

You're ready when you can:
- [ ] Run `verify-setup.sh` with no errors
- [ ] Deploy EC2 demo in under 5 minutes
- [ ] Deploy Lambda demo in under 3 minutes
- [ ] Explain IaaS vs PaaS confidently
- [ ] Troubleshoot common issues
- [ ] Complete demo in 20 minutes
- [ ] Clean up all resources

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
├── Documentation (8 files)
│   ├── README.md (main)
│   ├── GETTING_STARTED.md (quickstart)
│   ├── DEMO_OVERVIEW.md (architecture)
│   ├── PRE_DEMO_SETUP.md (setup)
│   ├── PRESENTATION_SCRIPT.md (script)
│   ├── QUICK_REFERENCE.md (cheat sheet)
│   ├── DEMO_DAY_CHECKLIST.md (checklist)
│   └── ARCHITECTURE_DIAGRAMS.md (visuals)
│
├── Scripts (2 files)
│   ├── verify-setup.sh (verification)
│   └── cleanup.sh (cleanup)
│
├── Part 1: EC2 (6 files)
│   └── Complete IaaS demo
│
└── Part 2: Lambda (7 files)
    └── Complete PaaS demo

Total: 23 files organized for easy navigation
```

---

**Start your journey: [GETTING_STARTED.md](GETTING_STARTED.md) →**

**Questions? See [README.md](README.md) for complete documentation.**

**Ready to present? Check [DEMO_DAY_CHECKLIST.md](DEMO_DAY_CHECKLIST.md)!**
