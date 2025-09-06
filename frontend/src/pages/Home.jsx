import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const handleNavigation = () => {
    // Placeholder for navigation logic
    console.log('Navigate to book-demo');
  };

  // Track mouse for parallax with momentum
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const animationRef = useRef();
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced smooth mouse tracking with momentum (no bounce)
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    // Momentum parameters
    const responsiveness = 0.08; // How quickly it follows mouse (0.05-0.15)
    const momentum = 0.92; // How much momentum is preserved (0.85-0.95)
    
    const animate = () => {
      // Calculate target with momentum
      const targetX = mouse.x;
      const targetY = mouse.y;
      
      // Update velocity with momentum (smoother deceleration)
      setVelocity(prev => ({
        x: lerp(prev.x, (targetX - smoothMouse.x) * responsiveness, 1 - momentum),
        y: lerp(prev.y, (targetY - smoothMouse.y) * responsiveness, 1 - momentum)
      }));
      
      // Update position based on velocity
      setSmoothMouse(prev => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y
      }));
    };

    const frame = () => {
      animate();
      animationRef.current = requestAnimationFrame(frame);
    };
    
    animationRef.current = requestAnimationFrame(frame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouse, smoothMouse, velocity]);

  // Background words
  const words = [
    "Hello",
    "नमस्ते",    // Hindi
    "வணக்கம்",   // Tamil
    "ഹലோ",       // Malayalam
    "ಹಲೋ",       // Kannada
    "హలో",       // Telugu
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
    "નમસ્તે",    // Gujarati
    "ନମସ୍କାର",   // Odia
    "নমস্কার",   // Bengali
    "नमस्कार",   // Marathi
    "নমস্কাৰ",   // Assamese // Jain greeting (often used in Prakrit/Marwari regions)
  ];
  
  const denseWords = [...words, ...words]; // repeated for density

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{
      backgroundColor: '#000000',
      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(147, 51, 234, 0.05) 40%, transparent 60%)`
    }}>
      
      {/* Concentric Circles Overlay - Fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Circle 1 - Innermost */}
          <div className="absolute w-96 h-96 border border-purple-400/15 rounded-full" style={{
            animation: 'pulse 4s ease-in-out infinite',
            transform: 'translate(-50%, -50%)'
          }} />
          
          {/* Circle 2 */}
          <div className="absolute w-[600px] h-[600px] border border-purple-400/10 rounded-full" style={{
            animation: 'pulse 6s ease-in-out infinite',
            transform: 'translate(-50%, -50%)'
          }} />
          
          {/* Circle 3 */}
          <div className="absolute w-[900px] h-[900px] border border-purple-400/8 rounded-full" style={{
            animation: 'pulse 8s ease-in-out infinite',
            transform: 'translate(-50%, -50%)'
          }} />
          
          {/* Circle 4 */}
          <div className="absolute w-[1200px] h-[1200px] border border-purple-400/6 rounded-full" style={{
            animation: 'pulse 10s ease-in-out infinite',
            transform: 'translate(-50%, -50%)'
          }} />
          
          {/* Circle 5 - Outermost */}
          <div className="absolute w-[1500px] h-[1500px] border border-purple-400/4 rounded-full" style={{
            animation: 'pulse 12s ease-in-out infinite',
            transform: 'translate(-50%, -50%)'
          }} />
        </div>
      </div>

      {/* ================= FIRST DIV WITH CLOUD ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 w-screen h-screen overflow-hidden">
        
        {/* Background floating words with enhanced parallax */}
        <div className="absolute inset-0 flex items-center justify-center">
          {denseWords.map((word, i) => {
            // Spread words around the center in a circular pattern
            const angle = (i / denseWords.length) * Math.PI * 2;
            const radius = 200 + (i % 3) * 100;
            const centerX = 45;
            const centerY = 45;
            
            const x = centerX + (Math.cos(angle) * radius) / window.innerWidth * 100;
            const y = centerY + (Math.sin(angle) * radius) / window.innerHeight * 100;
            
            const left = Math.max(5, Math.min(90, x));
            const top = Math.max(10, Math.min(85, y));
            
            // Variable parallax strength based on word index for depth
            const parallaxMultiplier = 0.04 + (i % 3) * 0.03; // Creates layers (0.04, 0.07, 0.10)
            
            // Calculate parallax offset with enhanced movement
            const offsetX = (smoothMouse.x - window.innerWidth / 2) * -parallaxMultiplier;
            const offsetY = (smoothMouse.y - window.innerHeight / 2) * -parallaxMultiplier;

            return (
              <span
                key={i}
                className="absolute text-white/15 text-sm md:text-lg font-medium select-none cursor-pointer
                        hover:text-purple-400 hover:scale-150 
                        transition-all duration-300 ease-out"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.5), 0 0 45px rgba(168, 85, 247, 0.3)';
                  e.target.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.5)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                  e.target.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1)`;
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Foreground content */}
        <div className="flex items-center space-x-4">
          <img
            src="/logo-trans.png"
            alt="TechfluxAI Logo"
            className="h-[10vh] w-[10vh] md:h-20 md:w-20 object-contain rounded-full"
          />
          <div className="relative">
            {/* Base glass container */}
            <div className="absolute inset-0 rounded-2xl bg-white/3 backdrop-blur-[2px]" />
            
            {/* Refractive mosaic pattern overlay */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 opacity-70"
                style={{
                  background: `
                    radial-gradient(circle at 20% 30%, rgba(168,85,247,0.15) 0%, transparent 40%),
                    radial-gradient(circle at 80% 20%, rgba(147,51,234,0.12) 0%, transparent 35%),
                    radial-gradient(circle at 60% 70%, rgba(126,34,206,0.18) 0%, transparent 45%),
                    radial-gradient(circle at 30% 80%, rgba(168,85,247,0.10) 0%, transparent 30%),
                    radial-gradient(circle at 90% 60%, rgba(139,69,19,0.08) 0%, transparent 25%)
                  `,
                  filter: 'blur(1px)',
                }}
              />
              
              {/* Prismatic refraction pattern */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  background: `
                    conic-gradient(from 45deg at 25% 25%, transparent 0deg, rgba(168,85,247,0.1) 45deg, transparent 90deg),
                    conic-gradient(from 135deg at 75% 35%, transparent 0deg, rgba(147,51,234,0.08) 60deg, transparent 120deg),
                    conic-gradient(from 225deg at 40% 75%, transparent 0deg, rgba(126,34,206,0.12) 40deg, transparent 80deg),
                    conic-gradient(from 315deg at 80% 80%, transparent 0deg, rgba(168,85,247,0.06) 30deg, transparent 60deg)
                  `,
                  filter: 'blur(0.5px)',
                }}
              />
              
              {/* Subtle distortion pattern to simulate light bending */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent 0px,
                      rgba(255,255,255,0.02) 1px,
                      transparent 2px,
                      transparent 12px
                    ),
                    repeating-linear-gradient(
                      -45deg,
                      transparent 0px,
                      rgba(168,85,247,0.03) 1px,
                      transparent 2px,
                      transparent 8px
                    )
                  `,
                  mixBlendMode: 'overlay',
                }}
              />
            </div>
            
            {/* High refractive index spots (denser glass areas) */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div 
                className="absolute w-8 h-8 rounded-full opacity-60"
                style={{
                  top: '25%',
                  left: '20%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
                  filter: 'blur(3px)',
                  backdropFilter: 'blur(1px) brightness(1.1)',
                }}
              />
              <div 
                className="absolute w-12 h-6 rounded-full opacity-50"
                style={{
                  top: '60%',
                  right: '15%',
                  background: 'radial-gradient(ellipse, rgba(147,51,234,0.15) 0%, transparent 70%)',
                  filter: 'blur(2px)',
                  backdropFilter: 'blur(0.5px) brightness(1.05)',
                }}
              />
              <div 
                className="absolute w-6 h-10 rounded-full opacity-40"
                style={{
                  top: '15%',
                  right: '25%',
                  background: 'radial-gradient(ellipse, rgba(126,34,206,0.18) 0%, transparent 70%)',
                  filter: 'blur(2.5px)',
                  backdropFilter: 'blur(0.8px) contrast(1.1)',
                }}
              />
            </div>
            
            <h1 className="relative px-6 py-2 text-4xl md:text-6xl font-extrabold text-white leading-tight z-10">
              Vocal Cognition.
            </h1>
          </div>
        </div>

        <p className="text-gray-400 max-w-xl mx-auto mt-6 mb-6 text-base md:text-lg">
          Creating sleek, futuristic AI platforms that scale. Stay ahead in your business strategy for the future.
        </p>

        <button
          onClick={handleNavigation}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Connect With AI
        </button>
      </div>
      {/* ========================================================= */}

      {/* Section 1 */}
      <section className="relative bg-transparent py-16 px-4 z-10">
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
              image: "./public/robo.png",
            },
            {
              title: "Automatic Reschedule",
              desc: "Calls rescheduled automatically if unavailable.",
              image: "./public/robo.png",
            },
            {
              title: "Global Coverage",
              desc: "Reach users worldwide, in their language and timezone.",
              image: "/robo.png",
            },
            {
              title: "Affordable Pricing",
              desc: "Calls as low as $0.1 per minute.",
              image: "/robo.png",
            },
            {
              title: "High Engagement Rate",
              desc: "Achieve up to 30% response rate with Techflux AI.",
              image: "/robo.png",
            },
            {
              title: "High Engagement Rate",
              desc: "Achieve up to 30% response rate with Techflux AI.",
              image: "/robo.png",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:shadow-purple-700/30 shadow-md transition relative overflow-hidden h-[30vh]"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(26, 26, 26, 0.3)', // Fallback if image fails
                filter: 'grayscale(100%)', // Convert image to grayscale
                opacity: 0.9, // Slight transparency for background
              }}
            >
              <div className="relative z-10">
                <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="relative bg-transparent py-20 px-4 text-center overflow-hidden z-10">
        {/* Wave background */}
        {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 fill-purple-900/40">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"></path>
          </svg>
        </div> */}

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get <span className="text-purple-400">Meaningful Insights</span> That Translate Into Business Outcomes.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Supports <span className="text-green-400 font-semibold">Multiple Languages</span><br />
            Available <span className="text-green-400 font-semibold">24x7</span>
          </p>

          <div className="bg-black/30 backdrop-blur-sm w-fit mx-auto py-3 px-6 rounded-full flex items-center gap-4 shadow-lg border border-purple-800/50">
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;