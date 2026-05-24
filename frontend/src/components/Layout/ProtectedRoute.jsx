 import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = true; // temporary (we will connect real auth later)

  return isLoggedIn ? children : <Navigate to="/login" />;
}
