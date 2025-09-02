"use client"

import React, { useState } from "react"
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
  Search,
  RefreshCw,
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

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-svh bg-black text-zinc-100 flex">
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
          <NavItem icon={<History size={18} />} label="Call History" to="/callhistory" />
          <NavItem icon={<Workflow size={18} />} label="Workflows" to="/workflows"/>
          <NavItem icon={<Megaphone size={18} />} label="Campaigns" to="/campaigns" active/>
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

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Campaigns
              </h1>
              <p className="text-zinc-400">
                Create and manage your campaigns
              </p>
            </div>
            
            {/* Top Right Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span>Available balance:</span>
                <span className="font-semibold text-white">$5.00</span>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors">
                <Plus size={16} />
                Add more funds
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                See demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                Docs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Create New Campaign Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  Create New Campaign
                </h3>
                <p className="text-zinc-400">
                  Click to create a new campaign and start reaching out to your candidates.
                </p>
              </div>
              <div className="ml-4 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                <Plus size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Empty State or Campaign List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="text-zinc-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No campaigns yet
              </h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                You haven't created any campaigns yet. Create your first campaign to start reaching out to candidates.
              </p>
              <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                <Plus size={16} />
                Create Your First Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}