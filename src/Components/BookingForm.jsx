'use client';
import { authClient } from "@/lib/auth-client";
import { useState } from "react"; // Loading state এর জন্য
import { toast } from "react-toastify";

const BookingForm = ({ data }) => {
    const [isPending, setIsPending] = useState(false); // সাবমিট করার সময় বাটন ডিসেবল রাখার জন্য
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userId = user?.id;

    // ডাটা ডিস্ট্রাকচারিং
    const { 
        _id, fullName, email, subject, location, institution, 
        experience, availability, teachingMode, hourlyFee, 
        totalSlots, startDate, photoUrl 
    } = data;

    const handelBooking = async (e) => {
        e.preventDefault();
        
        if (totalSlots <= 0) {
            toast.error("No available slots!");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to book a session.");
            return;
        }

        setIsPending(true); // লোডিং শুরু

        try {
            const { data: tokenData } = await authClient.token();
            const formData = new FormData(e.target);
            const bookingDetails = Object.fromEntries(formData.entries());

            const bookingData = {
                userId: userId || "Unknown User",
                StudentName: user?.name || "Anonymous",
                StudentEmail: user?.email,
                studentPhone: bookingDetails.mobile,
                StudentMessage: bookingDetails.message,
                StudentBookingDate: bookingDetails.date,
                tutorId: _id, 
                TutorName: fullName,
                email,
                subject,
                location,
                institution,
                experience,
                availability,
                teachingMode,
                hourlyFee,
                totalSlots,
                startDate,
                photoUrl
            };

            // ১. বুকিং রিকোয়েস্ট পাঠানো
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                 },
                body: JSON.stringify(bookingData)
            });

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(resData?.message || "Booking failed!");
            }

            // ২. টিউটরের স্লট আপডেট করা
            const update = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors/${_id}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ totalSlots: totalSlots - 1 })
            });

            if (!update.ok) {
                toast.warning("Booking successful, but slot update failed.");
            } else {
                toast.success("Booking request submitted successfully!");
                e.target.reset(); // ফর্ম ক্লিয়ার করা
            }

        } catch (err) {
            console.error("Error:", err);
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsPending(false); // লোডিং শেষ
        }
    };

    return (
        <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Book a Session</h3>

                <form onSubmit={handelBooking} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                            name="name"
                            required
                            type="text"
                            // defaultValue={undefined} হলে এরর দেয়, তাই fallback "" দেওয়া হয়েছে
                            defaultValue={user?.name || ""} 
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile</label>
                        <input
                            name="mobile"
                            required
                            type="tel"
                            placeholder="Enter your mobile number"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
                        <input
                            name="date"
                            type="date"
                            required
                            // standard format YYYY-MM-DD নিশ্চিত করা হয়েছে
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                        <textarea
                            name="message"
                            placeholder="Write your requirements..."
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={totalSlots <= 0 || isPending}
                        className={`w-full font-bold py-4 rounded-xl transition-all transform active:scale-95 ${
                            (totalSlots <= 0 || isPending)
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                            }`}
                    >
                        {isPending ? 'Processing...' : (totalSlots <= 0 ? 'No Available Slots' : 'Confirm Booking Request')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;