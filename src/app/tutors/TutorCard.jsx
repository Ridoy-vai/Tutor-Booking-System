import React from 'react';
import { Clock, Heart, Video, BarChart, Star, ArrowRight, BookOpen, GraduationCap, MapPin, } from 'lucide-react';
import Link from 'next/link';

const CourseCard = ({ tutors }) => {
    return (
        tutors.map((tutor) => (

            <div key={tutor._id} className="bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                {/* Image & Badge */}
                <div className="relative p-3">
                    <div className="relative h-56 w-full overflow-hidden">
                        <img
                            src={tutor.photoUrl}
                            alt={tutor.fullName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{tutor.teachingMode}</span>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            ৳{tutor.hourlyFee}/hr
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-2">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{tutor.fullName}</h3>
                        <div className="flex items-center gap-1 text-orange-500">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm font-bold">4.9</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-4">
                        <BookOpen size={16} />
                        <span>{tutor.subject} Specialist</span>
                    </div>

                    <div className="space-y-2.5 mb-6">
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <GraduationCap size={18} className="text-gray-400" />
                            <span className="truncate">{tutor.institution}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <MapPin size={18} className="text-gray-400" />
                            <span>{tutor.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <Clock size={18} className="text-gray-400" />
                            <span className="truncate">{tutor.availability}</span>
                        </div>
                    </div>

                    <div className=" flex border-t border-dashed border-gray-200 pt-5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Experience</span>
                            <span className="text-sm font-bold text-gray-700">{tutor.experience}</span>
                        </div>

                    </div>
                    <button className="flex items-center w-full gap-1 text-sm font-semibold bg-amber-500 border-amber-500 hover:bg-amber-600 text-white py-2 rounded-md justify-center mt-4 transition-colors duration-300">
                       <Link href={`/tutors/${tutor._id}`}> View Profile</Link>
                    </button>

                </div>
            </div>

        ))
    );
};

export default CourseCard;