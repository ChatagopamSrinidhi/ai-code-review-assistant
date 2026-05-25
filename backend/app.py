from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# LOAD ENV FILE
load_dotenv()

from routes.review import review_bp

app = Flask(__name__)

# CORS
CORS(app)

# REGISTER ROUTES
app.register_blueprint(review_bp, url_prefix="/api/review")

@app.route("/")
def home():
    return {
        "message": "AI Code Review Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)