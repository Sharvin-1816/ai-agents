import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      }
    };
    fetchUser();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed w-full bg-transparent backdrop-blur-md z-50 text-white px-6 lg:px-16 py-4 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-purple-500 text-xl md:text-2xl font-extrabold"
        >
          <img
            src="/logo-trans.png"
            alt="TechfluxAI Logo"
            className="h-6 w-6 md:h-8 md:w-8 object-contain rounded-full"
          />
          TechfluxAi
        </Link>

        {/* Nav Links - Centered */}
        <div className="hidden md:flex items-center gap-8 text-sm md:text-base">
          {["Home", "About", "FAQ", "Dashboard"].map((text, idx) => (
            <Link
              key={idx}
              to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
              className="relative text-white font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {text}
            </Link>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/book-demo"
            className="px-5 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition"
          >
            Book a Demo
          </Link>
          {user ? (
            <>
              <span className="text-purple-300 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/10">
          {["Home", "About", "FAQ"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block text-gray-200 py-1 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/book-demo"
            className="block px-5 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Book a Demo
          </Link>
          {user ? (
            <>
              <span className="block text-purple-300 font-medium">
                {user.name}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
