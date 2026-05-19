'use client';
import { authClient } from "@/lib/auth-client";
// import { revalidatePath } from "next/cache";

const BookingForm = ({ data }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { _id, fullName, email, subject, location, institution, experience, availability, teachingMode, hourlyFee, totalSlots, startDate, photoUrl } = data;

    const handelBooking = async (e) => {
        e.preventDefault();

        if (totalSlots <= 0) {
            alert("কোনো slot নেই!");
            return;
        }

        const formData = new FormData(e.target);
        const bookingDetails = Object.fromEntries(formData.entries());

        const bookingData = {
            userId: user?.id,
            StudentName: user?.name,
            StudentEmail: user?.email,
            studentPhone: bookingDetails.mobile,
            StudentMessage: bookingDetails.message,
            StudentBookingDate: new Date(bookingDetails.date),
            tutorId: _id, // ✅ _id এর বদলে tutorId — এটাই মূল fix
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

        try {
            const res = await fetch(`http://localhost:1000/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            const contentType = res.headers.get("content-type");
            const resData = contentType?.includes("application/json")
                ? await res.json()
                : await res.text();

            if (!res.ok) {
                console.error("Booking error:", resData);
                alert("Booking failed: " + (resData?.message || resData || "অজানা error"));
                return;
            }

            const update = await fetch(`http://localhost:1000/tutors/${_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ totalSlots: totalSlots - 1 })
            });

            const updateContentType = update.headers.get("content-type");
            const updateResult = updateContentType?.includes("application/json")
                ? await update.json()
                : await update.text();

            if (!update.ok) {
                console.error("Tutor update error:", updateResult);
                alert("Booking হয়েছে, কিন্তু slot update এ সমস্যা হয়েছে।");
                return;
            }

            alert("Booking request সফলভাবে পাঠানো হয়েছে!");
            window.location.href = `/tutors/${_id}`; // Booking সফল হলে সেই Tutor এর পেজে রিডাইরেক্ট

        } catch (err) {
            console.error("Network/Parse error:", err);
            alert("Server এর সাথে যোগাযোগ করা যাচ্ছে না। Server চালু আছে কিনা দেখুন।");
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
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile</label>
                        <input
                            name="mobile"
                            type="tel"
                            placeholder="Enter your mobile number"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date</label>
                        <input
                            name="date"
                            type="date"
                            readOnly
                            value={new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                        <textarea
                            name="message"
                            placeholder="Write your requirements..."
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={data.totalSlots <= 0}
                        className={`w-full font-bold py-4 rounded-xl transition-all transform active:scale-95 ${
                            data.totalSlots <= 0
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                        }`}
                    >
                        {data.totalSlots <= 0 ? 'No Available Slots' : 'Confirm Booking Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;