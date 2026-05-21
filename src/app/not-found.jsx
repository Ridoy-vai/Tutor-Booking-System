'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const quickLinks = [
  { name: "📖 All Courses", href: "/courses" },
  { name: "👩‍🏫 Find Tutors", href: "/tutors" },
  { name: "📝 Admission", href: "/admission" },
  { name: "💬 Support", href: "/support" },
  { name: "❓ FAQ", href: "/faq" }
];

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full bg-[#0D1B2A] font-['Hind_Siliguri'] text-white overflow-hidden flex items-center justify-center px-6">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-80 md:w-[500px] h-80 md:h-[500px] bg-[#1a4a7a] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-64 md:w-[400px] h-64 md:h-[400px] bg-[#7a5000] rounded-full blur-[100px] opacity-20 pointer-events-none" />

      {/* Animated Star Field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <main className="relative z-10 max-w-2xl w-full text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        
        {/* 404 Big Text */}
        <div className="relative inline-block">
          <h1 className="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter select-none opacity-20 transition-all duration-500 hover:opacity-40"
              style={{ WebkitTextStroke: "2px #E8A020", color: "transparent" }}>
            404
          </h1>
          {/* Swaying Telescope Emoji */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl animate-[sway_4s_ease-in-out_infinite]">
            🔭
          </span>
        </div>

        {/* Content Section */}
        <div className="mt-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-serif">
            Page Not Found
          </h2>
          <p className="text-[#8fa8c2] text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable. <span className="text-[#FBD87F] font-semibold">Please check the URL</span> or use the buttons below.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link 
              href="/"
              className="bg-[#E8A020] text-[#0D1B2A] px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              🏠 Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:bg-white/10 active:scale-95 backdrop-blur-md"
            >
              ← Go Back
            </button>
          </div>

          {/* Quick Navigation Pills */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[3px] text-white/30 font-bold">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="bg-[#E8A020]/10 border border-[#E8A020]/20 text-[#FBD87F] px-4 py-2 rounded-full text-xs font-medium transition-all hover:bg-[#E8A020]/20 hover:border-[#E8A020]/40"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles for Keyframes */}
      <style jsx global>{`
        @keyframes sway {
          0%, 100% { transform: translate(-50%, -50%) rotate(-10deg); }
          50% { transform: translate(-50%, -50%) rotate(10deg); }
        }
        @font-face {
          font-family: 'Hind Siliguri';
          src: url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap');
        }
      `}</style>
    </div>
  );
}