"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, TokenBlockList
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import  create_access_token, jwt_required, get_jwt_identity, get_jwt

app = Flask(__name__)
bcrypt = Bcrypt(app)


api = Blueprint('api', __name__)
CORS(api)

# //////////////////////////////////////////////////////////////// Ruta de Login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token, user_id=user.id), 200

# //////////////////////////////////////////////////////////////// Ruta de Signup
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    email = data.get('email')
    password = data.get('password')

    if not password or not email:
        return jsonify({"error": "All fields are required"}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "id": new_user.id,
        "email": new_user.email,
    }
    return jsonify(response_body), 201

#  //////////////////////////////////////////////////////////////// Ruta de Logout
@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti = get_jwt()["jti"]
    token_blocked = TokenBlockList(jti=jti)
    db.session.add(token_blocked)
    db.session.commit()
    return jsonify({"msg": "Logout successful"})

