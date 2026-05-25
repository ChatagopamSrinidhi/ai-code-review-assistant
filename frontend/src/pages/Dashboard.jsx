import { Link } from "react-router-dom";
import BackButton from "../components/Layout/BackButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#0b0f19] text-white">

      {/* BACK BUTTON */}
      <BackButton />

      {/* SIDEBAR */}
      <div className="w-64 p-6 bg-white/5 border-r border-white/10 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-8">
          AI Code Review
        </h2>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            to="/review"
            className="block text-gray-300 hover:text-white transition"
          >
            Code Review
          </Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-8">
          Welcome Back 👋
        </h1>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400">Total Reviews</h3>
            <p className="text-3xl font-bold mt-2">24</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400">Issues Found</h3>
            <p className="text-3xl font-bold mt-2">87</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400">Code Score</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">
              A+
            </p>
          </div>

        </div>

        {/* QUICK ACTION */}
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">
            Quick Action
          </h2>

          <p className="text-gray-400 mb-4">
            Start analyzing your code instantly with AI-powered review.
          </p>

          <Link
            to="/review"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Start Code Review →
          </Link>
        </div>

      </div>
    </div>
  );
}