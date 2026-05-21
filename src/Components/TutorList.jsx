'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, GraduationCap, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// অ্যানিমেশন সেটিংস
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: "easeOut" } 
    }
};

const TutorList = ({ tutors }) => {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {tutors.map((tutor) => (
                <motion.div
                    key={tutor._id}
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    className="group bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-500 flex flex-col"
                >
                    {/* ইমেজ সেকশন */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={tutor?.photoUrl || `https://ui-avatars.com/api/?name=${tutor.fullName}&background=7c3aed&color=fff&size=512`}
                            alt={tutor.fullName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* ব্যাজ */}
                        <div className="absolute top-4 left-4">
                            <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                {tutor.teachingMode}
                            </span>
                        </div>
                        
                        <div className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg border border-white/20">
                            ৳{tutor.hourlyFee}/hr
                        </div>
                    </div>

                    {/* কন্টেন্ট সেকশন */}
                    <div className="p-7 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                    {tutor.fullName}
                                </h3>
                                <p className="text-purple-600 font-bold text-xs flex items-center gap-1.5 uppercase tracking-wide">
                                    <BookOpen size={14} />
                                    {tutor.subject} Specialist
                                </p>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg border border-amber-100">
                                <Star size={14} fill="currentColor" />
                                <span className="font-bold text-xs">4.9</span>
                            </div>
                        </div>

                        {/* ইনফো লিস্ট */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <GraduationCap size={18} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Institution</p>
                                    <p className="text-sm font-bold text-gray-700 truncate">{tutor.institution}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Location</p>
                                    <p className="text-sm font-bold text-gray-700">{tutor.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Availability</p>
                                    <p className="text-sm font-bold text-gray-700">{tutor.startDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ফুটার */}
                    <div className="px-7 py-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Experience</p>
                            <p className="text-sm font-black text-gray-800">{tutor.experience}</p>
                        </div>

                        <Link
                            href={`/tutors/${tutor._id}`}
                            className="group/btn inline-flex items-center gap-2 bg-gray-900 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md hover:shadow-purple-200"
                        >
                            Details
                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default TutorList;