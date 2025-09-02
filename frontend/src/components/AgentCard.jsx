import React from "react"

function AgentCard({ 
  name = "Sam", 
  title = "Candidate Screener",
  description = "Matches JD requirements with each CV and conducts tailored screening interviews",
  status = "Ready for deployment",
  category = "Screening",
  avatar = "/api/placeholder/120/120", // placeholder for avatar
  isOnline = true 
}) {
  return (
    <div className="bg-black rounded-2xl p-6 shadow-sm border border-purple-400 max-w-sm">
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
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-2 border-black rounded-full"></div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-white text-center mb-2">
        {name}
      </h3>

      {/* Title */}
      <p className="text-lg font-medium text-gray-300 text-center mb-3">
        {title}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
        {description}
      </p>

      {/* Status and Category */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">Status</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-700">
            {status}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">Category</span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-700">
            {category}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        Select & customize
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default AgentCard