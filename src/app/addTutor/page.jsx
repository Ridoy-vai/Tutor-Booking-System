'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const validate = (formData) => {
    const errors = {};
    const photoUrl = formData.get("photoUrl")?.trim();
    const fullName = formData.get("fullName")?.trim();
    const email = formData.get("email")?.trim();
    const subject = formData.get("subject")?.trim();
    const location = formData.get("location")?.trim();
    const experience = formData.get("experience")?.trim();
    const startTime = formData.get("startTime")?.trim();
    const endTime = formData.get("endTime")?.trim();
    const hourlyFee = formData.get("hourlyFee")?.trim();
    const totalSlots = formData.get("totalSlots")?.trim();
    const startDate = formData.get("startDate")?.trim();
    const institution = formData.get("institution")?.trim();
    const teachingMode = formData.get("teachingMode")?.trim();

    if (!fullName) {
      errors.fullName = "Name is required";
    } else if (fullName.length < 3) {
      errors.fullName = "Name must be at least 3 characters";
    }

    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))$/i;
    if (!photoUrl) {
      errors.photoUrl = "Photo URL is required";
    } else if (!urlRegex.test(photoUrl)) {
      errors.photoUrl = "Enter valid image URL (jpg/png/jpeg/webp/gif)";
    }

    if (!email) errors.email = "Email is required";
    if (!subject) errors.subject = "Subject is required";
    if (!location) errors.location = "Location is required";
    if (!experience) errors.experience = "Experience is required";
    if (!startTime) errors.startTime = "Start time is required";
    if (!endTime) errors.endTime = "End time is required";
    if (!hourlyFee) errors.hourlyFee = "Hourly fee is required";
    if (!totalSlots) errors.totalSlots = "Total slots is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!institution) errors.institution = "Institution is required";
    if (!teachingMode) errors.teachingMode = "Teaching mode is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); 
    setLoading(true);

    const { data: tokenData } = await authClient.token();
    const Newtutor = Object.fromEntries(formData.entries());

    const tutorData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      userPhoto: user?.image,
      ...Newtutor,
    };

    try {
      if (!tokenData?.token) {
        toast.error("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(tutorData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Tutor added successfully!");
        e.target.reset();
        router.push("/tutors");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to connect to server.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl w-full mt-3 mb-3 mx-auto p-6 bg-white shadow-sm rounded-xl space-y-6">
      {/* Title Section */}
      <div className="text-center md:text-left border-b pb-4">
        <h2 className="text-2xl font-extrabold text-gray-800">Post a Tutor Listing</h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below to list your tutoring services.
        </p>
      </div>

      {/* Personal Info Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Tutor Info</h3>

        {/* Photo URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Photo URL</label>
          <input name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.photoUrl ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.photoUrl && <p className="text-red-500 text-xs">{errors.photoUrl}</p>}
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Full Name</label>
            <input name="fullName" type="text" placeholder="Rahim Ahmed" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Email Address</label>
            <input name="email" type="email" placeholder="rahim@example.com" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.email ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Subject</label>
            <select name="subject" defaultValue={''} className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400">
              <option value="" className="text-gray-500">Select a subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="english">English</option>
            </select>
            {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Location</label>
            <input name="location" type="text" placeholder="Khulna, Bangladesh" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.location ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Experience</label>
          <input name="experience" type="text" placeholder="3 years teaching experience" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.experience ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
        </div>
      </div>

      {/* Schedule & Pricing Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>
        <div className="flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Availability (Start time)</label>
              <input name="startTime" type="time" placeholder="08:00 AM" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
              {(errors.startTime) && <p className="text-red-500 text-xs">Both times are required</p>}
            </div>
            <div>
              <label className="text-xs text-gray-500">Availability (End time)</label>
              <input name="endTime" type="time" placeholder="10:00 AM" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
              {(errors.endTime) && <p className="text-red-500 text-xs">Both times are required</p>}
            </div>
          </div>
          {/* {(errors.startTime || errors.endTime) && <p className="text-red-500 text-xs">Both times are required</p>} */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500">Hourly Fee (BDT)</label>
            <input name="hourlyFee" type="number" placeholder="500" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
            {errors.hourlyFee && <p className="text-red-500 text-xs">{errors.hourlyFee}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Total Slots</label>
            <input name="totalSlots" type="number" placeholder="10" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
            {errors.totalSlots && <p className="text-red-500 text-xs">{errors.totalSlots}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <input name="startDate" type="date" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
            {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
          </div>
        </div>
      </div>

      {/* Institution & Mode */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Institution</label>
            <input name="institution" type="text" placeholder="University Name" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200" />
            {errors.institution && <p className="text-red-500 text-xs">{errors.institution}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Teaching Mode</label>
            <div className="flex gap-2">
              {["Online", "Offline", "Both"].map((mode) => (
                <label key={mode} className="cursor-pointer flex-1 text-center">
                  <input type="radio" name="teachingMode" value={mode} className="hidden peer" />
                  <div className="py-2 border rounded-lg text-xs peer-checked:bg-purple-500 peer-checked:text-white transition-all">
                    {mode}
                  </div>
                </label>
              ))}
            </div>
            {errors.teachingMode && <p className="text-red-500 text-xs">{errors.teachingMode}</p>}
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-3 rounded-lg transition-all"
      >
        {loading ? "Posting..." : "Post Tuition"}
      </button>
    </form>
  );
};

export default Page;