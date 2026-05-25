from flask import Blueprint, request, jsonify
from groq import Groq
import os
import json

review_bp = Blueprint('review', __name__)

@review_bp.route('/analyze', methods=['POST'])
def analyze_code():
    try:
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            return jsonify({"error": "GROQ_API_KEY missing"}), 500

        client = Groq(api_key=api_key)

        data = request.get_json()
        code = data.get("code", "")
        language = data.get("language", "python")

        if not code.strip():
            return jsonify({"error": "Code cannot be empty"}), 400

        prompt = f"""
You are an expert AI code reviewer.
Analyze this {language} code:

{code}

Return ONLY JSON:
{{
  "summary": "...",
  "issues": [],
  "suggestions": [],
  "improved_code": "..."
}}
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        text = response.choices[0].message.content.strip()
        text = text.replace("```json", "").replace("```", "")

        result = json.loads(text)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500