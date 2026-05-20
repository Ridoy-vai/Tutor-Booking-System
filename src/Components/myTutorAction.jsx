"use client";

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

    const { email, endTime, experience, fullName, hourlyFee, institution, location, photoUrl, startDate, startTime, subject, teachingMode, totalSlots, } = item || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const dataUpdate = Object.fromEntries(formData.entries());

        const updateData = {
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userPhoto: user?.image,
            ...dataUpdate,
        };

        try {
            const res = await fetch(
                `http://localhost:1000/tutors/${userId}/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData),
                }
            );

            if (res.ok) {
                const fetchData = await res.json();

                router.refresh();

                setIsOpen(false);

                toast.success("Updated successfully!");
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
                                            <input defaultValue={photoUrl} name="photoUrl" placeholder="Photo URL" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input defaultValue={fullName} name="fullName" placeholder="Full Name" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" required />
                                                <input defaultValue={email} name="email" placeholder="Email" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" required />
                                            </div>
                                            <input defaultValue={subject} name="subject" placeholder="Subject" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <input defaultValue={location} name="location" placeholder="Location" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                            <input defaultValue={experience} name="experience" placeholder="Experience" className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:border-purple-400" />
                                        </div>

                                        {/* Schedule Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input name="startTime" defaultValue={startTime?.slice(0, 5)} type="time" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="endTime" defaultValue={endTime?.slice(0, 5)} type="time" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <input name="hourlyFee" defaultValue={hourlyFee} type="number" placeholder="Fee" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="totalSlots" defaultValue={totalSlots} type="number" placeholder="Slots" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                                <input name="startDate" defaultValue={startDate} type="date" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            </div>
                                        </div>

                                        {/* Mode Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>
                                            <input defaultValue={institution} name="institution" placeholder="Institution" className="w-full text-sm px-3 py-2 border rounded-lg outline-none" />
                                            <div className="flex gap-2">
                                                {["Online", "Offline", "Both"].map((mode) => (
                                                    <label key={mode} className="flex-1 cursor-pointer">
                                                        <input type="radio" name="teachingMode" value={mode} defaultChecked={teachingMode === mode} className="hidden peer" />
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