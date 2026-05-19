"use client";

// import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export function EaditMybooking({ id, user, item }) {
    const userId = user?.id;
    // console.log("Received ID in modal:", id);
    // console.log("Received User ID in modal:", user?.id);

    // const res =  fetch(`http://localhost:1000/tutors/${userId}/${id}`)
    // const fetchData =  res.json();
    // console.log("Fetched data for editing:", fetchData);
    const {
        email,
        endTime,
        experience,
        fullName,
        hourlyFee,
        institution,
        location,
        photoUrl,
        startDate,
        startTime,
        subject,
        teachingMode,
        totalSlots,
        userEmail,
        userName,
        userPhoto,
        _id,
    } = item || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataUpdate = Object.fromEntries(formData.entries());

        const updateData = {
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userPhoto: user?.image,

            ...dataUpdate, 
        };
        console.log("Form submitted with data:", updateData);

        const res = await fetch(`http://localhost:1000/tutors/${userId}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        });
        const fetchData = await res.json();
        console.log("Fetched data for editing:", fetchData);
    
    }
    return (
        <Modal>
            <Button variant="secondary">Eadit</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Contact Us</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we'll get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="max-w-6xl w-full mt-1 mx-auto p-6 bg-white shadow-sm rounded-xl space-y-6">

                                    {/* Personal Info Section */}
                                    <div className="space-y-4 ">
                                        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Personal Info</h3>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs text-gray-500">Photo URL</label>
                                            <input defaultValue={photoUrl} name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Full Name</label>
                                                <input defaultValue={fullName} name="fullName" type="text" placeholder="Rahim Ahmed" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" required />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Email Address</label>
                                                <input defaultValue={email} name="email" type="email" placeholder="rahim@example.com" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Subject</label>
                                                <select defaultValue={subject} name="subject" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400">
                                                    <option value="mathematics">Mathematics</option>
                                                    <option value="physics">Physics</option>
                                                    <option value="chemistry">Chemistry</option>
                                                    <option value="english">English</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Location</label>
                                                <input defaultValue={location} name="location" type="text" placeholder="Khulna, Bangladesh" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs text-gray-500">Experience</label>
                                            <input defaultValue={experience} name="experience" type="text" placeholder="3 years teaching experience" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                        </div>
                                    </div>

                                    {/* Schedule & Pricing Section */}
                                    <div className="space-y-4 pt-4">
                                        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs text-gray-500">Availability</label>

                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    name="startTime"
                                                    type="time"
                                                    className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400"
                                                />

                                                <input
                                                    name="endTime"
                                                    type="time"
                                                    className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Hourly Fee (BDT)</label>
                                                <input defaultValue={hourlyFee} name="hourlyFee" type="number" placeholder="500" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Total Slots</label>
                                                <input defaultValue={totalSlots} name="totalSlots" type="number" placeholder="10" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Start Date</label>
                                                <input defaultValue={startDate} name="startDate" type="date" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Institution & Mode Section */}
                                    <div className="space-y-4 pt-4">
                                        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Institution</label>
                                                <input defaultValue={institution} name="institution" type="text" placeholder="University Name" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs text-gray-500">Teaching Mode</label>

                                                <div className="flex gap-2">
                                                    <label defaultValue={teachingMode} className="cursor-pointer flex-1">
                                                        <input
                                                            type="radio"
                                                            name="teachingMode"
                                                            value="Online"
                                                            className="hidden peer"
                                                        />
                                                        <div className="py-2 text-center border rounded-lg text-xs transition-all peer-checked:bg-purple-500 peer-checked:text-white peer-checked:border-purple-500 hover:bg-purple-50 hover:text-black">
                                                            Online
                                                        </div>
                                                    </label>

                                                    <label defaultValue={teachingMode} className="cursor-pointer flex-1">
                                                        <input
                                                            type="radio"
                                                            name="teachingMode"
                                                            value="Offline"
                                                            className="hidden peer"
                                                        />
                                                        <div className="py-2 text-center border rounded-lg text-xs transition-all peer-checked:bg-purple-500 peer-checked:text-white peer-checked:border-purple-500 hover:bg-purple-50 hover:text-black">
                                                            Offline
                                                        </div>
                                                    </label>

                                                    <label defaultValue={teachingMode} className="cursor-pointer flex-1">
                                                        <input
                                                            type="radio"
                                                            name="teachingMode"
                                                            value="Both"
                                                            className="hidden peer"
                                                        />
                                                        <div className="py-2 text-center border rounded-lg text-xs transition-all peer-checked:bg-purple-500 peer-checked:text-white peer-checked:border-purple-500 hover:bg-purple-50 hover:text-black">
                                                            Both
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-6">
                                        <Modal.Footer>
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button type="submit">Send Message</Button>
                                        </Modal.Footer>
                                    </div>

                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}