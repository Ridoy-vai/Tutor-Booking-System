'use client';

import React, { useEffect, useState } from "react";

export default function Error500() {
  const [now, setNow] = useState("");
  const [path, setPath] = useState("/");

  useEffect(() => {
    setNow(new Date().toLocaleTimeString());
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="w-full max-h-screen h-screen bg-[#FDFAF4] font-sans overflow-hidden relative flex items-center justify-center px-6">

      {/* Background Orbs */}
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[#FDECEA] rounded-full opacity-70 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#FEF5DF] rounded-full opacity-70 pointer-events-none" />

      {/* Content Wrapper */}
      <main className="relative z-10 w-full max-w-7xl flex items-center justify-center">

        {/* Card */}
        <div className="bg-white rounded-[32px] border border-[#E4DDD0] p-8 md:px-16 md:py-10 w-full max-w-7xl text-center shadow-[0_20px_60px_rgba(13,27,42,0.06)]">

          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-[#FDECEA] rounded-2xl flex items-center justify-center -rotate-12">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.73 18L13.73 4a2 2 0 0 0-3.48 0L2.25 18A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Status Code */}
          <h1 className="text-[5rem] font-black text-[#C0392B] leading-none tracking-tighter mb-2">
            500
          </h1>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-2">
            Internal Server Error
          </h2>

          {/* Description */}
          <p className="text-[#6B7A8D] text-base leading-relaxed mb-8 max-w-[500px] mx-auto">
            Something went wrong on our server. We are currently fixing the issue and will be back shortly.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">

            <button
              onClick={() => window.location.reload()}
              className="bg-[#0D1B2A] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition active:scale-95 shadow-lg"
            >
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="border border-[#E4DDD0] text-[#0D1B2A] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition active:scale-95"
            >
              Back to Home
            </button>

          </div>

          {/* Technical Divider */}
          <div className="flex items-center gap-4 mb-4">

            <div className="flex-1 h-[1px] bg-[#E4DDD0]" />

            <span className="text-[10px] uppercase font-bold tracking-[2px] text-[#A0AEC0]">
              Technical Details
            </span>

            <div className="flex-1 h-[1px] bg-[#E4DDD0]" />

          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#FAFAFA] border border-gray-100 rounded-2xl p-4 text-left">

            <div>
              <span className="block text-[10px] font-bold text-[#A0AEC0] uppercase mb-1">
                Error Code
              </span>
              <span className="text-xs font-mono font-bold text-[#4A5568]">
                SERVER_ERR_500
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-[#A0AEC0] uppercase mb-1">
                Timestamp
              </span>
              <span className="text-xs font-mono font-bold text-[#4A5568]">
                {now}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-[#A0AEC0] uppercase mb-1">
                Endpoint
              </span>
              <span className="text-xs font-mono font-bold text-[#4A5568] truncate block">
                {path}
              </span>
            </div>

          </div>

          {/* Support */}
          <p className="mt-6 text-sm text-[#6B7A8D]">
            Need help? Contact{" "}
            <a
              href="mailto:support@shikkhabd.com"
              className="text-[#C0392B] font-bold hover:underline"
            >
              support@shikkhabd.com
            </a>
          </p>

        </div>
      </main>
    </div>
  );
}