'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
    title: "Find the Best Tutors Near You",
    description: "Get personalized 1-on-1 learning experience with experts in your city. Elevate your grades today!",
    btnText: "Explore Tutors",
    link: "/tutors"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2000&auto=format&fit=crop",
    title: "Learn Anything, Anywhere",
    description: "From Mathematics to Music, choose from 100+ subjects. Online or offline — you decide the mode.",
    btnText: "Find a Subject",
    link: "/tutors"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop",
    title: "Become a Trusted Tutor",
    description: "Join our community of 5000+ educators. Share your knowledge and start earning from home.",
    btnText: "Start Teaching",
    link: "/tutors"
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // Auto-play Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900 group">
      
      {slides.map((slide, index) => {
        const isActive = index === current;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Ken Burns Effect (Zoom) */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-linear ${
                isActive ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay: gradients for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
              <div className="overflow-hidden">
                <h1 
                  className={`text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight transition-all duration-700 ease-out delay-300 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>
              </div>

              <div className="overflow-hidden">
                <p 
                  className={`text-lg md:text-2xl text-gray-200 max-w-3xl mb-10 leading-relaxed font-light transition-all duration-700 ease-out delay-500 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                >
                  {slide.description}
                </p>
              </div>

              <div className={`transition-all duration-700 ease-out delay-700 ${
                isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}>
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {slide.btnText} <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Buttons (Arrows) */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto hidden md:flex bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto hidden md:flex bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-12 h-2.5 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;