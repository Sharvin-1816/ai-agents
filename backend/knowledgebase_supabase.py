from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from datetime import datetime
from dotenv import load_dotenv
import time
import random
import string
import os
import mimetypes
from werkzeug.utils import secure_filename
import base64
import json

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = None

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    'txt', 'pdf', 'doc', 'docx', 'md', 'json', 'csv', 'xlsx', 'xls',
    'ppt', 'pptx', 'rtf', 'odt', 'ods', 'odp'
}

def initialize_supabase():
    """Initialize Supabase client"""
    global supabase
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase successfully!")
        return True
    except Exception as e:
        print(f"Supabase connection error: {e}")
        return False

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_file_id():
    """Generate a unique file ID"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

def init_database():
    """Initialize database tables if they don't exist"""
    try:
        # Create KnowledgeBase table
        supabase.table('KnowledgeBase').select('*').limit(1).execute()
    except:
        # Table doesn't exist, but Supabase handles table creation through the dashboard
        # We'll just proceed - tables should be created via Supabase dashboard
        pass

# Initialize Supabase on startup
initialize_supabase()

@app.route('/api/add-college', methods=['POST'])
def add_college():
    try:
        user_id = request.form.get('userID')
        college_name = request.form.get('collegeName')
        
        if not user_id or not college_name:
            return jsonify({'error': 'userID and collegeName are required'}), 400
        
        uploaded_documents = []
        
        # Handle file uploads
        if 'documents' in request.files:
            files = request.files.getlist('documents')
            
            for file in files:
                if file and file.filename and allowed_file(file.filename):
                    # Secure the filename
                    filename = secure_filename(file.filename)
                    
                    # Get file content and metadata
                    file_content = file.read()
                    file_size = len(file_content)
                    mimetype = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
                    
                    # Encode file content to base64 for storage
                    file_data_b64 = base64.b64encode(file_content).decode('utf-8')
                    file_id = generate_file_id()
                    
                    # Store file in Supabase storage or as base64 in database
                    file_record = {
                        'file_id': file_id,
                        'user_id': user_id,
                        'college_name': college_name,
                        'filename': filename,
                        'content_type': mimetype,
                        'file_size': file_size,
                        'file_data': file_data_b64,
                        'upload_date': datetime.utcnow().isoformat()
                    }
                    
                    # Insert file record
                    result = supabase.table('FileStorage').insert(file_record).execute()
                    
                    # Document metadata for KnowledgeBase
                    doc_info = {
                        'file_id': file_id,
                        'filename': filename,
                        'size': file_size,
                        'mimetype': mimetype,
                        'upload_date': datetime.utcnow().isoformat()
                    }
                    
                    uploaded_documents.append(doc_info)
        
        # College data structure
        college_data = {
            'name': college_name,
            'documents': uploaded_documents,
            'created_date': datetime.utcnow().isoformat()
        }
        
        # Check if user already exists
        user_result = supabase.table('KnowledgeBase').select('*').eq('user_id', user_id).execute()
        
        if user_result.data:
            # User exists, add college to their array
            existing_colleges = user_result.data[0].get('colleges', [])
            existing_colleges.append(college_data)
            
            update_result = supabase.table('KnowledgeBase').update({
                'colleges': existing_colleges,
                'updated_date': datetime.utcnow().isoformat()
            }).eq('user_id', user_id).execute()
            
            return jsonify({
                'message': 'College added successfully',
                'college': college_data,
                'documents_uploaded': len(uploaded_documents)
            }), 200
        else:
            # New user, create document
            new_user = {
                'user_id': user_id,
                'colleges': [college_data],
                'created_date': datetime.utcnow().isoformat(),
                'updated_date': datetime.utcnow().isoformat()
            }
            
            insert_result = supabase.table('KnowledgeBase').insert(new_user).execute()
            
            return jsonify({
                'message': 'User created and college added successfully',
                'college': college_data,
                'documents_uploaded': len(uploaded_documents)
            }), 201
                
    except Exception as e:
        print(f"Error in add_college: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/get-colleges/<user_id>', methods=['GET'])
def get_colleges(user_id):
    try:
        result = supabase.table('KnowledgeBase').select('colleges').eq('user_id', user_id).execute()
        
        if not result.data:
            return jsonify({'colleges': []}), 200
        
        colleges = result.data[0].get('colleges', [])
        return jsonify({'colleges': colleges}), 200
        
    except Exception as e:
        print(f"Error in get_colleges: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/download-document/<file_id>', methods=['GET'])
def download_document(file_id):
    try:
        result = supabase.table('FileStorage').select('filename, content_type, file_data').eq('file_id', file_id).execute()
        
        if not result.data:
            return jsonify({'error': 'File not found'}), 404
        
        file_doc = result.data[0]
        
        # Decode base64 file data
        file_content = base64.b64decode(file_doc['file_data'])
        
        # Return file content with proper headers
        response = app.response_class(
            file_content,
            mimetype=file_doc['content_type'],
            headers={
                'Content-Disposition': f'attachment; filename="{file_doc["filename"]}"'
            }
        )
        
        return response
        
    except Exception as e:
        print(f"Error in download_document: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/delete-college', methods=['DELETE'])
def delete_college():
    try:
        data = request.get_json()
        user_id = data.get('userID')
        college_name = data.get('collegeName')
        
        if not user_id or not college_name:
            return jsonify({'error': 'userID and collegeName are required'}), 400
        
        # Get current user data
        user_result = supabase.table('KnowledgeBase').select('*').eq('user_id', user_id).execute()
        
        if not user_result.data:
            return jsonify({'error': 'User not found'}), 404
        
        colleges = user_result.data[0].get('colleges', [])
        
        # Find and remove the college
        updated_colleges = [c for c in colleges if c['name'] != college_name]
        
        if len(updated_colleges) == len(colleges):
            return jsonify({'error': 'College not found'}), 404
        
        # Delete associated files from FileStorage
        supabase.table('FileStorage').delete().eq('user_id', user_id).eq('college_name', college_name).execute()
        
        # Update colleges array
        supabase.table('KnowledgeBase').update({
            'colleges': updated_colleges,
            'updated_date': datetime.utcnow().isoformat()
        }).eq('user_id', user_id).execute()
        
        return jsonify({'message': 'College deleted successfully'}), 200
        
    except Exception as e:
        print(f"Error in delete_college: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/delete-document', methods=['DELETE'])
def delete_document():
    try:
        data = request.get_json()
        user_id = data.get('userID')
        college_name = data.get('collegeName')
        file_id = data.get('fileId')
        
        if not user_id or not college_name or not file_id:
            return jsonify({'error': 'userID, collegeName, and fileId are required'}), 400
        
        # Delete file from FileStorage
        delete_result = supabase.table('FileStorage').delete().eq('file_id', file_id).execute()
        
        if not delete_result.data:
            return jsonify({'error': 'File not found'}), 404
        
        # Get current user data and remove document reference
        user_result = supabase.table('KnowledgeBase').select('*').eq('user_id', user_id).execute()
        
        if user_result.data:
            colleges = user_result.data[0].get('colleges', [])
            
            for college in colleges:
                if college['name'] == college_name:
                    college['documents'] = [doc for doc in college.get('documents', []) if doc.get('file_id') != file_id]
                    break
            
            supabase.table('KnowledgeBase').update({
                'colleges': colleges,
                'updated_date': datetime.utcnow().isoformat()
            }).eq('user_id', user_id).execute()
        
        return jsonify({'message': 'Document deleted successfully'}), 200
        
    except Exception as e:
        print(f"Error in delete_document: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/add-documents-to-college', methods=['POST'])
def add_documents_to_college():
    try:
        user_id = request.form.get('userID')
        college_name = request.form.get('collegeName')
        
        if not user_id or not college_name:
            return jsonify({'error': 'userID and collegeName are required'}), 400
        
        # Check if user and college exist
        user_result = supabase.table('KnowledgeBase').select('*').eq('user_id', user_id).execute()
        
        if not user_result.data:
            return jsonify({'error': 'User not found'}), 404
        
        colleges = user_result.data[0].get('colleges', [])
        college_exists = any(c['name'] == college_name for c in colleges)
        
        if not college_exists:
            return jsonify({'error': 'College not found'}), 404
        
        uploaded_documents = []
        
        # Handle file uploads
        if 'documents' in request.files:
            files = request.files.getlist('documents')
            
            for file in files:
                if file and file.filename and allowed_file(file.filename):
                    # Secure the filename
                    filename = secure_filename(file.filename)
                    
                    # Get file content and metadata
                    file_content = file.read()
                    file_size = len(file_content)
                    mimetype = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
                    
                    # Encode file content to base64
                    file_data_b64 = base64.b64encode(file_content).decode('utf-8')
                    file_id = generate_file_id()
                    
                    # Store file in FileStorage
                    file_record = {
                        'file_id': file_id,
                        'user_id': user_id,
                        'college_name': college_name,
                        'filename': filename,
                        'content_type': mimetype,
                        'file_size': file_size,
                        'file_data': file_data_b64,
                        'upload_date': datetime.utcnow().isoformat()
                    }
                    
                    supabase.table('FileStorage').insert(file_record).execute()
                    
                    # Document metadata
                    doc_info = {
                        'file_id': file_id,
                        'filename': filename,
                        'size': file_size,
                        'mimetype': mimetype,
                        'upload_date': datetime.utcnow().isoformat()
                    }
                    
                    uploaded_documents.append(doc_info)
        
        if uploaded_documents:
            # Add documents to the specific college
            for college in colleges:
                if college['name'] == college_name:
                    if 'documents' not in college:
                        college['documents'] = []
                    college['documents'].extend(uploaded_documents)
                    break
            
            supabase.table('KnowledgeBase').update({
                'colleges': colleges,
                'updated_date': datetime.utcnow().isoformat()
            }).eq('user_id', user_id).execute()
            
            return jsonify({
                'message': 'Documents added successfully',
                'documents_uploaded': len(uploaded_documents)
            }), 200
        else:
            return jsonify({'error': 'No valid documents provided'}), 400
        
    except Exception as e:
        print(f"Error in add_documents_to_college: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/search-documents/<user_id>', methods=['GET'])
def search_documents(user_id):
    try:
        query = request.args.get('q', '')
        college_filter = request.args.get('college', '')
        
        result = supabase.table('KnowledgeBase').select('colleges').eq('user_id', user_id).execute()
        
        if not result.data:
            return jsonify({'documents': []}), 200
        
        colleges = result.data[0].get('colleges', [])
        matching_documents = []
        
        for college in colleges:
            # Apply college filter if specified
            if college_filter and college['name'] != college_filter:
                continue
                
            for doc in college.get('documents', []):
                # Search in filename
                if not query or query.lower() in doc['filename'].lower():
                    doc_result = doc.copy()
                    doc_result['college_name'] = college['name']
                    matching_documents.append(doc_result)
        
        return jsonify({'documents': matching_documents}), 200
        
    except Exception as e:
        print(f"Error in search_documents: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/get-user-stats/<user_id>', methods=['GET'])
def get_user_stats(user_id):
    try:
        result = supabase.table('KnowledgeBase').select('colleges').eq('user_id', user_id).execute()
        
        if not result.data:
            return jsonify({
                'total_colleges': 0,
                'total_documents': 0,
                'total_storage_used': 0,
                'total_storage_mb': 0
            }), 200
        
        colleges = result.data[0].get('colleges', [])
        total_colleges = len(colleges)
        total_documents = 0
        total_storage_used = 0
        
        for college in colleges:
            college_docs = college.get('documents', [])
            total_documents += len(college_docs)
            for doc in college_docs:
                total_storage_used += doc.get('size', 0)
        
        return jsonify({
            'total_colleges': total_colleges,
            'total_documents': total_documents,
            'total_storage_used': total_storage_used,
            'total_storage_mb': round(total_storage_used / (1024 * 1024), 2)
        }), 200
        
    except Exception as e:
        print(f"Error in get_user_stats: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)