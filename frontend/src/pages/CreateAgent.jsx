"use client"

import React from "react"
import { Link } from "react-router-dom"
import MetricCard from "../components/metric-card"
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

// AgentCard Component
function AgentCard({ 
  name = "Sam", 
  title = "Candidate Screener",
  description = "Matches JD requirements with each CV and conducts tailored screening interviews",
  status = "Ready for deployment",
  category = "Screening",
  avatar = "/api/placeholder/120/120",
  isOnline = true 
}) {
  return (
    <div className="bg-black rounded-2xl p-6 shadow-sm border border-purple-500 max-w-sm">
      {/* Avatar with online indicator */}
      <div className="relative mb-4 flex justify-center">
        <div className="relative">
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-24 h-24 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff&size=96`
            }}
          />
          {isOnline && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-white-900 text-center mb-2">
        {name}
      </h3>

      {/* Title */}
      <p className="text-lg font-medium text-white-700 text-center mb-3">
        {title}
      </p>

      {/* Description */}
      <p className="text-sm text-white-600 text-center mb-6 leading-relaxed">
        {description}
      </p>

      {/* Status and Category */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white-700">Status</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {status}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white-700">Category</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {category}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        Select & customize
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

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

export default function CreateAgent() {
  return (
    <div className="min-h-svh bg-black text-zinc-100 flex">
      {/* Sidebar */}
      <aside
        className="sticky top-0 h-svh w-16 md:w-60 border-r border-zinc-800 bg-zinc-950 p-2 md:p-3 flex flex-col gap-2"
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center gap-2 px-2 py-2 font-semibold rounded-md justify-center md:justify-start">
          <Gauge size={18} className="text-violet-400" />
          <span className="hidden md:inline">TechFlux.ai</span>
        </div>
        <nav className="flex flex-col gap-1 mt-1">
          <NavItem icon={<Gauge size={18} />} label="Dashboard" to="/dashboard"/>
          <NavItem icon={<PlusSquare size={18} />} label="Create agents" to="/createagent" active/>
          <NavItem icon={<Settings size={18} />} label="Configure Agent" to="/configagent"/>
          <NavItem icon={<Phone size={18} />} label="My numbers" />
          <NavItem icon={<Building2 size={18} />} label="Batches" />
          <NavItem icon={<History size={18} />} label="Call History" />
          <NavItem icon={<Workflow size={18} />} label="Workflows" />
          <NavItem icon={<Megaphone size={18} />} label="Campaigns" />
          <NavItem icon={<Building2 size={18} />} label="Workplace" />
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
          <Chip icon={<Wallet size={16} />}>Available balance: $5.00</Chip>
          <Chip icon={<Plus size={16} />}>Add more funds</Chip>
          <Chip icon={<PlayCircle size={16} />}>See demo</Chip>
          <Chip icon={<BookOpenText size={16} />}>Docs</Chip>
        </div>

        {/* Agent Cards Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AgentCard 
              name="Sam" 
              title="Candidate Screener"
              description="Matches JD requirements with each CV and conducts tailored screening interviews"
              status="Ready for deployment"
              category="Screening"
              isOnline={true}
            />
            <AgentCard 
              name="Alex" 
              title="Sales Assistant"
              description="Handles customer inquiries and provides product recommendations to boost sales"
              status="In development"
              category="Sales"
              isOnline={false}
            />
            <AgentCard 
              name="Maya" 
              title="Customer Support"
              description="Provides 24/7 customer support and resolves common issues efficiently"
              status="Ready for deployment"
              category="Support"
              isOnline={true}
            />
            <AgentCard 
              name="Jake" 
              title="Data Analyst"
              description="Analyzes customer data and generates insights for business decisions"
              status="Ready for deployment"
              category="Analytics"
              isOnline={true}
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}