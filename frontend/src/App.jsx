import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";

import ProtectedRoute from "./components/Layout/ProtectedRoute";

function App() {
  return (
    <AuthProvider>

      <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white">

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />

        <Routes>

          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <CodeReview />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </AuthProvider>
  );
}

export default App;