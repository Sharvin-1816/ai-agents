from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import time
import random
import string
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection string
MONGODB_URI = "mongodb+srv://sharvinjoshi360_db_user:ImjRmsN7jaHECftz@techfluxai.tazmd4j.mongodb.net/?retryWrites=true&w=majority&appName=TechfluxAI"

# Initialize MongoDB client
try:
    client = MongoClient(MONGODB_URI)
    db = client['TechfluxAI']
    users_collection = db['Users']
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"MongoDB connection error: {e}")

def generate_user_id():
    """Generate a unique user ID"""
    timestamp = str(int(time.time()))
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=9))
    return f"user_{timestamp}_{random_string}"

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "Server is running", "timestamp": datetime.now().isoformat()})

@app.route('/api/submit-demo', methods=['POST'])
def submit_demo():
    """Handle demo submission"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Extract fields
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        employment_type = data.get('employmentType', '').strip()
        email = data.get('email', '').strip()
        city = data.get('city', '').strip()
        organization_name = data.get('organizationName', '').strip()
        
        # Validation
        required_fields = [name, phone, employment_type, email, city]
        if not all(required_fields):
            return jsonify({"error": "Please fill in all required fields"}), 400
        
        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({"error": "Please enter a valid email address"}), 400
        
        # Create user document
        user_data = {
            "userId": generate_user_id(),
            "name": name,
            "phone": phone,
            "employmentType": employment_type,
            "email": email,
            "city": city,
            "organizationName": organization_name,
            "createdAt": datetime.utcnow(),
            "status": "pending"
        }
        
        # Insert into MongoDB
        result = users_collection.insert_one(user_data)
        
        if result.inserted_id:
            return jsonify({
                "success": True,
                "userId": user_data["userId"],
                "insertedId": str(result.inserted_id),
                "message": "Demo request submitted successfully!"
            }), 201
        else:
            return jsonify({"error": "Failed to save data"}), 500
            
    except Exception as e:
        print(f"Error in submit_demo: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users (optional endpoint for testing)"""
    try:
        users = list(users_collection.find({}, {"_id": 0}))  # Exclude MongoDB _id field
        return jsonify({"users": users, "count": len(users)})
    except Exception as e:
        print(f"Error in get_users: {e}")
        return jsonify({"error": "Failed to fetch users"}), 500

@app.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by userId"""
    try:
        user = users_collection.find_one({"userId": user_id}, {"_id": 0})
        if user:
            return jsonify({"user": user})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        print(f"Error in get_user: {e}")
        return jsonify({"error": "Failed to fetch user"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)