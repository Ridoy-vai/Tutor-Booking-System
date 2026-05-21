import { CancleBooking } from '@/Components/CancleBooking';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { readResponseBody } from '@/lib/http';
import { headers } from 'next/headers';
import Link from 'next/link';

const BookedSessions = async () => {

    //token antaci coocie theke niye asbe and session check korbe jodi session na thake tahole login page e redirect kore debe

    const {token} = await auth.api.getToken({
        headers: await headers()
    }); //server side e token niye ashar jonno
    // const {clientToken} = await authClient.Token(); //client side e token niye ashar jonno
    


    console.log("Token:", token); // Debugging line to check the token value
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    let myTutorsDatas = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                // authorization: `Bearer ${clientToken?.token}`, for client side token
            },
            cache: 'no-store' // Ensures fresh data
        });
        const responseBody = await readResponseBody(res);

        if (res.ok && Array.isArray(responseBody)) {
            myTutorsDatas = responseBody;
        } else if (!res.ok) {
            console.error("Bookings API returned non-JSON or error response:", responseBody);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
                        Overview
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                        My Booked Sessions
                    </h1>
                    <p className="text-gray-500 mt-3 text-base max-w-2xl">
                        Monitor your learning journey. View and manage all your scheduled tutoring sessions in one place.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: "Total Bookings", value: myTutorsDatas.length, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Pending", value: myTutorsDatas.filter((item) => item.status === "Pending" || !item.status).length, color: "text-amber-600", bg: "bg-amber-50" },
                        { label: "Confirmed", value: myTutorsDatas.filter((item) => item.status === "Confirmed").length, color: "text-green-600", bg: "bg-green-50" },
                        { label: "Cancelled", value: myTutorsDatas.filter((item) => item.status === "Cancelled").length, color: "text-red-600", bg: "bg-red-50" },
                    ].map((stat) => (
                        <div key={stat.label} className={`${stat.bg} rounded-sm p-2 border border-white shadow-sm transition-all hover:shadow-md`}>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                {myTutorsDatas.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-md shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            {["#", "Student Information", "Contact", "Tutor Details", "Subject", "Status", "Action"].map((head) => (
                                                <th key={head} className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {myTutorsDatas.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{index + 1}</td>
                                                
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-100">
                                                            {item.StudentName?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800">{item.StudentName}</p>
                                                            <p className="text-xs text-gray-400 truncate max-w-[150px]">{item.StudentEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.studentPhone}</td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item?.photoUrl || `https://ui-avatars.com/api/?name=${item.TutorName}`}
                                                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-50"
                                                            alt={item.TutorName}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-800">{item.TutorName}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Join: {new Date(item.StudentBookingDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                                                        {item.subject}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge status={item.status} />
                                                </td>

                                                <td className="px-6 py-4">
                                                    <CancleBooking id={item._id} userId={userId} item={item} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile & Tablet Card Layout */}
                        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myTutorsDatas.map((item, index) => (
                                <div key={index} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 relative group transition-all hover:shadow-md">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xl">
                                                {item.StudentName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{item.StudentName}</h3>
                                                <p className="text-xs text-gray-400">{item.StudentEmail}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={item.status} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl mb-6">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                                            <p className="text-sm font-bold text-gray-700">{item.studentPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Subject</p>
                                            <p className="text-sm font-bold text-indigo-600">{item.subject}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Booking Date</p>
                                            <p className="text-xs font-bold text-gray-700">
                                                {new Date(item.StudentBookingDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <img src={item.photoUrl} className="w-6 h-6 rounded-full" />
                                            <p className="text-[10px] font-bold text-gray-600 truncate">{item.TutorName}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="w-full">
                                            <CancleBooking id={item._id} userId={userId} item={item} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Enhanced Empty State */
                    <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 py-24 px-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-800">No Sessions Booked</h3>
                        <p className="text-gray-500 text-sm mt-3 max-w-xs leading-relaxed">
                            You haven't booked any tutoring sessions yet. Find your perfect tutor and start learning!
                        </p>
                        <Link href="/tutors" className="mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                            Browse Tutors →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Component for Status Badges
const StatusBadge = ({ status }) => {
    const config = {
        Cancelled: "bg-red-50 text-red-600 border-red-100",
        Confirmed: "bg-green-50 text-green-600 border-green-100",
        Pending: "bg-amber-50 text-amber-600 border-amber-100",
    };
    
    const currentStatus = status || "Pending";
    const style = config[currentStatus] || config.Pending;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-wider ${style}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentStatus === 'Cancelled' ? 'bg-red-400' : currentStatus === 'Confirmed' ? 'bg-green-400' : 'bg-amber-400'}`}></span>
            {currentStatus}
        </span>
    );
};

export default BookedSessions;
