import React from "react"
import { Link } from "react-router-dom"
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
  } from "lucide-react"

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
  )
}

function NavItem({ icon, label, active, to }) {
    const base =
      "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-zinc-900 text-zinc-400"
    const activeCls =
      "bg-violet-500/10 border border-zinc-800 text-zinc-100"
  
    return (
      <Link
        to={to}
        className={`${base} ${active ? activeCls : "border border-transparent"}`}
        aria-label={label}
      >
        <span aria-hidden className="grid place-items-center">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </Link>
    )
  }

export default function AgentConversations() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex">
      {/* Sidebar */}
      <aside
        className="sticky top-0 h-svh w-16 md:w-60 border-r border-zinc-800 bg-zinc-950 p-2 md:p-3 flex flex-col gap-2"
        aria-label="Sidebar navigation"
      >
        <div 
        onClick={() => window.location.href = '/'}
        className="flex items-center gap-2 px-2 py-2 font-semibold rounded-md justify-center md:justify-start hover:bg-zinc-800 transition-colors cursor-pointer"
        >
        <img 
            src="/public/logo-trans.png" 
            alt="TechFlux.ai logo" 
            className="w-[18px] h-[18px]"
        />
        <span className="hidden md:inline">TechFlux.ai</span>
        </div>
        <nav className="flex flex-col gap-1 mt-1">
        <NavItem icon={<Gauge size={18} />} label="Dashboard" to="/dashboard"/>
        <NavItem icon={<PlusSquare size={18} />} label="Create agents" to="/createagent" />
          <NavItem icon={<Settings size={18} />} label="Configure Agent" to="/configagent"/>
          <NavItem icon={<Phone size={18} />} label="My numbers" to="/mynumbers" />
          <NavItem icon={<Building2 size={18} />} label="Batches" to="/batches" />
          <NavItem icon={<History size={18} />} label="Call History" to="/callhistory" active/>
          <NavItem icon={<Workflow size={18} />} label="Workflows" to="/workflows"/>
          <NavItem icon={<Megaphone size={18} />} label="Campaigns" to="/campaigns" />
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 p-3 border-b border-zinc-800" aria-label="Top bar">
          <div className="flex-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-sm px-3 py-2">
            Try TechFlux Pilots: Ready Agent + Analytics + Free Phone Number
          </div>
          <button
            className="inline-flex items-center rounded-lg bg-violet-600 hover:bg-violet-500 text-black border border-violet-600 font-semibold px-3 py-2"
            aria-label="Book a call"
          >
            Book a call
          </button>
        </header>

        {/* Toolbar chips */}
        <div className="flex items-center gap-3 px-4 pt-4 flex-wrap" aria-label="Toolbar actions">
          <Chip icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12V7H5a2 2 0 01 0-4h14v4"/>
              <path d="M3 5v14a2 2 0 002 2h16v-5"/>
              <path d="M18 12a2 2 0 000 4h4v-4z"/>
            </svg>
          }>Available balance: $5.00</Chip>
          <Chip icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
          }>Add more funds</Chip>
          <Chip icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16 10,8"/>
            </svg>
          }>See demo</Chip>
          <Chip icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
          }>Docs</Chip>
        </div>

        {/* Agent Conversations Content */}
        <div className="flex-1 p-3 md:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Agent conversations</h1>
              <p className="text-sm md:text-base text-zinc-400">Displays all historical conversations with agents</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white">
                  <span className="hidden sm:inline">See demo</span>
                  <span className="sm:hidden">Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white">
                  Docs
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="text-sm text-zinc-400">
              To run curated interview campaigns, contact us at 
              <a href="#" className="text-purple-400 hover:text-purple-300 underline ml-1">this link</a>.
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Select Agent Dropdown */}
              <div className="flex items-center gap-3">
                <label htmlFor="agent-select" className="text-sm text-zinc-400 whitespace-nowrap">Select agent</label>
                <div className="relative">
                  <select 
                    id="agent-select"
                    className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer hover:border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none min-w-[120px] sm:min-w-[150px]"
                  >
                    <option value="">Choose...</option>
                    <option value="agent1">Sam - Candidate Screener</option>
                    <option value="agent2">Alex - Sales Assistant</option>
                    <option value="agent3">Maya - Customer Support</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>

              {/* Select Batch Dropdown */}
              <div className="flex items-center gap-3">
                <label htmlFor="batch-select" className="text-sm text-zinc-400 whitespace-nowrap">Select batch</label>
                <div className="relative">
                  <select 
                    id="batch-select"
                    className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer hover:border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none min-w-[120px] sm:min-w-[150px]"
                  >
                    <option value="">Choose...</option>
                    <option value="batch1">Batch 1 - 2024-01</option>
                    <option value="batch2">Batch 2 - 2024-02</option>
                    <option value="batch3">Batch 3 - 2024-03</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <button className="self-start lg:self-center bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              Download records
            </button>
          </div>

          {/* Search and Columns Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search by Execution id"
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-4 py-2 pr-10 placeholder-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>

            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6m-6 4h6"/>
              </svg>
              Columns
            </button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="text-center">
              <p className="text-zinc-400 text-base">No records found</p>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-400">Rows per page</span>
                <select className="bg-zinc-900 border border-zinc-700 text-zinc-300 rounded px-2 py-1 text-sm">
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Page 1 of 0</span>
              <div className="flex items-center gap-1 ml-4">
                <button className="p-1 text-zinc-600 cursor-not-allowed" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                  </svg>
                </button>
                <button className="p-1 text-zinc-600 cursor-not-allowed" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button className="p-1 text-zinc-600 cursor-not-allowed" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
                <button className="p-1 text-zinc-600 cursor-not-allowed" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}