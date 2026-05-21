'use client';
import React, { useEffect, useState } from 'react';
import {
  MapPin,
  GraduationCap,
  Clock,
  Star,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';



const TutorCard = ({ tutor }) => (
  <div className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
    {/* Image & Badge */}
    <div className="relative p-3">
      <div className="relative h-56 w-full overflow-hidden rounded-[1.8rem]">
        <img
          src={tutor?.TutorBaner || `https://ui-avatars.com/api/?name=${tutor.TecherName}&background=7c3aed&color=fff`}
          alt={tutor.TecherName || "Tutor Avatar"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{tutor.tutorteachingMode}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
          ${tutor.tutorhourlyFee}/hr
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="px-6 pb-6 pt-2">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{tutor.TecherName}</h3>
        <div className="flex items-center gap-1 text-orange-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold">4.9</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-4">
        <BookOpen size={16} />
        <span>{tutor.TutorSubject} Specialist</span>
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <GraduationCap size={18} className="text-gray-400" />
          <span className="truncate">{tutor.tutorinstitution}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <MapPin size={18} className="text-gray-400" />
          <span>{tutor.TutorLocation}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <Clock size={18} className="text-gray-400" />
          <span className="truncate">Start: {tutor.tutorstartDate}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 pt-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Experience</span>
          <span className="text-sm font-bold text-gray-700">{tutor.TutorerExprence}</span>
        </div>
        <Link
          href={`/tutors/${tutor._id}`}
          className="p-2.5 bg-gray-50 hover:bg-purple-600 text-purple-600 hover:text-white rounded-xl transition-colors group/btn"
        >
          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

const FeaturesPage = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("/api/featured-tutors", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
              "Failed to fetch featured tutors."
          );
        }
        const responseBody = await res.json();  
        setTutors(Array.isArray(responseBody) ? responseBody : []);
      } catch (error) {
        console.error("Failed to fetch featured tutors:", error);
        setTutors([]);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-purple-600 font-bold uppercase tracking-[0.2em] text-sm mb-3">Expert Educators</h2>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Our Featured Tutors
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Find the perfect mentor to help you master your subjects with personalized 1-on-1 sessions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all shadow-md active:scale-95"
          >
            Explore More Tutors <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
