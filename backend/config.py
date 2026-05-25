import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # ---------------- SECURITY KEYS ----------------
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")

    # ---------------- GEMINI AI KEY ----------------
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", None)

    if not GEMINI_API_KEY:
        print("⚠️ WARNING: GEMINI_API_KEY is not set in environment variables")

    # ---------------- DATABASE ----------------
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ---------------- OPTIONAL (FOR FUTURE EXPANSION) ----------------
    JSON_SORT_KEYS = False