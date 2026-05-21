"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaBook, FaMoneyBillWave, FaCalendarAlt, FaStar } from 'react-icons/fa';

const AllTutorsPage = () => {
    const [tutors, setTutors] = useState([]);
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors`);
                const data = await res.json();
                if (!Array.isArray(data)) {
                    throw new Error("Tutors API did not return JSON data.");
                }
                setTutors(data);
                setFilteredTutors(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tutors:", error);
                setLoading(false);
            }
        };
        fetchTutors();
    }, []);

    useEffect(() => {
        let results = tutors;

        if (searchName) {
            results = results.filter(tutor =>
                tutor.fullName.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (startDate || endDate) {
            results = results.filter(tutor => {
                const tutorDate = new Date(tutor.startDate).getTime();
                const start = startDate ? new Date(startDate).getTime() : -Infinity;
                const end = endDate ? new Date(endDate).getTime() : Infinity;
                
                return tutorDate >= start && tutorDate <= end;
            });
        }

        setFilteredTutors(results);
    }, [searchName, startDate, endDate, tutors]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center md:text-left">
                    Find Our Tutors
                </h2>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Search by Name</label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                                <input 
                                    type="text"
                                    placeholder="e.g., Abu Raihan..."
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">From (Start Date)</label>
                            <input 
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* End Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">To (End Date)</label>
                            <input 
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <button 
                                onClick={() => {setSearchName(''); setStartDate(''); setEndDate('');}}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-xl font-bold text-gray-500">Loading...</div>
                ) : filteredTutors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTutors.map((tutor) => (
                            <TutorCard key={tutor._id} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                        <p className="text-gray-500 text-lg italic">Sorry, no tutors found with the selected filters!</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const TutorCard = ({ tutor }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="relative">
                <img 
                    src={tutor.photoUrl || 'https://via.placeholder.com/300'} 
                    alt={tutor.fullName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <FaStar className="text-amber-500" size={14} />
                    <span className="text-xs font-bold text-gray-800">4.9</span>
                </div>
            </div>
            
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{tutor.fullName}</h3>
                <p className="text-blue-600 font-semibold text-sm flex items-center gap-2 mb-3">
                    <FaBook /> {tutor.subject}
                </p>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaMapMarkerAlt className="text-red-400" /> {tutor.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaCalendarAlt className="text-green-500" /> Start Date: {tutor.startDate}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Hourly Rate</p>
                        <p className="text-lg font-extrabold text-gray-900">${tutor.hourlyFee}<span className="text-xs font-normal text-gray-500">/hour</span></p>
                    </div>
                    <Link href={`/tutors/${tutor._id || tutor.id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllTutorsPage;
