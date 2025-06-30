import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 sm:px-6 py-16 overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-14 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-500 mb-4">
          About TechfluxAi
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          TechfluxAi is a futuristic AI-powered platform designed to help businesses streamline communication
          with automated calling agents. With a seamless user experience and deep analytics, we help you track,
          monitor, and convert leads — the smart way.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {/* Card 1 */}
        <div className="bg-[#1a1a1a] border border-purple-600 p-6 rounded-2xl shadow-xl hover:shadow-purple-700 transition duration-300">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">⚙️ Smart Automation</h3>
          <p className="text-gray-400 text-sm">
            Let AI agents handle calls, qualification, and reporting — 24/7, without needing human intervention.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1a1a1a] border border-purple-600 p-6 roundeQd-2xl shadow-xl hover:shadow-purple-700 transition duration-300">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">📊 Real-Time Admin Insights</h3>
          <p className="text-gray-400 text-sm">
            Track every call made, view lead quality, monitor duration, and performance — all from one dashboard.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1a1a1a] border border-purple-600 p-6 rounded-2xl shadow-xl hover:shadow-purple-700 transition duration-300">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">🔐 Secure & Scalable</h3>
          <p className="text-gray-400 text-sm">
            We prioritize security, compliance, and uptime. TechfluxAi grows with you and your business goals.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 px-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} TechfluxAi. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
