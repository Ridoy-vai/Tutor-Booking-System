"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function CancleBooking({ id, userId, item }) {
    
    const router = useRouter();
    const handelcancle = async () => {
        if(item.bookingstatus === "Cancelled"){
            toast.info("This booking is already cancelled.");
            return;
        }
        const UpdatebookingData = {
            tutorId: item.tutorId,
            userId: userId,
            StudentName: item.StudentName,
            // StudentEmail: item.StudentEmail,
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
            bookingstatus: "Cancelled",
        };

        

        try {
            console.log("Cancelling booking with data:", UpdatebookingData);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${userId}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(UpdatebookingData)
            });

            const responseBody = await res.json();
            if (!res.ok) {
                toast.error("Failed to cancel booking: " + (responseBody?.message || responseBody || "unknown error"));
                return;
            }
            if (res.ok) {
                router.refresh(); 
                toast.success("Booking has been cancelled.");
            } else {
                toast.error(getResponseMessage(responseBody, "Failed to cancel booking."));
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
                            <Button slot="close" variant="danger" onClick={handelcancle}>
                                Confirm Cancel ooking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
