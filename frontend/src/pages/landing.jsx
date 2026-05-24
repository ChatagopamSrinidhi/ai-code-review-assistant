import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold text-white mb-4">
        AI Code Review Assistant
      </h1>

      <p className="text-gray-300 text-lg max-w-2xl mb-8">
        Instantly analyze your code using AI. Get suggestions for bugs, improvements,
        performance issues, and best practices powered by Gemini AI.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold"
        >
          Register
        </Link>
      </div>

    </div>
  );
}