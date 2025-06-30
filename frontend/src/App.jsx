import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import BookDemo from "./pages/BookDemo";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element = {<FAQ/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element = {<About/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/book-demo" element = {<BookDemo/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
