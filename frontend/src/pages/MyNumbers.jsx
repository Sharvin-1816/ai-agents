"use client";

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MetricCard from "../components/metric-card";
import {
  Gauge,
  PlusSquare,
  Settings,
  Phone,
  History,
  Workflow,
  Megaphone,
  Building2,
  Wallet,
  Plus,
  PlayCircle,
  BookOpenText,
  Timer,
  DollarSign,
  Star,
  CheckCircle2,
} from "lucide-react";

function Chip({ children, icon }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
      role="status"
      aria-live="polite"
    >
      {icon ? (
        <span aria-hidden className="grid place-items-center">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

function NavItem({ icon, label, active, to }) {
  const base =
    "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-zinc-900 text-zinc-400";
  const activeCls = "bg-violet-500/10 border border-zinc-800 text-zinc-100";

  return (
    <Link
      to={to}
      className={`${base} ${active ? activeCls : "border border-transparent"}`}
      aria-label={label}
    >
      <span aria-hidden className="grid place-items-center">
        {icon}
      </span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

export default function MyNumbers() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Don't render page until auth is verified
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-violet-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-black text-zinc-100 flex">
      {/* Sidebar */}
      <aside
        className="sticky top-0 h-svh w-16 md:w-60 border-r border-zinc-800 bg-zinc-950 p-2 md:p-3 flex flex-col gap-2"
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center gap-2 px-2 py-2 font-semibold rounded-md justify-center md:justify-start hover:bg-zinc-800 transition-colors cursor-pointer">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/public/logo-trans.png"
              alt="TechFlux.ai logo"
              className="w-[18px] h-[18px]"
            />
            <span className="hidden md:inline">TechFlux.ai</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 mt-1">
          <NavItem
            icon={<Gauge size={18} />}
            label="Dashboard"
            to="/dashboard"
          />
          <NavItem
            icon={<PlusSquare size={18} />}
            label="Create agents"
            to="/createagent"
          />
          {/* <NavItem icon={<Settings size={18} />} label="Configure Agent" to="/configagent"/> */}
          <NavItem
            icon={<BookOpenText size={18} />}
            label="Knowledge Base"
            to="/knowledgebase"
          />
          <NavItem
            icon={<Phone size={18} />}
            label="My numbers"
            to="/mynumbers"
            active
          />
          <NavItem
            icon={<Building2 size={18} />}
            label="Batches"
            to="/batches"
          />
          <NavItem
            icon={<History size={18} />}
            label="Call History"
            to="/callhistory"
          />
          {/* <NavItem icon={<Workflow size={18} />} label="Workflows" to="/workflows" /> */}
          <NavItem
            icon={<Megaphone size={18} />}
            label="Campaigns"
            to="/campaigns"
          />
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-3 p-3 border-b border-zinc-800"
          aria-label="Top bar"
        >
          <div className="flex-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm px-3 py-2">
            Try TechFlux Pilots: Ready Agent + Analytics + Free Phone Number
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-violet-400 font-semibold text-sm">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 font-semibold px-3 py-2 text-sm"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          )}
          <Link
            to="/book-demo"
            className="inline-flex items-center rounded-lg bg-violet-600 hover:bg-violet-500 text-black border border-violet-600 font-semibold px-3 py-2 text-sm"
            aria-label="Book a call"
          >
            Book a call
          </Link>
        </header>

        {/* Phone Numbers Content */}
        <div className="flex-1 p-3 md:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                My phone numbers
              </h1>
              <p className="text-sm md:text-base text-zinc-400">
                Buy and view your phone numbers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-sm text-zinc-400">
                Available balance: <span className="text-white">$5.00</span>
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="hidden sm:inline">Add more funds</span>
                  <span className="sm:hidden">Add funds</span>
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white">
                  <span className="hidden sm:inline">See demo</span>
                  <span className="sm:hidden">Demo</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white">
                  Docs
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                  <span className="hidden sm:inline">Buy phone number</span>
                  <span className="sm:hidden">Buy number</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Container - Desktop */}
          <div className="hidden lg:block bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900">
              <div className="text-sm font-medium text-zinc-300">
                Phone number
              </div>
              <div className="text-sm font-medium text-zinc-300">
                Agent answering this phone number
              </div>
              <div className="text-sm font-medium text-zinc-300">Telephony</div>
              <div className="text-sm font-medium text-zinc-300">Bought on</div>
              <div className="text-sm font-medium text-zinc-300">Renews on</div>
              <div className="text-sm font-medium text-zinc-300">
                Monthly rent
              </div>
              <div className="text-sm font-medium text-zinc-300">
                Unlink agent from phone
              </div>
              <div className="text-sm font-medium text-zinc-300">
                Delete phone
              </div>
            </div>

            {/* Empty State */}
            <div className="px-6 py-12 text-center">
              <p className="text-zinc-400">No data available.</p>
            </div>
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
              {/* Mobile Header */}
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <h3 className="text-sm font-medium text-zinc-300">
                  Phone Numbers
                </h3>
              </div>

              {/* Empty State for Mobile */}
              <div className="px-4 py-8 text-center">
                <p className="text-zinc-400 text-sm">No phone numbers found.</p>
                <p className="text-zinc-500 text-xs mt-2">
                  Buy your first phone number to get started.
                </p>
              </div>
            </div>

            {/* Mobile Cards would go here when data is available */}
            {/* Example structure for future data:
            <div className="space-y-3">
              {phoneNumbers.map(phone => (
                <div key={phone.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-medium">{phone.number}</p>
                      <p className="text-zinc-400 text-sm">{phone.agent}</p>
                    </div>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">{phone.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-zinc-500">Bought on</p>
                      <p className="text-zinc-300">{phone.boughtOn}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Monthly rent</p>
                      <p className="text-zinc-300">{phone.monthlyRent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
