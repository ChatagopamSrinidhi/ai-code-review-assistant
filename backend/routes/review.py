from flask import Blueprint, request, jsonify
from groq import Groq
import os
import json

review_bp = Blueprint('review', __name__)

# ---------------- GROQ CLIENT ----------------
client = Groq(
    api_key=os.getenv("GEMINI_API_KEY")  # using your gsk_ key
)

@review_bp.route('/analyze', methods=['POST'])
def analyze_code():
    try:
        data = request.get_json()

        code = data.get("code", "")
        language = data.get("language", "python")

        # ---------------- EMPTY CHECK ----------------
        if not code.strip():
            return jsonify({
                "error": "Code cannot be empty"
            }), 400

        # ---------------- PROMPT ----------------
        prompt = f"""
You are an expert AI code reviewer.

Analyze the following {language} code carefully.

CODE:
{code}

Return ONLY valid JSON in this exact format:

{{
  "summary": "short summary",
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "improved_code": "fixed code here"
}}

Rules:
- Return ONLY JSON
- No markdown
- No explanation
- Detect syntax errors
- Detect logical issues
- Provide corrected code
"""

        # ---------------- AI RESPONSE ----------------
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        text = response.choices[0].message.content.strip()

        # ---------------- CLEAN JSON ----------------
        text = text.replace("```json", "").replace("```", "").strip()

        # ---------------- JSON PARSE ----------------
        try:
            result = json.loads(text)

            return jsonify({
                "summary": result.get("summary", "Analysis completed"),
                "issues": result.get("issues", []),
                "suggestions": result.get("suggestions", []),
                "improved_code": result.get("improved_code", code)
            }), 200

        except Exception:
            return jsonify({
                "summary": "Analysis completed",
                "issues": ["Could not parse AI response"],
                "suggestions": ["Try again with cleaner code"],
                "improved_code": code,
                "raw_output": text
            }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500