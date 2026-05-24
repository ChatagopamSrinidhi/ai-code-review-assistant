from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.database import db
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt = JWTManager(app)
db.init_app(app)

# Import routes (create these next)
from routes.auth import auth_bp
from routes.review import review_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(review_bp, url_prefix='/api/review')

# Create tables
with app.app_context():
    os.makedirs('database', exist_ok=True)
    db.create_all()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)