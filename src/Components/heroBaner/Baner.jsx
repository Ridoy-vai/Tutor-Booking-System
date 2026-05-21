'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop',
    title: 'Find the Best Tutors Near You',
    description: 'Get personalized 1-on-1 learning experience with experts in your city. Elevate your grades today!',
    btnText: 'Explore Tutors',
    link: '/tutors',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2000&auto=format&fit=crop',
    title: 'Learn Anything, Anywhere',
    description: 'From Mathematics to Music, choose from 100+ subjects. Online or offline — you decide the mode.',
    btnText: 'Find a Subject',
    link: '/tutors',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop',
    title: 'Become a Trusted Tutor',
    description: 'Join our community of 5000+ educators. Share your knowledge and start earning from home.',
    btnText: 'Start Teaching',
    link: '/tutors',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <div className="w-full relative overflow-hidden bg-black">
      <div className="relative h-[65vh] sm:h-[75vh] md:h-[85vh] w-full group">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {/* Background Image with Ken Burns Effect */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[current].image})` }}
            >

              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Content Container - Centered but aligned with common max-width */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-medium mb-6">
                    ✨ Trusted by 5000+ Students
                  </span>
                </motion.div>

                {/* Title Animation */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                >
                  {slides[current].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl"
                >
                  {slides[current].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href={slides[current].link}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
                  >
                    {slides[current].btnText}
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/features"
                    className="px-8 py-4 rounded-xl font-bold text-lg text-white border border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-30 pointer-events-none hidden md:flex items-center justify-between px-8">
          <button
            onClick={prev}
            className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl text-white flex items-center justify-center transition-all hover:bg-purple-600 opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl text-white flex items-center justify-center transition-all hover:bg-purple-600 opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Progress Bar Style Dots */}
        <div className="absolute bottom-10 left-0 right-0 z-40 flex justify-center items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group relative h-1.5 rounded-full bg-white/20 transition-all duration-300"
              style={{ width: current === i ? '60px' : '30px' }}
            >
              {current === i && (
                <motion.div
                  layoutId="activeProgress"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0 bg-purple-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;