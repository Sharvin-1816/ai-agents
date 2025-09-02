import React from 'react';

const About = () => {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nova+Square&display=swap" rel="stylesheet" />
      
      <div 
        className="min-h-screen text-white px-4 sm:px-6 py-16 overflow-x-hidden mt-16"
        style={{
          backgroundColor: '#000000',
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(147, 51, 234, 0.05) 40%, transparent 60%)`
        }}
      >
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-14 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-400 mb-4">
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
          <div className="bg-black/20 backdrop-blur-sm border border-purple-600/30 p-8 rounded-2xl shadow-xl hover:shadow-purple-700/30 transition duration-300">
            <div className="text-5xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Nova Square, cursive' }}>01</div>
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Build</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Utilize the voice AI API and our intuitive agent builder to create custom voice AI agents effortlessly.
            </p>
            <img 
              src="./public/about_demo_ph.gif" 
              alt="Building AI Agent" 
              className="w-full h-32 object-cover rounded-lg bg-white/90"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-600/30 p-8 rounded-2xl shadow-xl hover:shadow-purple-700/30 transition duration-300">
            <div className="text-5xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Nova Square, cursive' }}>02</div>
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Deploy</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Launch your AI agents instantly with our cloud infrastructure. Scale automatically based on demand.
            </p>
            <img 
              src="./public/about_demo_ph.gif" 
              alt="Deploying AI Agent" 
              className="w-full h-32 object-cover rounded-lg bg-white/90"
            />
          </div>

          {/* Card 3 */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-600/30 p-8 rounded-2xl shadow-xl hover:shadow-purple-700/30 transition duration-300">
            <div className="text-5xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Nova Square, cursive' }}>03</div>
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Monitor</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Track performance, analyze conversations, and optimize your AI agents with real-time analytics.
            </p>
            <img 
              src="./public/about_demo_ph.gif" 
              alt="Monitoring Analytics" 
              className="w-full h-32 object-cover rounded-lg bg-white/90"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 px-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} TechfluxAi. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default About;