import BookingForm from '@/Components/BookingForm';
import { notFound } from 'next/navigation';
import React from 'react';
import {
    FaEnvelope, FaBook, FaMapMarkerAlt,
    FaClock, FaUniversity, FaChalkboardTeacher,
    FaCalendarAlt, FaStar, FaCheckCircle
} from 'react-icons/fa';

const TutorProfilePage = async ({ params }) => {

    const { id } = await params;

    // ✅ আগে status check, তারপর json parse
    let data;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        // ✅ 404 হলে Next.js এর not-found page দেখাবে
        if (res.status === 404) {
            notFound();
        }

        // ✅ অন্য error হলে throw করো
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        data = await res.json();

        // ✅ data ঠিকমতো না আসলে
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data received from server.");
        }

    } catch (error) {
        // ✅ Server Component এ error boundary এ পাঠাও
        throw new Error(error.message || "Failed to load tutor details.");
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT & MIDDLE CONTENT */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Header Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="relative">
                                <img
                                    src={data?.photoUrl}
                                    alt={data?.fullName}
                                    className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-2xl shadow-lg ring-4 ring-white"
                                />
                                <span className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg">
                                    <FaCheckCircle size={20} />
                                </span>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                    <h1 className="text-4xl font-extrabold text-gray-800">{data?.fullName}</h1>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold w-fit mx-auto md:mx-0">
                                        Verified Tutor
                                    </span>
                                </div>
                                <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 text-lg mb-4">
                                    <FaEnvelope className="text-blue-500" /> {data?.email}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                                        <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">Rating</p>
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            4.9 <FaStar className="text-amber-500" size={16} />
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Hourly Fee</p>
                                        <p className="text-lg font-bold text-indigo-700">৳ {data?.hourlyFee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 border-b pb-4">Professional Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoItem icon={<FaBook color="#3b82f6" />} label="Subject" value={data?.subject} />
                                <InfoItem icon={<FaUniversity color="#8b5cf6" />} label="Institution" value={data?.institution} />
                                <InfoItem icon={<FaMapMarkerAlt color="#ef4444" />} label="Location" value={data?.location} />
                                <InfoItem icon={<FaClock color="#10b981" />} label="Experience" value={data?.experience} />
                                <InfoItem icon={<FaChalkboardTeacher color="#f59e0b" />} label="Teaching Mode" value={data?.teachingMode} />
                                <InfoItem icon={<FaCalendarAlt color="#6366f1" />} label="Schedule Time" value={`${data?.startTime} to ${data?.endTime}`} />
                            </div>

                            <div className="mt-8">
                                <h4 className="text-gray-900 font-bold mb-3">Availability & Schedule</h4>
                                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
                                    <div className="bg-blue-500 p-3 rounded-xl text-white">
                                        <FaClock size={20} />
                                    </div>
                                    <p className="text-blue-900 font-medium leading-relaxed">
                                        Start Date: {data?.startDate}
                                        <br />
                                        <span className="text-blue-600 text-sm font-bold uppercase">
                                            Total Slots: {data?.totalSlots}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: BOOKING FORM */}
                    <BookingForm data={data} />

                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
        <div className="text-xl">{icon}</div>
        <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{label}</p>
            <p className="text-gray-700 font-semibold">{value}</p>
        </div>
    </div>
);

export default TutorProfilePage;