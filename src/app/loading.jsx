'use client';
import { useEffect, useState, useRef } from "react";

// Custom animations that aren't standard in Tailwind
const customAnimations = `
@keyframes flip {
  0%   { transform: rotateY(0deg); opacity: 1; z-index: 3; }
  45%  { transform: rotateY(-85deg); opacity: 0.5; }
  100% { transform: rotateY(-170deg); opacity: 0; z-index: 1; }
}
@keyframes dotBounce {
  0%, 100% { transform: scale(0.65); opacity: 0.4; }
  50%     { transform: scale(1.1); opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const tips = [
  "ShikkhaBD has 500+ experienced tutors ready to help you.",
  "Studying just 1 hour daily adds up to 365 hours of learning a year!",
  "We offer specialized courses for HSC, SSC, and University Admissions.",
  "Live classes, recorded videos, and personal guidance — all in one place.",
  "Our tutors are graduates from top institutions like Dhaka University.",
];

function BookAnimation() {
  const pages = [
    { bg: "bg-[#FEF5DF]", delay: "0s" },
    { bg: "bg-[#fffbf2]", delay: "0.35s" },
    { bg: "bg-[#fff8e8]", delay: "0.7s" },
  ];

  return (
    <div className="relative w-[100px] h-[80px] mx-auto mb-10 [perspective:400px]">
      {/* Back cover */}
      <div className="absolute right-0 top-0 w-[46px] h-[72px] bg-[#d4cdc4] border-[1.5px] border-[#bab3aa] rounded-l-[5px] rounded-r-[2px] border-r-0" />
      
      {/* Spine */}
      <div className="absolute left-1/2 top-1 -translate-x-1/2 w-1.5 h-16 bg-[#0D1B2A] rounded-sm z-10" />
      
      {/* Animated Pages */}
      {pages.map((p, i) => (
        <div
          key={i}
          className={`absolute left-1/2 top-1 w-[46px] h-16 ${p.bg} border-[1.5px] border-[#E8A020] border-l-0 rounded-r-[5px] origin-left [transform-style:preserve-3d] [backface-visibility:hidden]`}
          style={{ animation: `flip 1.8s ease-in-out ${p.delay} infinite` }}
        />
      ))}
    </div>
  );
}

function StepIndicator({ steps, activeIdx }) {
  return (
    <div className="flex justify-center gap-2.5">
      {steps.map((step, i) => {
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        return (
          <div
            key={step}
            className={`flex items-center gap-1.5 text-[0.78rem] px-3 py-1.5 rounded-full border transition-all duration-300 ${
              isDone 
                ? "text-[#1A6B45] border-[#c5e8d9] bg-[#edf8f3]" 
                : isActive 
                ? "text-[#7a5000] border-[#E8A020] bg-[#FEF5DF] font-semibold" 
                : "text-[#6B7A8D] border-[#E4DDD0] bg-white"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-current ${isActive ? "animate-pulse" : ""}`} />
            {step}
          </div>
        );
      })}
    </div>
  );
}

export default function LoadingPage() {
  const [tipIdx, setTipIdx] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Inject custom keyframes
    const style = document.createElement("style");
    style.textContent = customAnimations;
    document.head.appendChild(style);

    // Progress Logic
    intervalRef.current = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 4 + 1));
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setStepIdx(2);
        }
        return next;
      });
    }, 90);

    // Tips Rotation Logic
    const tipTimer = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % tips.length);
        setTipVisible(true);
      }, 400);
    }, 3200);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(tipTimer);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFAF4] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 opacity-[0.35] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle, #d4c9b8 1px, transparent 1px)", backgroundSize: "28px 28px" }} 
      />

      <div className="relative z-10 text-center max-w-[440px] w-full p-8 animate-[fadeUp_0.6s_ease_both]">
        
        {/* Logo */}
        <div className="font-serif text-[2.2rem] font-black text-[#0D1B2A] tracking-tighter mb-12">
          Shikkha<span className="text-[#E8A020]">BD</span>
        </div>

        {/* Animation */}
        <BookAnimation />

        {/* Status Text */}
        <div className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2 transition-all">
          {stepIdx === 2 ? "Almost ready!" : "Loading..."}
        </div>
        <p className="text-[#6B7A8D] text-[0.9rem] mb-10 leading-relaxed">
          Your educational journey is about to begin. <br /> Please wait a moment.
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-[7px] bg-[#E4DDD0] rounded-full mb-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0D1B2A] to-[#E8A020] rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        
        <div className="text-right text-[0.78rem] text-[#6B7A8D] font-bold mb-8">
          {pct}%
        </div>

        {/* Animated Loading Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { color: "bg-[#E8A020]", delay: "0s" },
            { color: "bg-[#0D1B2A]", delay: "0.2s" },
            { color: "bg-[#E8A020]", delay: "0.4s" },
          ].map((d, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${d.color}`}
              style={{ animation: `dotBounce 1.4s ease-in-out ${d.delay} infinite` }}
            />
          ))}
        </div>

        {/* Tip Card */}
        <div className="bg-white border-[1.5px] border-[#E4DDD0] rounded-2xl p-5 text-left mb-8 min-h-[100px] shadow-sm">
          <div className="text-[0.72rem] font-bold text-[#E8A020] uppercase tracking-[1.5px] mb-2">
            ✨ Did you know?
          </div>
          <div className={`text-[0.88rem] text-[#6B7A8D] leading-relaxed transition-opacity duration-400 ${tipVisible ? 'opacity-100' : 'opacity-0'}`}>
            {tips[tipIdx]}
          </div>
        </div>

        {/* Step Timeline */}
        <StepIndicator
          steps={["Connecting", "Loading", "Ready"]}
          activeIdx={stepIdx}
        />
      </div>
    </div>
  );
}