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

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

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
            active
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
          {/* <NavItem icon={<Workflow size={18} />} label="Workflows" to="/workflows"/> */}
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

        {/* Toolbar chips */}
        <div
          className="flex items-center gap-3 px-4 pt-4 flex-wrap"
          aria-label="Toolbar actions"
        >
          <Chip icon={<Wallet size={16} />}>Available balance: $5.00</Chip>
          <Chip icon={<Plus size={16} />}>Add more funds</Chip>
          <Chip icon={<PlayCircle size={16} />}>See demo</Chip>
          <Chip icon={<BookOpenText size={16} />}>Docs</Chip>
        </div>

        {/* Main */}
        <main className="p-4 flex flex-col gap-4">
          <section aria-labelledby="page-title">
            <h1
              id="page-title"
              className="mt-2 text-3xl font-extrabold text-foreground text-balance"
            >
              Agents Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of your agent performance and call history
            </p>
          </section>

          {/* Performance Metrics */}
          <section aria-labelledby="metrics-title" className="space-y-3">
            <h2
              id="metrics-title"
              className="flex items-center gap-2 mt-2 font-bold"
            >
              <span aria-hidden className="grid place-items-center">
                <Gauge size={18} />
              </span>
              Performance Metrics
            </h2>

            <div className="grid grid-cols-12 gap-4" role="list">
              <div
                className="col-span-12 md:col-span-6 xl:col-span-3"
                role="listitem"
              >
                <MetricCard
                  title="Total Executions"
                  value="0"
                  subtitle="All call attempts"
                  icon={<Phone size={16} />}
                />
              </div>
              <div
                className="col-span-12 md:col-span-6 xl:col-span-3"
                role="listitem"
              >
                <MetricCard
                  title="Total Qualified"
                  value="0"
                  subtitle="Qualified prospects"
                  icon={<TargetIcon />}
                />
              </div>
              <div
                className="col-span-12 md:col-span-6 xl:col-span-3"
                role="listitem"
              >
                <MetricCard
                  title="Total Duration"
                  value="0.0s"
                  subtitle="Total call time"
                  icon={<Timer size={16} />}
                />
              </div>
              <div
                className="col-span-12 md:col-span-6 xl:col-span-3"
                role="listitem"
              >
                <MetricCard
                  title="Total Cost"
                  value="0.00"
                  subtitle="Total campaign spend"
                  icon={<DollarSign size={16} />}
                />
              </div>
              <div
                className="col-span-12 md:col-span-6 xl:col-span-6"
                role="listitem"
              >
                <MetricCard
                  title="Avg Rating"
                  value="0.0"
                  subtitle="Average call rating"
                  icon={<Star size={16} />}
                />
              </div>
              <div
                className="col-span-12 md:col-span-6 xl:col-span-6"
                role="listitem"
              >
                <MetricCard
                  title="Completed Calls"
                  value="0"
                  subtitle="Successfully connected calls"
                  icon={<CheckCircle2 size={16} />}
                />
              </div>
            </div>
          </section>

          {/* Call History */}
          <section aria-labelledby="history-title" className="space-y-3">
            <h2
              id="history-title"
              className="flex items-center gap-2 mt-2 font-bold"
            >
              <span aria-hidden className="grid place-items-center">
                <History size={18} />
              </span>
              Call History
            </h2>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 min-h-56 p-4 flex items-center justify-center">
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                  className="inline-flex items-center rounded-lg bg-violet-600 hover:bg-violet-500 text-black border border-violet-600 font-semibold px-3 py-2"
                  aria-label="View Call Logs"
                >
                  View Call Logs
                </button>
                <button
                  className="inline-flex items-center rounded-lg bg-violet-500/10 text-zinc-100 border border-zinc-800 font-semibold px-3 py-2"
                  aria-label="Documentation"
                >
                  Documentation
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-center text-sm text-zinc-400">
              <div>
                <strong className="block text-foreground">
                  Download records
                </strong>
                <div>Export call data</div>
              </div>
              <div>
                <strong className="block text-foreground">
                  Conversation transcripts
                </strong>
                <div>Full chat history</div>
              </div>
              <div>
                <strong className="block text-foreground">
                  Performance analytics
                </strong>
                <div>Detailed insights</div>
              </div>
            </div>
          </section>
        </main>
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
