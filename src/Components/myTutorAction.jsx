"use client";
import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Modal, Surface } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function EaditMybooking({ id, user, item }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = user?.id;

    const { TecherEmail, tutorendTime, TutorerExprence, TecherName, tutorhourlyFee, tutorinstitution, TutorLocation, TutorBaner, tutorstartDate, tutorstartTime, TutorSubject, tutorteachingMode, totalSlots,rating } = item || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: tokenData } = await authClient.token()
        setLoading(true);

        const formData = new FormData(e.target);
        const dataUpdate = Object.fromEntries(formData.entries());

        const updateData = {
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userPhoto: user?.image,
            rating,
            ...dataUpdate,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors/${userId}/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(updateData),
                }
            );
            // const responseBody = await readResponseBody(res);
            const responseBody = await res.json();

            if (res.ok) {
                router.refresh();

                setIsOpen(false);

                toast.success("Updated successfully!");
            } else {
                toast.error(getResponseMessage(responseBody, "Failed to update tutor."));
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update tutor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={() => setIsOpen(true)}>Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-2xl w-full">
                            <Modal.CloseTrigger />

                            {/* Header */}
                            <Modal.Header>
                                <Modal.Icon className="bg-purple-100 text-purple-600">
                                    <Envelope className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Edit Booking</Modal.Heading>
                                <p className="mt-2 text-sm text-gray-500">
                                    Update tutor booking information below.
                                </p>
                            </Modal.Header>

                            {/* Body */}
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                                        {/* Tutor Info Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 border-b pb-2">Tutor Info</h3>
                                            <input defaultValue={TutorBaner} name="TutorBaner" placeholder="Photo URL" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input defaultValue={TecherName} name="TecherName" placeholder="Full Name" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" required />
                                                <input defaultValue={TecherEmail} name="TecherEmail" placeholder="Email" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" required />
                                            </div>
                                            <input defaultValue={TutorSubject} name="subject" placeholder="TutorSubject" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <input defaultValue={TutorLocation} name="TutorLocation" placeholder="Location" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <input defaultValue={TutorerExprence} name="TutorerExprence" placeholder="Experience" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                        </div>

                                        {/* Schedule Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input name="tutorstartTime" defaultValue={tutorstartTime?.slice(0, 5)} type="time" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="tutorendTime" defaultValue={tutorendTime?.slice(0, 5)} type="time" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <input name="tutorhourlyFee" defaultValue={tutorhourlyFee} type="number" placeholder="Fee" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="totalSlots" defaultValue={totalSlots} type="number" placeholder="Slots" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="tutorstartDate" defaultValue={tutorstartDate} type="date" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            </div>
                                        </div>

                                        {/* Mode Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>
                                            <input defaultValue={tutorinstitution} name="tutorinstitution" placeholder="Institution" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            <div className="flex gap-2">
                                                {["Online", "Offline", "Both"].map((mode) => (
                                                    <label key={mode} className="flex-1 cursor-pointer">
                                                        <input type="radio" name="tutorteachingMode" value={mode} defaultChecked={tutorteachingMode === mode} className="hidden peer" />
                                                        <div className="py-2 text-center border rounded-lg text-xs transition-all peer-checked:bg-purple-500 peer-checked:text-white">
                                                            {mode}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer Buttons */}
                                        <div className="flex justify-end gap-2 pt-4 border-t">
                                            <Button variant="secondary" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={loading} className="bg-purple-600 text-white">
                                                {loading ? "Updating..." : "Update your tutor"}
                                            </Button>
                                        </div>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}
