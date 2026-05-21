import { DeletAlert } from '@/Components/DeletAlert';
import { EaditMybooking } from '@/Components/myTutorAction';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const MyTutors = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;
    const user = session?.user;

    let myTutorsDatas = [];
    const {token} = await auth.api.getToken({
        headers: await headers()
    }); //server side e token niye ashar jonno
    // const {clientToken} = await authClient.Token(); //client side e token niye ashar jonno
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/mytutors/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
                // authorization: `Bearer ${clientToken?.token}`, for client side token
            },
            cache: 'no-store'
        });
        const resData = await res.json();

        if (res.ok) {
            myTutorsDatas = resData;
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">
                        Management Dashboard
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                        My Tutors List
                    </h1>
                    <p className="text-gray-500 mt-3 text-base max-w-2xl">
                        Manage your teaching profile, availability, and hourly rates from one central dashboard.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        {
                            label: "Total Tutors",
                            value: myTutorsDatas.length,
                            bgColor: "bg-purple-50",
                            textColor: "text-purple-700",
                        },
                        {
                            label: "Active Slots",
                            value: myTutorsDatas.reduce((total, tutor) => total + Number(tutor.totalSlots || 0), 0),
                            bgColor: "bg-blue-50",
                            textColor: "text-blue-700",
                        },
                        {
                            label: "Avg. Hourly Fee",
                            value: `৳${myTutorsDatas.length ? Math.round(myTutorsDatas.reduce((a, b) => a + Number(b.hourlyFee || 0), 0) / myTutorsDatas.length) : 0}`,
                            bgColor: "bg-green-50",
                            textColor: "text-green-700",
                        },
                        {
                            label: "Subjects Covered",
                            value: new Set(myTutorsDatas.map((t) => t.subject)).size,
                            bgColor: "bg-amber-50",
                            textColor: "text-amber-700",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`${stat.bgColor} border border-white rounded-sm p-2 shadow-sm transition-transform hover:scale-[1.02]`}
                        >
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                {stat.label}
                            </p>
                            <p className={`text-3xl font-black ${stat.textColor}`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {myTutorsDatas.length > 0 ? (
                    <>
                        {/* Desktop View: Elegant Table */}
                        <div className="hidden lg:block bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            {["Tutor Information", "Subject", "Availability", "Fee", "Slots", "Action"].map((col) => (
                                                <th key={col} className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {myTutorsDatas.map((item, index) => (
                                            <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={item?.photoUrl || `https://ui-avatars.com/api/?name=${item.fullName}`}
                                                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100"
                                                            alt={item.fullName}
                                                        />
                                                        <div>
                                                            <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                                {item.fullName}
                                                            </p>
                                                            <p className="text-xs text-gray-400 font-medium">{item.institution || "No Institution"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold italic">
                                                        #{item.subject}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 text-xs font-semibold">
                                                    {item.startTime} - {item.endTime}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-black text-gray-800">৳{item.hourlyFee}<span className="text-[10px] text-gray-400">/hr</span></p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-bold">
                                                        {item.totalSlots} Slots
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-3">
                                                        <EaditMybooking id={item._id} user={user} item={item} />
                                                        <DeletAlert id={item._id} userId={userId} item={item} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile & Tablet View: Card Layout */}
                        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myTutorsDatas.map((item, index) => (
                                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.photoUrl || `https://ui-avatars.com/api/?name=${item.fullName}`}
                                                className="w-14 h-14 rounded-2xl object-cover border-2 border-gray-50"
                                            />
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.fullName}</h3>
                                                <p className="text-xs text-indigo-500 font-bold uppercase tracking-tighter mt-1">{item.subject}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-6">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Hourly Fee</p>
                                            <p className="text-sm font-black text-gray-800">৳{item.hourlyFee}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Time Slot</p>
                                            <p className="text-xs font-bold text-gray-700">{item.startTime}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex gap-2 w-full">
                                            <div className="flex-1">
                                                <EaditMybooking id={item._id} user={user} item={item} />
                                            </div>
                                            <div className="flex-1">
                                                <DeletAlert id={item._id} userId={userId} item={item} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Enhanced Empty State */
                    <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 py-20 px-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-800">No Tutors Listed</h3>
                        <p className="text-gray-500 text-sm mt-3 max-w-xs leading-relaxed">
                            It seems you haven't added any tutoring services yet. Start sharing your knowledge today!
                        </p>
                        <Link
                            href="/tutors"
                            className="mt-8 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            Find Tutors
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTutors;
