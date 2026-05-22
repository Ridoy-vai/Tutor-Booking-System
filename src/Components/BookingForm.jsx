'use client';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ data }) => {
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState({});

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userId = user?.id;
    const router = useRouter();

    const { _id, userName, userEmail, userPhoto, TutorBaner, TecherName, TecherEmail, TutorSubject, TutorLocation, TutorerExprence, tutorstartTime, totalSlots, tutorendTime, tutorhourlyFee, rating, tutorstartDate, tutorinstitution, tutorteachingMode, secretCode } = data;

    const validate = (formData) => {
        const errors = {};

        const name = formData.get("name")?.trim();
        const mobile = formData.get("mobile")?.trim();

        // NAME: min 3 chars
        if (!name) {
            errors.name = "Name is required";
        } else if (name.length < 3) {
            errors.name = "Name must be at least 3 characters";
        }

        // MOBILE: only 11 digits
        const mobileRegex = /^[0-9]{11}$/;

        if (!mobile) {
            errors.mobile = "Mobile number is required";
        } else if (!mobileRegex.test(mobile)) {
            errors.mobile = "Mobile must be exactly 11 digits (numbers only)";
        }

        return errors;
    };

    const handelBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        if (totalSlots <= 0) {
            toast.error("No available slots!");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to book a session.");
            return;
        }

        setIsPending(true);

        try {
            const { data: tokenData } = await authClient.token();
            const bookingDetails = Object.fromEntries(formData.entries());

            const bookingData = {
                userId: userId || "Unknown User",
                StudentName: bookingDetails?.name || "Anonymous",
                studentPhone: bookingDetails.mobile,
                StudentMessage: bookingDetails.message,
                StudentBookingDate: bookingDetails.date,
                bookingstatus: "pending",
                rating,
                secretCode,
                userName,
                userEmail,
                userPhoto,
                TutorBaner,
                TecherName,
                TecherEmail,
                TutorSubject,
                TutorLocation,
                TutorerExprence,
                tutorstartTime,
                tutorendTime,
                tutorhourlyFee,
                totalSlots,
                tutorstartDate,
                tutorinstitution,
                tutorteachingMode
            };

            const bookingres = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const bookings = await bookingres.json();

            // Check duplicate booking
            const isAlreadyBooked = bookings?.some(
                (book) => String(book?.secretCode) === String(secretCode)
            );

            if (isAlreadyBooked) {
                toast.error("You already booked this tutor!");
                setIsPending(false);
                return;
            }



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
                e.target.reset();
                router.refresh();
            }

        } catch (err) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Student Information
                </h3>

                <form onSubmit={handelBooking} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Full Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* MOBILE */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Mobile
                        </label>
                        <input
                            name="mobile"
                            type="tel"
                            inputMode="numeric"
                            maxLength={11}
                            placeholder="Enter your mobile number"
                            className="w-full px-4 py-3 rounded-xl border"
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                        )}
                    </div>

                    {/* DATE */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Joining Date
                        </label>
                        <input
                            name="date"
                            type="date"
                            readOnly
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border"
                        />
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message (Optional)
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={totalSlots <= 0 || isPending}
                        className={`w-full font-bold py-4 rounded-xl ${totalSlots <= 0 || isPending
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {isPending
                            ? "Processing..."
                            : totalSlots <= 0
                                ? "No Available Slots"
                                : "Confirm Booking Request"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;