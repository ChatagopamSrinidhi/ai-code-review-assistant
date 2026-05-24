from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

users = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if email in users:
        return jsonify({"error": "User already exists"}), 400

    users[email] = {
        "username": username,
        "email": email,
        "password": password
    }

    return jsonify({
        "message": "User registered successfully",
        "token": "fake-jwt-token",
        "user": {"username": username, "email": email}
    }), 200


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users.get(email)

    if not user or user["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "token": "fake-jwt-token",
        "user": user
    }), 200


@auth_bp.route('/verify', methods=['GET'])
def verify():
    return jsonify({"user": {"name": "test user"}}), 200