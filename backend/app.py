from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from routes.review import review_bp
from routes.auth import auth_bp

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "https://ai-code-review-assistant-xi.vercel.app"}})

# REGISTER ROUTES
app.register_blueprint(review_bp, url_prefix="/api/review")
app.register_blueprint(auth_bp, url_prefix="/api/auth")

@app.route("/")
def home():
    return {
        "message": "AI Code Review Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)