import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BookDemo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/book", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("✅ Demo request sent successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send demo request.");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center px-4">
      {!user ? (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-purple-400">
            Please log in to book a demo
          </h2>
          <br/>
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-semibold"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f1f1f] p-8 rounded-xl border border-purple-600 w-full max-w-md space-y-4 shadow-xl"
        >
          <h2 className="text-2xl text-purple-400 font-bold text-center mb-4">
            Book a Demo
          </h2>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-600 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-600 focus:outline-none"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-600 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-md font-semibold"
          >
            Submit
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-purple-400">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default BookDemo;
