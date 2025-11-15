"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gauge,
  PlusSquare,
  Settings,
  Phone,
  History,
  Workflow,
  Megaphone,
  Building2,
  Plus,
  BookOpenText,
  Upload,
  FileText,
  X,
  School,
  Download,
  Trash2,
  Search,
  HardDrive,
} from "lucide-react";

// Mock user ID - replace with actual authentication
const CURRENT_USER_ID = "user123";

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

function AddCollegeModal({ isOpen, onClose, onAdd }) {
  const [collegeName, setCollegeName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!collegeName.trim()) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("collegeName", collegeName);
      formData.append("userID", CURRENT_USER_ID);

      selectedFiles.forEach((file) => {
        formData.append(`documents`, file);
      });

      const response = await fetch("http://localhost:5001/api/add-college", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onAdd(result.college);
        setCollegeName("");
        setSelectedFiles([]);
        onClose();
      } else {
        console.error("Failed to add college");
      }
    } catch (error) {
      console.error("Error adding college:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h3 className="text-lg font-semibold text-white">Add College</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              College Name
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500"
              placeholder="Enter college name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Documents (Optional)
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-3 py-6 border-2 border-dashed border-zinc-600 rounded-lg text-zinc-400 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Upload className="mx-auto mb-2" size={24} />
                <p>Click to upload documents</p>
                <p className="text-xs">PDF, DOC, TXT, and more</p>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.md,.json,.csv,.xlsx"
              />

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-zinc-800 p-2 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-zinc-400" />
                        <span className="text-sm text-zinc-300">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-zinc-400 hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-zinc-400 border border-zinc-600 rounded-lg hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || !collegeName.trim()}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg"
            >
              {isUploading ? "Adding..." : "Add College"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBase() {
  const [colleges, setColleges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_colleges: 0,
    total_documents: 0,
    total_storage_mb: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Load colleges on component mount
  useEffect(() => {
    loadColleges();
    loadStats();
  }, []);

  const loadColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/api/get-colleges/${CURRENT_USER_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setColleges(data.colleges || []);
      }
    } catch (error) {
      console.error("Error loading colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/get-user-stats/${CURRENT_USER_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleAddCollege = (newCollege) => {
    setColleges((prev) => [...prev, newCollege]);
    loadStats(); // Refresh stats
  };

  const handleDeleteCollege = async (collegeName) => {
    if (
      !confirm(
        `Are you sure you want to delete "${collegeName}" and all its documents?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/delete-college", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: CURRENT_USER_ID,
          collegeName: collegeName,
        }),
      });

      if (response.ok) {
        setColleges((prev) =>
          prev.filter((college) => college.name !== collegeName)
        );
        loadStats(); // Refresh stats
        if (expandedCollege !== null) {
          setExpandedCollege(null);
        }
      }
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  };

  const handleDownloadDocument = async (fileId, filename) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/download-document/${fileId}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const toggleCollege = (collegeIndex) => {
    setExpandedCollege(expandedCollege === collegeIndex ? null : collegeIndex);
  };

  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (college.documents &&
        college.documents.some((doc) =>
          doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

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
            active
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
          <button
            className="inline-flex items-center rounded-lg bg-violet-600 hover:bg-violet-500 text-black border border-violet-600 font-semibold px-3 py-2"
            aria-label="Book a call"
          >
            Book a call
          </button>
        </header>

        {/* Knowledge Base Content */}
        <div className="flex-1 p-3 md:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                Knowledge Base
              </h1>
              <p className="text-sm md:text-base text-zinc-400">
                Manage your college documents and knowledge resources
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Add College</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <School className="text-purple-500" size={24} />
                <div>
                  <p className="text-zinc-400 text-sm">Total Colleges</p>
                  <p className="text-white text-xl font-semibold">
                    {stats.total_colleges}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-500" size={24} />
                <div>
                  <p className="text-zinc-400 text-sm">Total Documents</p>
                  <p className="text-white text-xl font-semibold">
                    {stats.total_documents}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <HardDrive className="text-green-500" size={24} />
                <div>
                  <p className="text-zinc-400 text-sm">Storage Used</p>
                  <p className="text-white text-xl font-semibold">
                    {stats.total_storage_mb} MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {colleges.length > 0 && (
            <div className="mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search colleges or documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="px-6 py-12 text-center">
                <p className="text-zinc-400">Loading your knowledge base...</p>
              </div>
            </div>
          ) : /* Content Area */
          filteredColleges.length === 0 && searchTerm ? (
            // No search results
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="px-6 py-12 text-center">
                <Search className="mx-auto mb-4 text-zinc-600" size={48} />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">
                  No results found
                </h3>
                <p className="text-zinc-400 mb-6">
                  Try different keywords or check your spelling.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-purple-500 hover:text-purple-400"
                >
                  Clear search
                </button>
              </div>
            </div>
          ) : colleges.length === 0 ? (
            // Empty State
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="px-6 py-12 text-center">
                <School className="mx-auto mb-4 text-zinc-600" size={48} />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">
                  No colleges added yet
                </h3>
                <p className="text-zinc-400 mb-6">
                  Start building your knowledge base by adding your first
                  college.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Your First College
                </button>
              </div>
            </div>
          ) : (
            // Colleges List
            <div className="space-y-4">
              {filteredColleges.map((college, index) => (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                    onClick={() => toggleCollege(index)}
                  >
                    <div className="flex items-center gap-3">
                      <School className="text-purple-500" size={20} />
                      <div>
                        <h3 className="text-white font-medium">
                          {college.name}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                          {college.documents?.length || 0} documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCollege(college.name);
                        }}
                        className="text-zinc-400 hover:text-red-400 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      <svg
                        className={`transform transition-transform ${
                          expandedCollege === index ? "rotate-180" : ""
                        }`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {expandedCollege === index && (
                    <div className="border-t border-zinc-800 p-4">
                      {college.documents && college.documents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {college.documents.map((doc, docIndex) => (
                            <div
                              key={docIndex}
                              className="flex items-center justify-between bg-zinc-900 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <FileText
                                  className="text-zinc-400 flex-shrink-0"
                                  size={16}
                                />
                                <span
                                  className="text-sm text-zinc-300 truncate"
                                  title={doc.filename}
                                >
                                  {doc.filename}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleDownloadDocument(
                                    doc.file_id,
                                    doc.filename
                                  )
                                }
                                className="text-zinc-400 hover:text-white p-1 flex-shrink-0"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-400 text-sm italic">
                          No documents uploaded for this college.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCollegeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCollege}
      />
    </div>
  );
}
