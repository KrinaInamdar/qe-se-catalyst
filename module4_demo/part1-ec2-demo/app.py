"""
Enhanced Flask Web Application for AWS Demo
Demonstrates IaaS/PaaS with Elastic Beanstalk, S3, and CloudFront
"""

from flask import Flask, render_template, jsonify, request, redirect, url_for, flash
import socket
import os
import boto3
from datetime import datetime
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'demo-secret-key-change-in-production')

# AWS Configuration
S3_BUCKET = os.environ.get('S3_BUCKET_NAME', 'demo-app-bucket')
CLOUDFRONT_DOMAIN = os.environ.get('CLOUDFRONT_DOMAIN', '')
AWS_REGION = os.environ.get('AWS_REGION', 'us-east-1')

# Initialize AWS clients
try:
    s3_client = boto3.client('s3', region_name=AWS_REGION)
except Exception as e:
    print(f"Warning: Could not initialize S3 client: {e}")
    s3_client = None

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    """Home page showing instance information and upload form"""
    return render_template('index.html', 
                          cloudfront_domain=CLOUDFRONT_DOMAIN,
                          s3_bucket=S3_BUCKET)

@app.route('/api/info')
def instance_info():
    """API endpoint returning instance and AWS service information"""
    try:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
    except:
        hostname = "Unknown"
        local_ip = "Unknown"
    
    # Get uploaded files from S3
    uploaded_files = []
    if s3_client:
        try:
            response = s3_client.list_objects_v2(Bucket=S3_BUCKET, MaxKeys=10)
            if 'Contents' in response:
                for obj in response['Contents']:
                    file_url = f"https://{CLOUDFRONT_DOMAIN}/{obj['Key']}" if CLOUDFRONT_DOMAIN else f"https://{S3_BUCKET}.s3.amazonaws.com/{obj['Key']}"
                    uploaded_files.append({
                        'name': obj['Key'],
                        'size': obj['Size'],
                        'url': file_url,
                        'last_modified': obj['LastModified'].isoformat()
                    })
        except Exception as e:
            print(f"Error listing S3 objects: {e}")
    
    info = {
        'hostname': hostname,
        'local_ip': local_ip,
        'timestamp': datetime.now().isoformat(),
        'message': 'Running on AWS Elastic Beanstalk with S3 and CloudFront',
        'aws_services': {
            'compute': 'AWS Elastic Beanstalk',
            'storage': 'Amazon S3',
            'cdn': 'Amazon CloudFront',
            's3_bucket': S3_BUCKET,
            'cloudfront_enabled': bool(CLOUDFRONT_DOMAIN)
        },
        'uploaded_files': uploaded_files
    }
    return jsonify(info)

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload to S3"""
    if 'file' not in request.files:
        flash('No file selected')
        return redirect(url_for('home'))
    
    file = request.files['file']
    if file.filename == '':
        flash('No file selected')
        return redirect(url_for('home'))
    
    if file and allowed_file(file.filename):
        try:
            # Generate unique filename
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4().hex[:8]}_{filename}"
            
            # Upload to S3
            if s3_client:
                s3_client.upload_fileobj(
                    file,
                    S3_BUCKET,
                    unique_filename,
                    ExtraArgs={'ContentType': file.content_type}
                )
                
                file_url = f"https://{CLOUDFRONT_DOMAIN}/{unique_filename}" if CLOUDFRONT_DOMAIN else f"https://{S3_BUCKET}.s3.amazonaws.com/{unique_filename}"
                flash(f'File uploaded successfully! URL: {file_url}')
            else:
                flash('S3 client not available')
        except Exception as e:
            flash(f'Upload failed: {str(e)}')
    else:
        flash('File type not allowed')
    
    return redirect(url_for('home'))

@app.route('/health')
def health():
    """Health check endpoint for Elastic Beanstalk"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        's3_configured': s3_client is not None,
        'cloudfront_configured': bool(CLOUDFRONT_DOMAIN)
    })

@app.route('/files')
def list_files():
    """List all files in S3 bucket"""
    files = []
    if s3_client:
        try:
            response = s3_client.list_objects_v2(Bucket=S3_BUCKET)
            if 'Contents' in response:
                for obj in response['Contents']:
                    file_url = f"https://{CLOUDFRONT_DOMAIN}/{obj['Key']}" if CLOUDFRONT_DOMAIN else f"https://{S3_BUCKET}.s3.amazonaws.com/{obj['Key']}"
                    files.append({
                        'name': obj['Key'],
                        'size': obj['Size'],
                        'url': file_url,
                        'last_modified': obj['LastModified'].isoformat()
                    })
        except Exception as e:
            print(f"Error listing files: {e}")
    
    return jsonify({'files': files})

# Elastic Beanstalk uses port 8080 by default
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
