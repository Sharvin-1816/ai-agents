import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f011a] via-[#1f0030] to-[#0f011a] text-white px-4">
      <div className="bg-[#121212] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-600">
        <h2 className="text-3xl font-bold text-purple-500 text-center mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="text-green-500 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="text-center mt-4 text-sm text-gray-400">
          <Link to="/login" className="text-purple-400 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
