import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CodeReview() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code) return toast.error("Please enter code");

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/review/analyze",
        { code, language },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(res.data);
      toast.success("Review completed!");
    } catch (err) {
      toast.error("Failed to analyze code");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        AI Code Review 🔥
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Input Section */}
        <div className="bg-gray-800 p-4 rounded-xl">

          <select
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>javascript</option>
            <option>python</option>
            <option>java</option>
            <option>c++</option>
          </select>

          <textarea
            className="w-full h-80 p-3 bg-gray-900 rounded text-sm outline-none"
            placeholder="Paste your code here..."
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={handleReview}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold"
          >
            {loading ? "Analyzing..." : "Review Code"}
          </button>

        </div>

        {/* Output Section */}
        <div className="bg-gray-800 p-4 rounded-xl">

          <h2 className="text-xl font-semibold mb-3">
            AI Review Result
          </h2>

          {!result ? (
            <p className="text-gray-400">
              Your code analysis will appear here...
            </p>
          ) : (
            <div className="space-y-3">

              <div className="bg-gray-900 p-3 rounded">
                <h3 className="text-green-400">Summary</h3>
                <p>{result.summary}</p>
              </div>

              <div className="bg-gray-900 p-3 rounded">
                <h3 className="text-yellow-400">Issues</h3>
                <pre className="text-sm">{result.issues}</pre>
              </div>

              <div className="bg-gray-900 p-3 rounded">
                <h3 className="text-blue-400">Improved Code</h3>
                <pre className="text-sm overflow-x-auto">
                  {result.improved_code}
                </pre>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}