import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-5 left-5 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-md border border-white/10"
    >
      ← Back
    </button>
  );
}