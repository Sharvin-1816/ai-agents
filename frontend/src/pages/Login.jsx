import React from 'react'
import { useState } from "react";
import { AuthContext } from '../context/authContext';
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://ai-agents-backend-7u93.onrender.com/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f011a] via-[#1f0030] to-[#0f011a] text-white px-4">
      <div className="bg-[#121212] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-600">
        <h2 className="text-3xl font-bold text-purple-500 text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-400">
          <Link to="/forgot-password" className="text-purple-400 hover:underline">Forgot Password?</Link>
        </div>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
