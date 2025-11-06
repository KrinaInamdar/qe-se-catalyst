#===============================================================================
# Homework Verification Script - PowerShell Version
# Checks if all required AWS resources have been created
#===============================================================================

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Homework Verification" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: SNS Topic
Write-Host "Checking SNS Topic..." -ForegroundColor Yellow
$snsTopics = aws sns list-topics --query "Topics[?contains(TopicArn, 'task-notifications')].TopicArn" --output text

if ($snsTopics) {
    Write-Host "✓ SNS Topic found: $snsTopics" -ForegroundColor Green
} else {
    Write-Host "✗ SNS Topic 'task-notifications' not found" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 2: SQS Queue
Write-Host "Checking SQS Queue..." -ForegroundColor Yellow
try {
    $queueUrl = aws sqs get-queue-url --queue-name task-processing-queue --query QueueUrl --output text 2>$null
    if ($queueUrl) {
        Write-Host "✓ SQS Queue found: $queueUrl" -ForegroundColor Green
    } else {
        throw "Queue not found"
    }
} catch {
    Write-Host "✗ SQS Queue 'task-processing-queue' not found" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 3: IAM Role
Write-Host "Checking IAM Role..." -ForegroundColor Yellow
try {
    $roleArn = aws iam get-role --role-name task-lambda-execution-role --query Role.Arn --output text 2>$null
    if ($roleArn) {
        Write-Host "✓ IAM Role found: $roleArn" -ForegroundColor Green
    } else {
        throw "Role not found"
    }
} catch {
    Write-Host "✗ IAM Role 'task-lambda-execution-role' not found" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 4: Lambda Functions
Write-Host "Checking Lambda Functions..." -ForegroundColor Yellow
$taskValidator = aws lambda get-function --function-name task_validator --query Configuration.FunctionName --output text 2>$null
$taskNotifier = aws lambda get-function --function-name task_notifier --query Configuration.FunctionName --output text 2>$null

if ($taskValidator) {
    Write-Host "✓ Lambda function 'task_validator' found" -ForegroundColor Green
} else {
    Write-Host "✗ Lambda function 'task_validator' not found" -ForegroundColor Red
    $allGood = $false
}

if ($taskNotifier) {
    Write-Host "✓ Lambda function 'task_notifier' found" -ForegroundColor Green
} else {
    Write-Host "✗ Lambda function 'task_notifier' not found" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 5: SQS Event Source Mapping
Write-Host "Checking SQS Event Source Mapping..." -ForegroundColor Yellow
$mappings = aws lambda list-event-source-mappings --function-name task_validator --query "EventSourceMappings[?contains(EventSourceArn, 'task-processing-queue')].UUID" --output text 2>$null

if ($mappings) {
    Write-Host "✓ SQS trigger configured for task_validator" -ForegroundColor Green
} else {
    Write-Host "✗ SQS trigger not configured for task_validator" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Check 6: SNS Subscription
Write-Host "Checking SNS Subscription..." -ForegroundColor Yellow
$subscriptions = aws sns list-subscriptions --query "Subscriptions[?contains(Endpoint, 'task_notifier')].SubscriptionArn" --output text 2>$null

if ($subscriptions) {
    Write-Host "✓ SNS subscription configured for task_notifier" -ForegroundColor Green
} else {
    Write-Host "✗ SNS subscription not configured for task_notifier" -ForegroundColor Red
    $allGood = $false
}
Write-Host ""

# Final Summary
Write-Host "======================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "✓ All resources verified successfully!" -ForegroundColor Green
    Write-Host "You can proceed to test your Lambda functions." -ForegroundColor Green
} else {
    Write-Host "✗ Some resources are missing or misconfigured" -ForegroundColor Red
    Write-Host "Please review the errors above and fix them." -ForegroundColor Yellow
}
Write-Host "======================================" -ForegroundColor Cyan
