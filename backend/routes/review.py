from flask import Blueprint, request, jsonify

review_bp = Blueprint('review', __name__)

@review_bp.route('/analyze', methods=['POST'])
def analyze_code():
    try:
        data = request.get_json()

        print("DATA:", data)

        code = data.get("code", "")
        language = data.get("language", "python")

        fake_review = f"""
Code looks good overall.

Language: {language}

Suggestions:
1. Add comments
2. Improve variable names
3. Add error handling
4. Follow clean coding standards

Submitted Code:
{code}
"""

        return jsonify({
            "summary": "Analysis completed successfully",
            "issues": fake_review,
            "improved_code": code
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500