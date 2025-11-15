import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4"
      style={{
        backgroundColor: "#000000",
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(147, 51, 234, 0.05) 40%, transparent 60%)`,
      }}
    >
      {/* Concentric Circles Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Circle 1 - Innermost */}
          <div
            className="absolute w-96 h-96 border border-purple-400/15 rounded-full"
            style={{
              animation: "pulse 4s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Circle 2 */}
          <div
            className="absolute w-[600px] h-[600px] border border-purple-400/10 rounded-full"
            style={{
              animation: "pulse 6s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Circle 3 */}
          <div
            className="absolute w-[900px] h-[900px] border border-purple-400/8 rounded-full"
            style={{
              animation: "pulse 8s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Circle 4 */}
          <div
            className="absolute w-[1200px] h-[1200px] border border-purple-400/6 rounded-full"
            style={{
              animation: "pulse 10s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Circle 5 - Outermost */}
          <div
            className="absolute w-[1500px] h-[1500px] border border-purple-400/4 rounded-full"
            style={{
              animation: "pulse 12s ease-in-out infinite",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-600/30">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Welcome Back
        </h2>
        <div className="space-y-5">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm transition rounded-lg font-semibold"
          >
            Log In
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-400">
          <button
            onClick={handleForgotPassword}
            className="text-purple-400 hover:underline hover:text-purple-300 transition"
          >
            Forgot Password?
          </button>
        </div>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={handleSignup}
            className="text-purple-400 hover:underline hover:text-purple-300 transition"
          >
            Sign up
          </button>
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
