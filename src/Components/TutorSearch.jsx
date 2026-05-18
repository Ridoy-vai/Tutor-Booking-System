'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    MapPin,
    BookOpen,
    Clock,
    Star,
    ArrowRight,
    Filter,
    GraduationCap,
    LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

const TutorSearch = ({ tutors }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('All');

    // Filter Logic
    const filteredTutors = useMemo(() => {
        return tutors.filter(tutor => {
            const matchesSearch = tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSubject = filterSubject === 'All' || tutor.subject === filterSubject;
            return matchesSearch && matchesSubject;
        });
    }, [tutors, searchTerm, filterSubject]);

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Find Your Best Tutor</h1>
                        <p className="text-gray-500 font-medium">Browse through our qualified expert teachers</p>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search tutor name..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-purple-500 focus:ring-2 ring-purple-100 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full sm:w-48">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl outline-none cursor-pointer appearance-none shadow-sm focus:border-purple-500"
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                            >
                                <option value="All">All Subjects</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="English">English</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="ICT">ICT</option>
                                <option value="Biology">Biology</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tutors Grid */}
                {filteredTutors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTutors.map((tutor) => (
                            <div key={tutor._id} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col">
                                {/* Image & Badge */}
                                <div className="relative p-4">
                                    <div className="relative h-56 w-full overflow-hidden rounded-[2rem]">
                                        <img
                                            src={tutor.photoUrl}
                                            alt={tutor.fullName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{tutor.teachingMode}</span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                                            ৳{tutor.hourlyFee}/hr
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-7 pb-7 pt-2 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{tutor.fullName}</h3>
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="text-sm font-bold text-gray-700">4.9</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-widest mb-5">
                                        <BookOpen size={14} />
                                        <span>{tutor.subject} Specialist</span>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                                            <div className="p-1.5 bg-gray-50 rounded-lg"><GraduationCap size={16} className="text-gray-400" /></div>
                                            <span className="truncate font-medium">{tutor.institution}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                                            <div className="p-1.5 bg-gray-50 rounded-lg"><MapPin size={16} className="text-gray-400" /></div>
                                            <span className="font-medium">{tutor.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                                            <div className="p-1.5 bg-gray-50 rounded-lg"><Clock size={16} className="text-gray-400" /></div>
                                            <span className="truncate font-medium">{tutor.availability}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-5 flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Expertise</span>
                                            <span className="text-sm font-bold text-gray-700">{tutor.experience}</span>
                                        </div>
                                        <Link
                                            href={`/tutors/${tutor._id}`}
                                            className="p-3 bg-gray-900 hover:bg-purple-600 text-white rounded-2xl transition-all shadow-md active:scale-95 group/btn"
                                        >
                                            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-dashed border-gray-300">
                        <LayoutGrid className="mx-auto text-gray-300 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-gray-800">No Tutors Found</h2>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorSearch;