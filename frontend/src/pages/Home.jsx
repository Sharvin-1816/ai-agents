import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  useEffect(() => {
  document.body.style.overflowX = 'hidden';
}, []);

  const navigate = useNavigate();
  
  return (
    <div className="relative bg-[#0e0e0e] min-h-screen overflow-x-hidden">
      {/* Purple Glow Container (wrapped to control overflow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
  <div className="absolute top-1/2 left-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] bg-purple-700 opacity-30 blur-[120px] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
</div>


      {/* Content */}
      <div className="relative z-10 flex items-center justify-center flex-col text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          AI-Driven Success <br />
          <span className="text-purple-500">Redefining the Future.</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-6 text-base md:text-lg">
          Creating sleek, futuristic AI platforms that scale. Stay ahead in your business strategy for the future.
        </p>
        <button
          onClick={() => navigate('/book-demo')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Connect With AI
        </button>
      </div>

      {/* Section 1 */}

      <section className="bg-black py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6">
          Designed For <span className="text-purple-500">Seamless Customer</span> Interactions
        </h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
          Unlock the full potential of automated, human-like surveys that boost engagement and response rates.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Human-like AI Phone Calls",
              desc: "Feel like you're talking to a real person, not a robot.",
              icon: "🤖",
            },
            {
              title: "Automatic Reschedule",
              desc: "Calls rescheduled automatically if unavailable.",
              icon: "🕒",
            },
            {
              title: "Global Coverage",
              desc: "Reach users worldwide, in their language and timezone.",
              icon: "🌍",
            },
            {
              title: "Affordable Pricing",
              desc: "Calls as low as $0.1 per minute.",
              icon: "💸",
            },
            {
              title: "High Engagement Rate",
              desc: "Achieve up to 30% response rate with Techflux AI.",
              icon: "📈",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 hover:shadow-purple-700/30 shadow-md transition"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Section - 2 */}

      <section className="relative bg-gradient-to-b from-black via-[#0e0e0e] to-black py-20 px-4 text-center overflow-hidden">
        {/* Wave background */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 fill-purple-900 opacity-30">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get <span className="text-purple-400">Meaningful Insights</span> That Translate Into Business Outcomes.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Supports <span className="text-green-400 font-semibold">Multiple Languages</span><br />
            Available <span className="text-green-400 font-semibold">24x7</span>
          </p>

          {/* <div className="bg-[#1f1f1f] w-fit mx-auto py-3 px-6 rounded-full flex items-center gap-4 shadow-lg border border-purple-800">
            <span className="text-purple-400 font-bold">TechfluxAi</span>
            <span className="text-sm text-gray-300">Incoming Call</span>
            <button className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white">📴</button>
            <button className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white">📞</button>
          </div> */}
          <div className="bg-[#1f1f1f] w-fit mx-auto py-3 px-6 rounded-full flex items-center gap-4 shadow-lg border border-purple-800">
  <span className="text-purple-400 font-bold text-lg">TechfluxAi</span>
  <span className="text-sm text-gray-300">Incoming Call</span>

  {/* Hang Up Button */}
  <button
    className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition"
    aria-label="Hang up"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  {/* Answer Button */}
  <button
    className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition"
    aria-label="Answer"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l7 7-7 7M8 5l7 7-7 7" />
    </svg>
  </button>
</div>


        </div>
      </section>

   
      
    </div>
  );
}

export default Home;
