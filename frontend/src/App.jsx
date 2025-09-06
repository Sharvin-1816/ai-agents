import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import BookDemo from "./pages/BookDemo";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Dashboard";
import CreateAgent from "./pages/CreateAgent";
import ConfigAgent from "./pages/ConfigAgent";
import MyNumbers from "./pages/MyNumbers";
import Batches from "./pages/Batches";
import AgentConversations from "./pages/CallHistory";
import Workflows from "./pages/Workflows";
import CampaignsPage from "./pages/Campaigns";
import KnowledgeBase from "./pages/KnowledgeBase";

// Layout for main site pages
function MainLayout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
}

// Layout for dashboard (no navbar, no wrapper styles)
function DashboardLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/forgot-password" element={<MainLayout><ForgotPassword /></MainLayout>} />
        <Route path="/reset-password/:token" element={<MainLayout><ResetPassword /></MainLayout>} />
        <Route path="/book-demo" element={<MainLayout><BookDemo /></MainLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/createagent" element={<DashboardLayout><CreateAgent /></DashboardLayout>} />
        <Route path="/configagent" element={<DashboardLayout><ConfigAgent /></DashboardLayout>} />
        <Route path="/mynumbers" element={<DashboardLayout><MyNumbers /></DashboardLayout>} />
        <Route path="/batches" element={<DashboardLayout><Batches /></DashboardLayout>} />
        <Route path="/callhistory" element={<DashboardLayout><AgentConversations /></DashboardLayout>} />
        <Route path="/workflows" element={<DashboardLayout><Workflows /></DashboardLayout>} />
        <Route path="/campaigns" element={<DashboardLayout><CampaignsPage /></DashboardLayout>} />
        <Route path="/knowledgebase" element={<DashboardLayout><KnowledgeBase /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;