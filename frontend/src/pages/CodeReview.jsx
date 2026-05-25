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

  const handleReview = async () => {
    if (!code.trim()) {
      return toast.error("Enter code first");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/review/analyze",
        {
          code,
          language,
        }
      );

      setResult(res.data);

      toast.success("AI Review completed");
    } catch (err) {
      console.log(err);

      toast.error("Failed to analyze code");
    }

    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result?.improved_code || "");
    toast.success("Code copied");
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
            <div className="space-y-5">

              {/* SUMMARY */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Summary
                </h2>

                <p>{result.summary}</p>
              </div>

              {/* ISSUES */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Issues Found
                </h2>

                <ul className="list-disc pl-5">
                  {result.issues?.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>

              {/* SUGGESTIONS */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Suggestions
                </h2>

                <ul className="list-disc pl-5">
                  {result.suggestions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
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
                    padding: "20px",
                    fontSize: "14px",
                  }}
                >
                  {result.improved_code}
                </SyntaxHighlighter>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}