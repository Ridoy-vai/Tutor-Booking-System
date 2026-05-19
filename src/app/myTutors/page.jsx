import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const MyTutors = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    let myTutorsDatas = [];
    try {
        const res = await fetch(`http://localhost:1000/tutors/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            myTutorsDatas = await res.json();
            console.log("Fetched My Tutors Data:", myTutorsDatas);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-10">

            {/* Header */}
            <div className="mb-10">
                <p className="text-sm font-semibold text-purple-500 uppercase tracking-widest mb-1">Dashboard</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">আমার টিউটর লিস্ট</h1>
                <p className="text-gray-500 mt-2 text-sm">আপনার বুক করা সকল টিউটরের তথ্য এখানে দেখুন।</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                    { label: "মোট টিউটর", value: myTutorsDatas.length, textColor: "text-purple-600" },
                    { label: "মোট Slots", value: myTutorsDatas.reduce((a, b) => a + (b.totalSlots || 0), 0), textColor: "text-blue-600" },
                    { label: "গড় ফি (৳)", value: myTutorsDatas.length ? Math.round(myTutorsDatas.reduce((a, b) => a + Number(b.hourlyFee || 0), 0) / myTutorsDatas.length) : 0, textColor: "text-green-600" },
                    { label: "Subjects", value: new Set(myTutorsDatas.map(t => t.subject)).size, textColor: "text-amber-600" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {myTutorsDatas.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        {["#", "টিউটর", "Subject", "Availability", "Hourly Fee", "Slots", "Join Date", "Action"].map(col => (
                                            <th key={col} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {myTutorsDatas.map((item, index) => (
                                        <tr key={index} className="hover:bg-purple-50/40 transition-colors">
                                            <td className="px-6 py-4 text-gray-400 font-mono text-xs">{index + 1}</td>

                                            {/* Tutor Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.photoUrl || `https://ui-avatars.com/api/?name=${item.fullName}&background=7c3aed&color=fff`}
                                                        alt={item.fullName}
                                                        className="w-9 h-9 rounded-full object-cover border-2 border-purple-100 flex-shrink-0"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800 whitespace-nowrap">{item.fullName}</p>
                                                        <p className="text-xs text-gray-400">{item.institution || "—"}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Subject */}
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold whitespace-nowrap">
                                                    {item.subject}
                                                </span>
                                            </td>

                                            {/* Availability */}
                                            <td className="px-6 py-4 text-gray-600 text-xs max-w-[160px]">
                                                {item.startDate || "—"}
                                            </td>

                                            {/* Fee */}
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-green-600">৳{item.hourlyFee}</span>
                                                <span className="text-gray-400 text-xs">/hr</span>
                                            </td>

                                            {/* Slots */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-purple-400 rounded-full"
                                                            style={{ width: `${Math.min((item.totalSlots / 10) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-600">{item.totalSlots}</span>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                                                {item.startDate
                                                    ? new Date(item.startDate).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })
                                                    : new Date(item.startDate).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-colors">
                                                        ✏️ Edit
                                                    </button>
                                                    <button className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-xs font-bold transition-colors">
                                                        🗑 Delete
                                                    </button>
                                                </div>
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
                                {/* Top */}
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={item.photoUrl || `https://ui-avatars.com/api/?name=${item.TutorName}&background=7c3aed&color=fff`}
                                        alt={item.TutorName}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800">{item.TutorName}</p>
                                        <p className="text-xs text-gray-400">{item.institution || "—"}</p>
                                    </div>
                                    <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
                                        {item.subject}
                                    </span>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Availability</p>
                                        <p className="font-medium text-gray-700 text-xs">{item.availability || "—"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Hourly Fee</p>
                                        <p className="font-bold text-green-600">৳{item.hourlyFee}<span className="text-gray-400 text-xs font-normal">/hr</span></p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Slots</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.min((item.totalSlots / 10) * 100, 100)}%` }} />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600">{item.totalSlots}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Join Date</p>
                                        <p className="font-medium text-gray-700 text-xs">
                                            {item.registrationDate
                                                ? new Date(item.registrationDate).toLocaleDateString('bn-BD')
                                                : new Date(item.StudentBookingDate).toLocaleDateString('bn-BD')}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm font-bold transition-colors">
                                        ✏️ Edit
                                    </button>
                                    <button className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-bold transition-colors">
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-5">
                        <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Tutors Found</h3>
                    <p className="text-gray-400 text-sm max-w-xs">You haven't booked any tutors yet. Find a tutor now.</p>
                    <Link href="/tutors" className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-colors">
                        Find Tutors  →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTutors;