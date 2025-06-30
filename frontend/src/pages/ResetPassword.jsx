import React from 'react'
import { useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f011a] via-[#1f0030] to-[#0f011a] text-white px-4">
      <div className="bg-[#121212] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-600">
        <h2 className="text-3xl font-bold text-purple-500 text-center mb-6">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            name="newPassword"
            required
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="text-center mt-4 text-sm text-gray-400">
          <Link to='/login' className="text-purple-400 hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
