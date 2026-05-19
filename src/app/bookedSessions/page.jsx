import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const BookedSessions = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    let myTutorsDatas = [];
    try {
        const res = await fetch(`http://localhost:1000/bookings/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            myTutorsDatas = await res.json();
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-10">

            {/* Header */}
            <div className="mb-10">
                <p className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-1">Dashboard</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Booked Sessions</h1>
                <p className="text-gray-500 mt-2 text-sm">আপনার সকল বুকিং এখানে দেখতে পাবেন।</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                    { label: "Total Bookings", value: myTutorsDatas.length, color: "bg-blue-100 text-blue-700" },
                    { label: "Pending", value: myTutorsDatas.length, color: "bg-amber-100 text-amber-700" },
                    { label: "Confirmed", value: 0, color: "bg-green-100 text-green-700" },
                    { label: "Cancelled", value: 0, color: "bg-red-100 text-red-700" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Table / Cards */}
            {myTutorsDatas.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">No</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tutor</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Join Date</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {myTutorsDatas.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="px-6 py-4 text-gray-400 font-mono text-xs">{index + 1}</td>

                                            {/* Student */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                        {item.StudentName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 whitespace-nowrap">{item.StudentName}</p>
                                                        <p className="text-xs text-gray-400">{item.StudentEmail}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.studentPhone}</td>

                                            {/* Tutor */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={item.photoUrl}
                                                        alt={item.TutorName}
                                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                                    />
                                                    <span className="font-medium text-gray-700 whitespace-nowrap">{item.TutorName}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                                                    {item.subject}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                {new Date(item.StudentBookingDate).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                })}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-semibold">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                                    Pending
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-xs font-bold transition-colors">
                                                    ✕ Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {myTutorsDatas.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                {/* Top Row */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {item.StudentName?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{item.StudentName}</p>
                                            <p className="text-xs text-gray-400">{item.StudentEmail}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                        Pending
                                    </span>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                                        <p className="font-medium text-gray-700">{item.studentPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Subject</p>
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                                            {item.subject}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Join Date</p>

                                        <p className="font-medium text-gray-700">
                                            {new Date(item.StudentBookingDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Tutor</p>
                                        <div className="flex items-center gap-1.5">
                                            <img src={item.photoUrl} alt={item.TutorName} className="w-5 h-5 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700 text-xs">{item.TutorName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cancel Button */}
                                <button className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-bold transition-colors">
                                    ✕ Cancel Booking
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                        <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Bookings Found</h3>
                    <p className="text-gray-400 text-sm max-w-xs">You haven't booked any tutors yet. Find a tutor now.</p>
                    <Link href="/tutors" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors">
                        Find Tutors  →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BookedSessions;