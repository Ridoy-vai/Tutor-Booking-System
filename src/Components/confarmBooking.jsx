"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function ConfarmBooking({ id, userId, item }) {

    const router = useRouter();
    const handelcancle = async () => {
        const { data: tokenData } = await authClient.token()
        if (item.bookingstatus === "Confirmed") {
            toast.info("This booking is already Confirmed.");
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
            bookingstatus: "Confirmed",
        };



        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/${userId}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(UpdatebookingData)
            });

            const responseBody = await res.json();
            if (!res.ok) {
                toast.error("Failed to Confirmed booking: " + (responseBody?.message || responseBody || "unknown error"));
                return;
            }
            if (res.ok) {
                router.refresh();
                toast.success("Booking has been Confirmed.");
            } else {
                toast.error(getResponseMessage(responseBody, "Failed to Confirmed booking."));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <AlertDialog>
            <Button>Confirm Booking</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="success" />
                            <AlertDialog.Heading>Confirmed booking permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently Confirmed your booking for <strong>{item.TutorName}</strong>.
                                This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Go Back
                            </Button>
                            <Button slot="close" onClick={handelcancle}>
                                Confirm Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
