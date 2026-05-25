import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen text-white">

      {/* HERO */}
      <div className="text-center px-6 py-24">
        <h1 className="text-5xl font-bold mb-4">
          AI Code Review Assistant
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Get instant AI-powered feedback on your code. Improve quality, reduce bugs, and write cleaner software.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>

          <Link to="/login" className="px-5 py-3 rounded-xl border border-white/20">
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 py-10">
        {[
          { title: "AI Analysis", desc: "Smart code review using AI" },
          { title: "Instant Feedback", desc: "Get results in seconds" },
          { title: "Clean Code Tips", desc: "Improve coding standards" },
        ].map((f, i) => (
          <div key={i} className="glass p-6">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}