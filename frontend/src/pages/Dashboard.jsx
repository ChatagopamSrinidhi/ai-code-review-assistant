import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || "User"} 👋
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6">

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            AI Code Review
          </h2>

          <p className="text-gray-400 mb-4">
            Analyze your code using Gemini AI
          </p>

          <Link
            to="/review"
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Start Review
          </Link>
        </div>

      </div>

    </div>
  );
}