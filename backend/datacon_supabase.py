from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from datetime import datetime
import time
import random
import string
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = None

def initialize_supabase():
    """Initialize Supabase client"""
    global supabase
    try:
        # You'll need to get your actual anon key from Supabase dashboard
        # This is a placeholder - replace with your actual anon key
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase successfully!")
        return True
    except Exception as e:
        print(f"Supabase connection error: {e}")
        return False

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
        if not supabase:
            return jsonify({"error": "Database not initialized"}), 500
            
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
        
        # Generate user ID
        user_id = generate_user_id()
        
        # Prepare user data
        user_data = {
            "UserID": user_id,
            "Name": name,
            "Phone": phone,
            "EmploymentType": employment_type,
            "Email": email,
            "City": city,
            "OrganizationName": organization_name,
            "Status": "pending",
            "CreatedAt": datetime.utcnow().isoformat()
        }
        
        # Insert into Supabase
        result = supabase.table("Users").insert(user_data).execute()
        
        if result.data:
            return jsonify({
                "success": True,
                "userId": user_id,
                "insertedId": result.data[0].get("id") if result.data[0].get("id") else user_id,
                "message": "Demo request submitted successfully!"
            }), 201
        else:
            return jsonify({"error": "Failed to save data"}), 500
            
    except Exception as e:
        print(f"Error in submit_demo: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users (optional endpoint for testing)"""
    try:
        if not supabase:
            return jsonify({"error": "Database not initialized"}), 500
            
        result = supabase.table("Users").select("*").order("CreatedAt", desc=True).execute()
        
        if result.data:
            return jsonify({"users": result.data, "count": len(result.data)})
        else:
            return jsonify({"users": [], "count": 0})
            
    except Exception as e:
        print(f"Error in get_users: {e}")
        return jsonify({"error": "Failed to fetch users"}), 500

@app.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by userId"""
    try:
        if not supabase:
            return jsonify({"error": "Database not initialized"}), 500
            
        result = supabase.table("Users").select("*").eq("UserID", user_id).execute()
        
        if result.data:
            return jsonify({"user": result.data[0]})
        else:
            return jsonify({"error": "User not found"}), 404
            
    except Exception as e:
        print(f"Error in get_user: {e}")
        return jsonify({"error": "Failed to fetch user"}), 500

if __name__ == '__main__':
    # Initialize Supabase on startup
    if initialize_supabase():
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to initialize Supabase. Exiting...")
        exit(1)