from flask import Blueprint, request, jsonify

review_bp = Blueprint('review', __name__)

@review_bp.route('/analyze', methods=['POST'])
def analyze_code():
    data = request.get_json()

    code = data.get("code", "")
    language = data.get("language", "python")

    issues = []

    # ---------- REAL CHECKS ----------

    if "(" in code and ")" not in code:
        issues.append("Missing closing parenthesis ')'")

    if "{" in code and "}" not in code:
        issues.append("Missing closing brace '}'")

    if language == "python":
        if "print(" in code and (code.count('"') % 2 != 0 and code.count("'") % 2 != 0):
            issues.append("Possible string syntax issue in print statement")

    if "/ 0" in code or "/0" in code:
        issues.append("Possible division by zero")

    if len(code.strip()) == 0:
        return jsonify({"error": "Empty code"}), 400

    if not issues:
        issues.append("No major issues found")

    improved_code = f"""# Improved Code\n{code}\n\n# Suggestion: add comments + error handling"""

    return jsonify({
        "summary": f"{language} code analyzed",
        "issues": "\n".join(issues),
        "improved_code": improved_code
    })