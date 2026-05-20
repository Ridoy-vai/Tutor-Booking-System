'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop',
    title: 'Find the Best Tutors Near You',
    description:
      'Get personalized 1-on-1 learning experience with experts in your city. Elevate your grades today!',
    btnText: 'Explore Tutors',
    link: '/tutors',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2000&auto=format&fit=crop',
    title: 'Learn Anything, Anywhere',
    description:
      'From Mathematics to Music, choose from 100+ subjects. Online or offline — you decide the mode.',
    btnText: 'Find a Subject',
    link: '/tutors',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop',
    title: 'Become a Trusted Tutor',
    description:
      'Join our community of 5000+ educators. Share your knowledge and start earning from home.',
    btnText: 'Start Teaching',
    link: '/tutors',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const total = slides.length;

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  return (
    <section className="max-w-7xl mx-auto relative w-full overflow-hidden bg-black group">
      <div className="w-full h-[90vh] min-h-[650px] relative rounded-3xl overflow-hidden">

        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ${isActive
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
                }`}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'
                  }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full">
                <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center">

                  <div className="max-w-4xl text-center lg:text-left">

                    {/* Badge */}
                    <div
                      className={`mb-6 transition-all duration-700 delay-200 ${isActive
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                        }`}
                    >
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-white">
                        Trusted by 5000+ Students
                      </span>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <h1
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 transition-all duration-700 delay-300 ${isActive
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-12 opacity-0'
                          }`}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden">
                      <p
                        className={`text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-500 ${isActive
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-12 opacity-0'
                          }`}
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div
                      className={`flex flex-col sm:flex-row items-center lg:items-start gap-4 transition-all duration-700 delay-700 ${isActive
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                        }`}
                    >
                      <Link
                        href={slide.link}
                        className="inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl"
                      >
                        {slide.btnText}
                        <ArrowRight size={22} />
                      </Link>

                      <Link
                        href="/features"
                        className="inline-flex items-center justify-center border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        <div className="absolute inset-0 z-30 hidden md:flex items-center justify-between px-6 pointer-events-none">

          <button
            onClick={prev}
            className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={next}
            className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${current === i
                  ? 'w-10 h-3 bg-purple-500'
                  : 'w-3 h-3 bg-white/40 hover:bg-white'
                }`}
            />
          ))}
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </section>
  );
};

export default Banner;