"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation"; // ১. useRouter ইমপোর্ট করুন
import { toast } from "react-toastify";

export function CancleBooking({ id, userId, item }) {
    const router = useRouter();
    const handelcancle = async () => {
        if(item.status === "Cancelled"){
            toast.info("This booking is already cancelled.");
            return;
        }
        const UpdatebookingData = {
            tutorId: item.tutorId,
            userId: userId,
            StudentName: item.StudentName,
            StudentEmail: item.StudentEmail,
            studentPhone: item.studentPhone,
            StudentMessage: item.StudentMessage,
            TutorName: item.TutorName,
            email: item.email,
            subject: item.subject,
            teachingMode: item.teachingMode,
            institution: item.institution,
            experience: item.experience,
            hourlyFee: item.hourlyFee,
            location: item.location,
            photoUrl: item.photoUrl,
            StudentBookingDate: item.StudentBookingDate,
            startDate: item.startDate,
            totalSlots: item.totalSlots,
            status: "Cancelled",
        };

        try {
            const res = await fetch(`http://localhost:1000/bookings/${userId}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(UpdatebookingData)
            });

            if (res.ok) {
                const data = await res.json();
                router.refresh(); 
                toast.success("Booking has been cancelled.");
            } else {
                toast.error("Failed to cancel booking.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger">Cancel Booking</Button> 
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently cancel your booking for <strong>{item.TutorName}</strong>. 
                                This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Go Back
                            </Button>
                            {/* slot="close" থাকার কারণে ক্লিক করলে অটোমেটিক মডালটি বন্ধ হয়ে যাবে */}
                            <Button slot="close" variant="danger" onClick={handelcancle}>
                                Confirm Cancel
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}