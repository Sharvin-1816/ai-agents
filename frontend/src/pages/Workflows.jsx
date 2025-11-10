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


// Reusable Workflow Card Component
function WorkflowCard({ title, description, steps, difficulty, onClick, className = "" }) {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'basic':
        return 'text-green-400'
      case 'advanced':
        return 'text-orange-400'
      case 'expert':
        return 'text-red-400'
      default:
        return 'text-zinc-400'
    }
  }

  return (
    <div 
      className={`bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-zinc-500">{steps} steps</span>
        <span className="text-zinc-600">•</span>
        <span className={getDifficultyColor(difficulty)}>{difficulty}</span>
      </div>
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

export default function Workflows() {
  const workflows = [
    {
      id: 1,
      title: "Basic reachout",
      description: "Simple WhatsApp message followed by a call",
      steps: 2,
      difficulty: "basic"
    },
    {
      id: 2,
      title: "WhatsApp and calls with multiple retries",
      description: "WhatsApp followed by call with up to 3 retry attempts if calls fail",
      steps: 8,
      difficulty: "advanced"
    }
  ]

  const handleWorkflowClick = (workflow) => {
    console.log("Selected workflow:", workflow)
    // Handle workflow selection
  }

  const handleAddNewWorkflow = () => {
    console.log("Adding new workflow")
    // Handle adding new workflow
  }

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
          <NavItem icon={<BookOpenText size={18} />} label="Knowledge Base" to="/knowledgebase" />
          <NavItem icon={<Phone size={18} />} label="My numbers" to="/mynumbers" />
          <NavItem icon={<Building2 size={18} />} label="Batches" to="/batches" />
          <NavItem icon={<History size={18} />} label="Call History" to="/callhistory" />
          <NavItem icon={<Workflow size={18} />} label="Workflows" to="/workflows" active/>
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

        {/* Workflows Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Workflows List */}
          <div className="w-full lg:w-1/2 xl:w-2/5 p-3 md:p-6 border-r border-zinc-800">
            {/* Header with Refresh Button */}
            <div className="flex items-center gap-3 mb-6">
              <button 
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="Refresh workflows"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
                  <polyline points="23 4 23 10 17 10"/>
                  <polyline points="1 20 1 14 7 14"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Workflows</h1>
                <p className="text-sm text-zinc-400 mt-1">Choose from our pre-built workflows or create your own</p>
              </div>
            </div>

            {/* Workflows Grid */}
            <div className="space-y-4 mb-6">
              {workflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  title={workflow.title}
                  description={workflow.description}
                  steps={workflow.steps}
                  difficulty={workflow.difficulty}
                  onClick={() => handleWorkflowClick(workflow)}
                />
              ))}
            </div>

            {/* Add New Workflow Button */}
            <button
              onClick={handleAddNewWorkflow}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-3 rounded-lg transition-colors text-sm"
            >
              Add New Workflow (beta)
            </button>
          </div>

          {/* Right Panel - Workflow Editor */}
          <div className="hidden lg:flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-zinc-600">
                <rect x="3" y="3" width="18" height="4"/>
                <rect x="3" y="11" width="18" height="4"/>
                <line x1="5" y1="19" x2="19" y2="19"/>
                <polyline points="9,15 12,18 15,15"/>
              </svg>
              <p className="text-zinc-400 text-lg mb-2">Select a workflow to edit</p>
              <p className="text-zinc-500 text-sm">Choose a workflow from the left panel to start editing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the WorkflowCard component for reuse in other parts of the app
export { WorkflowCard }