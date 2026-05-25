import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BackButton from "../components/Layout/BackButton";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeReview() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ PRODUCTION SAFE API URL
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://ai-code-review-assistant-o7vm.onrender.com";

  const handleReview = async () => {
    if (!code.trim()) {
      return toast.error("Please enter some code first");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/review/analyze`,
        {
          code,
          language,
        }
      );

      setResult(res.data);
      toast.success("AI Review completed");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.error || "Failed to analyze code"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!result?.improved_code) {
      return toast.error("No code to copy");
    }

    navigator.clipboard.writeText(result.improved_code);
    toast.success("Improved code copied");
  };

  return (
    <div className="min-h-screen p-6 text-white relative">

      <BackButton />

      <h1 className="text-4xl font-bold text-center mb-8">
        AI Code Review ⚡
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT PANEL */}
        <div className="glass p-5">

          <select
            className="w-full p-3 mb-4 bg-black/30 rounded-lg outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <textarea
            className="w-full h-80 p-4 bg-black/40 rounded-lg outline-none"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={handleReview}
            className="btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Review Code"}
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="glass p-5 overflow-auto">

          {!result ? (
            <p className="text-gray-300">
              AI analysis will appear here...
            </p>
          ) : (
            <div className="space-y-6">

              {/* SUMMARY */}
              <div>
                <h2 className="text-xl font-bold mb-2">Summary</h2>
                <p className="text-gray-200">
                  {result.summary}
                </p>
              </div>

              {/* ISSUES */}
              <div>
                <h2 className="text-xl font-bold mb-2">Issues Found</h2>
                {result.issues?.length ? (
                  <ul className="list-disc pl-5 text-gray-200">
                    {result.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-400">No issues found 🎉</p>
                )}
              </div>

              {/* SUGGESTIONS */}
              <div>
                <h2 className="text-xl font-bold mb-2">Suggestions</h2>
                {result.suggestions?.length ? (
                  <ul className="list-disc pl-5 text-gray-200">
                    {result.suggestions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No suggestions</p>
                )}
              </div>

              {/* IMPROVED CODE */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">
                    Improved Code
                  </h2>

                  <button
                    onClick={copyCode}
                    className="bg-purple-600 px-4 py-1 rounded-lg hover:bg-purple-700"
                  >
                    Copy
                  </button>
                </div>

                <SyntaxHighlighter
                  language={language}
                  style={oneDark}
                  customStyle={{
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                  }}
                >
                  {result.improved_code || ""}
                </SyntaxHighlighter>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}