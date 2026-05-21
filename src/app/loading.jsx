'use client';
import { useEffect, useState, useRef } from "react";

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
`;

const tips = [
  "10 Minute School has 25,000+ free educational videos.",
  "Learn anything from Class 1-12, BCS, and Skill Development.",
  "Over 3 million students learn every day with our platform.",
  "Unlock your potential with interactive live classes and quizzes.",
  "Check out our specialized courses for University Admission preparation.",
];

function BookAnimation() {
  const pages = [
    { bg: "bg-red-50", delay: "0s" },
    { bg: "bg-white", delay: "0.35s" },
    { bg: "bg-gray-50", delay: "0.7s" },
  ];

  return (
    <div className="relative w-24 h-20 mx-auto mb-8 [perspective:400px]">
      <div className="absolute right-0 top-0 w-11 h-16 bg-red-100 border border-red-200 rounded-l-md rounded-r-sm shadow-sm" />
      <div className="absolute left-1/2 top-0.5 -translate-x-1/2 w-1.5 h-14 bg-red-600 rounded-sm z-10" />
      {pages.map((p, i) => (
        <div
          key={i}
          className={`absolute left-1/2 top-0.5 w-11 h-14 ${p.bg} border border-red-200 border-l-0 rounded-r-md origin-left [transform-style:preserve-3d] [backface-visibility:hidden]`}
          style={{ animation: `flip 1.8s ease-in-out ${p.delay} infinite` }}
        />
      ))}
    </div>
  );
}

function StepIndicator({ steps, activeIdx }) {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 w-full">
      {steps.map((step, i) => {
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        return (
          <div
            key={step}
            className={`flex items-center gap-1.5 text-[10px] sm:text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${isDone
                ? "text-green-600 border-green-200 bg-green-50"
                : isActive
                  ? "text-red-600 border-red-200 bg-red-50 font-bold"
                  : "text-gray-400 border-gray-100 bg-white"
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-green-500' : isActive ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
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
    const style = document.createElement("style");
    style.textContent = customAnimations;
    document.head.appendChild(style);

    intervalRef.current = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 5 + 2));
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setStepIdx(2);
        }
        return next;
      });
    }, 100);

    const tipTimer = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % tips.length);
        setTipVisible(true);
      }, 400);
    }, 3500);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(tipTimer);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-screen max-h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 text-center max-w-md w-full px-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-gray-900">
            10 MINUTE <span className="text-red-600">SCHOOL</span>
          </h1>
          <div className="h-1 w-12 bg-red-600 rounded-full mt-1" />
        </div>

        <BookAnimation />

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            {stepIdx === 2 ? "Get Ready!" : "Setting up your class..."}
          </h2>
          <p className="text-gray-500 text-sm">
            Please wait while we load your learning experience.
          </p>
        </div>

        <div className="w-full mb-10">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            <span>Loading Data</span>
            <span className="text-red-600">{pct}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left mb-10 min-h-[110px] flex flex-col justify-center shadow-sm">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 rounded-full" /> Tip of the moment
          </span>
          <p className={`text-sm text-gray-600 font-medium leading-relaxed transition-opacity duration-500 ${tipVisible ? 'opacity-100' : 'opacity-0'}`}>
            "{tips[tipIdx]}"
          </p>
        </div>

        <StepIndicator
          steps={["Connecting", "Loading", "Done"]}
          activeIdx={stepIdx}
        />

        <div className="flex gap-1.5 mt-8 opacity-40">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-red-600"
              style={{ animation: `dotBounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl opacity-50" />
    </div>
  );
}