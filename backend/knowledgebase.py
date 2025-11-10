from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from gridfs import GridFS
from bson import ObjectId
import os
from datetime import datetime
import mimetypes
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = "mongodb+srv://sharvinjoshi360_db_user:ImjRmsN7jaHECftz@techfluxai.tazmd4j.mongodb.net/?retryWrites=true&w=majority&appName=TechfluxAI"
client = MongoClient(MONGO_URI)
db = client['TechfluxAI']
knowledge_base_collection = db['KnowledgeBase']

# GridFS for file storage
fs = GridFS(db)

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    'txt', 'pdf', 'doc', 'docx', 'md', 'json', 'csv', 'xlsx', 'xls',
    'ppt', 'pptx', 'rtf', 'odt', 'ods', 'odp'
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/add-college', methods=['POST'])
def add_college():
    try:
        user_id = request.form.get('userID')
        college_name = request.form.get('collegeName')
        
        if not user_id or not college_name:
            return jsonify({'error': 'userID and collegeName are required'}), 400
        
        # Check if user already exists
        user_doc = knowledge_base_collection.find_one({'userID': user_id})
        
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
                    
                    # Store file in GridFS
                    file_id = fs.put(
                        file_content,
                        filename=filename,
                        content_type=mimetype,
                        userID=user_id,
                        college=college_name,
                        upload_date=datetime.utcnow()
                    )
                    
                    # Document metadata
                    doc_info = {
                        'file_id': str(file_id),
                        'filename': filename,
                        'size': file_size,
                        'mimetype': mimetype,
                        'upload_date': datetime.utcnow()
                    }
                    
                    uploaded_documents.append(doc_info)
        
        # College data structure
        college_data = {
            'name': college_name,
            'documents': uploaded_documents,
            'created_date': datetime.utcnow()
        }
        
        if user_doc:
            # User exists, add college to their array
            result = knowledge_base_collection.update_one(
                {'userID': user_id},
                {'$push': {'colleges': college_data}}
            )
            
            if result.modified_count > 0:
                return jsonify({
                    'message': 'College added successfully',
                    'college': college_data,
                    'documents_uploaded': len(uploaded_documents)
                }), 200
            else:
                return jsonify({'error': 'Failed to add college'}), 500
        else:
            # New user, create document
            user_doc = {
                'userID': user_id,
                'colleges': [college_data],
                'created_date': datetime.utcnow()
            }
            
            result = knowledge_base_collection.insert_one(user_doc)
            
            if result.inserted_id:
                return jsonify({
                    'message': 'User created and college added successfully',
                    'college': college_data,
                    'documents_uploaded': len(uploaded_documents)
                }), 201
            else:
                return jsonify({'error': 'Failed to create user and add college'}), 500
                
    except Exception as e:
        print(f"Error in add_college: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/get-colleges/<user_id>', methods=['GET'])
def get_colleges(user_id):
    try:
        user_doc = knowledge_base_collection.find_one({'userID': user_id})
        
        if not user_doc:
            return jsonify({'colleges': []}), 200
        
        # Return colleges array
        colleges = user_doc.get('colleges', [])
        
        # Convert datetime objects to strings for JSON serialization
        for college in colleges:
            if 'created_date' in college:
                college['created_date'] = college['created_date'].isoformat()
            for doc in college.get('documents', []):
                if 'upload_date' in doc:
                    doc['upload_date'] = doc['upload_date'].isoformat()
        
        return jsonify({'colleges': colleges}), 200
        
    except Exception as e:
        print(f"Error in get_colleges: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/download-document/<file_id>', methods=['GET'])
def download_document(file_id):
    try:
        # Get file from GridFS
        file_doc = fs.get(ObjectId(file_id))
        
        if not file_doc:
            return jsonify({'error': 'File not found'}), 404
        
        # Return file content with proper headers
        response = app.response_class(
            file_doc.read(),
            mimetype=file_doc.content_type,
            headers={
                'Content-Disposition': f'attachment; filename="{file_doc.filename}"'
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
        
        # Find user document
        user_doc = knowledge_base_collection.find_one({'userID': user_id})
        
        if not user_doc:
            return jsonify({'error': 'User not found'}), 404
        
        # Find college to delete and get its documents
        college_to_delete = None
        for college in user_doc.get('colleges', []):
            if college['name'] == college_name:
                college_to_delete = college
                break
        
        if not college_to_delete:
            return jsonify({'error': 'College not found'}), 404
        
        # Delete associated files from GridFS
        for doc in college_to_delete.get('documents', []):
            try:
                fs.delete(ObjectId(doc['file_id']))
            except Exception as e:
                print(f"Error deleting file {doc['file_id']}: {str(e)}")
        
        # Remove college from user's colleges array
        result = knowledge_base_collection.update_one(
            {'userID': user_id},
            {'$pull': {'colleges': {'name': college_name}}}
        )
        
        if result.modified_count > 0:
            return jsonify({'message': 'College deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to delete college'}), 500
            
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
        
        # Delete file from GridFS
        try:
            fs.delete(ObjectId(file_id))
        except Exception as e:
            print(f"Error deleting file from GridFS: {str(e)}")
            return jsonify({'error': 'Failed to delete file'}), 500
        
        # Remove document reference from college
        result = knowledge_base_collection.update_one(
            {'userID': user_id, 'colleges.name': college_name},
            {'$pull': {'colleges.$.documents': {'file_id': file_id}}}
        )
        
        if result.modified_count > 0:
            return jsonify({'message': 'Document deleted successfully'}), 200
        else:
            return jsonify({'error': 'Failed to remove document reference'}), 500
            
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
        user_doc = knowledge_base_collection.find_one({
            'userID': user_id,
            'colleges.name': college_name
        })
        
        if not user_doc:
            return jsonify({'error': 'User or college not found'}), 404
        
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
                    
                    # Store file in GridFS
                    file_id = fs.put(
                        file_content,
                        filename=filename,
                        content_type=mimetype,
                        userID=user_id,
                        college=college_name,
                        upload_date=datetime.utcnow()
                    )
                    
                    # Document metadata
                    doc_info = {
                        'file_id': str(file_id),
                        'filename': filename,
                        'size': file_size,
                        'mimetype': mimetype,
                        'upload_date': datetime.utcnow()
                    }
                    
                    uploaded_documents.append(doc_info)
        
        if uploaded_documents:
            # Add documents to the specific college
            result = knowledge_base_collection.update_one(
                {'userID': user_id, 'colleges.name': college_name},
                {'$push': {'colleges.$.documents': {'$each': uploaded_documents}}}
            )
            
            if result.modified_count > 0:
                return jsonify({
                    'message': 'Documents added successfully',
                    'documents_uploaded': len(uploaded_documents)
                }), 200
            else:
                return jsonify({'error': 'Failed to add documents'}), 500
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
        
        user_doc = knowledge_base_collection.find_one({'userID': user_id})
        
        if not user_doc:
            return jsonify({'documents': []}), 200
        
        matching_documents = []
        
        for college in user_doc.get('colleges', []):
            # Apply college filter if specified
            if college_filter and college['name'] != college_filter:
                continue
                
            for doc in college.get('documents', []):
                # Search in filename
                if not query or query.lower() in doc['filename'].lower():
                    doc_result = doc.copy()
                    doc_result['college_name'] = college['name']
                    matching_documents.append(doc_result)
        
        # Convert datetime objects to strings
        for doc in matching_documents:
            if 'upload_date' in doc:
                doc['upload_date'] = doc['upload_date'].isoformat()
        
        return jsonify({'documents': matching_documents}), 200
        
    except Exception as e:
        print(f"Error in search_documents: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/get-user-stats/<user_id>', methods=['GET'])
def get_user_stats(user_id):
    try:
        user_doc = knowledge_base_collection.find_one({'userID': user_id})
        
        if not user_doc:
            return jsonify({
                'total_colleges': 0,
                'total_documents': 0,
                'total_storage_used': 0
            }), 200
        
        colleges = user_doc.get('colleges', [])
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