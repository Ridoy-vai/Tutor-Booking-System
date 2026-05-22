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
    
    // ভ্যালুগুলো গেট করা হচ্ছে
    const TutorBaner = formData.get("TutorBaner")?.trim();
    const TecherName = formData.get("TecherName")?.trim();
    const TecherEmail = formData.get("TecherEmail")?.trim();
    const TutorSubject = formData.get("TutorSubject");
    const TutorLocation = formData.get("TutorLocation")?.trim();
    const TutorerExprence = formData.get("TutorerExprence")?.trim();
    const startTime = formData.get("tutorstartTime");
    const endTime = formData.get("tutorendTime");
    const hourlyFee = formData.get("tutorhourlyFee");
    const totalSlots = formData.get("tutortotalSlots");
    const startDate = formData.get("tutorstartDate");
    const institution = formData.get("tutorinstitution")?.trim();
    const teachingMode = formData.get("tutorteachingMode");

    // ভ্যালিডেশন লজিক
    if (!TecherName) {
      errors.TecherName = "Name is required";
    } else if (TecherName.length < 3) {
      errors.TecherName = "Name must be at least 3 characters";
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (!TutorBaner) {
      errors.TutorBaner = "Photo URL is required";
    } else if (!urlRegex.test(TutorBaner)) {
      errors.TutorBaner = "Enter a valid image URL";
    }

    if (!TecherEmail) errors.TecherEmail = "Email is required";
    if (!TutorSubject) errors.TutorSubject = "Subject is required";
    if (!TutorLocation) errors.TutorLocation = "Location is required";
    if (!TutorerExprence) errors.TutorerExprence = "Experience is required";
    if (!startTime) errors["tutorstartTime"] = "Start time is required";
    if (!endTime) errors["tutorendTime"] = "End time is required";
    if (!hourlyFee) errors["tutorhourlyFee"] = "Hourly fee is required";
    if (!totalSlots) errors["tutortotalSlots"] = "Total slots is required";
    if (!startDate) errors["tutorstartDate"] = "Start date is required";
    if (!institution) errors["tutorinstitution"] = "Institution is required";
    if (!teachingMode) errors["tutorteachingMode"] = "Teaching mode is required";

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
      <div className="text-center md:text-left border-b pb-4">
        <h2 className="text-2xl font-extrabold text-gray-800">Post a Tutor Listing</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below to list your tutoring services.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Tutor Info</h3>

        {/* Photo URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Photo URL</label>
          <input name="TutorBaner" type="url" placeholder="https://example.com/photo.jpg" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TutorBaner ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.TutorBaner && <p className="text-red-500 text-xs">{errors.TutorBaner}</p>}
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Teacher Full Name</label>
            <input name="TecherName" type="text" placeholder="Rahim Ahmed" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TecherName ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.TecherName && <p className="text-red-500 text-xs">{errors.TecherName}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Teacher Email Address</label>
            <input name="TecherEmail" type="email" placeholder="rahim@example.com" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TecherEmail ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.TecherEmail && <p className="text-red-500 text-xs">{errors.TecherEmail}</p>}
          </div>
        </div>

        {/* Subject & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Subject</label>
            <select name="TutorSubject" defaultValue={''} className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TutorSubject ? 'border-red-500' : 'border-gray-200'}`}>
              <option value="" className="text-gray-500">Select a subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="english">English</option>
            </select>
            {errors.TutorSubject && <p className="text-red-500 text-xs">{errors.TutorSubject}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Location</label>
            <input name="TutorLocation" type="text" placeholder="Khulna, Bangladesh" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TutorLocation ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.TutorLocation && <p className="text-red-500 text-xs">{errors.TutorLocation}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Experience</label>
          <input name="TutorerExprence" type="text" placeholder="3 years teaching experience" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors.TutorerExprence ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.TutorerExprence && <p className="text-red-500 text-xs">{errors.TutorerExprence}</p>}
        </div>
      </div>

      {/* Schedule & Pricing Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Tutor (Start time)</label>
            <input name="tutorstartTime" type="time" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutor-startTime"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutorstartTime"] && <p className="text-red-500 text-xs">{errors["tutorstartTime"]}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Tutor (End time)</label>
            <input name="tutorendTime" type="time" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutor-endTime"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutorendTime"] && <p className="text-red-500 text-xs">{errors["tutorendTime"]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500">Hourly Fee (USD)</label>
            <input name="tutorhourlyFee" type="number" placeholder="$ 100" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutorhourlyFee"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutor-hourlyFee"] && <p className="text-red-500 text-xs">{errors["tutorhourlyFee"]}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Total Slots</label>
            <input name="tutortotalSlots" type="number" placeholder="10" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutortotalSlots"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutortotalSlots"] && <p className="text-red-500 text-xs">{errors["tutor-totalSlots"]}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Tutor Start Date</label>
            <input name="tutorstartDate" type="date" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutorstartDate"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutor-startDate"] && <p className="text-red-500 text-xs">{errors["tutorstartDate"]}</p>}
          </div>
        </div>
      </div>

      {/* Institution & Mode */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500">Institution</label>
            <input name="tutorinstitution" type="text" placeholder="University Name" className={`w-full text-sm px-3 py-2 rounded-lg border outline-none focus:border-purple-400 ${errors["tutor-institution"] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors["tutorinstitution"] && <p className="text-red-500 text-xs">{errors["tutorinstitution"]}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Teaching Mode</label>
            <div className="flex gap-2">
              {["Online", "Offline", "Both"].map((mode) => (
                <label key={mode} className="cursor-pointer flex-1 text-center">
                  <input type="radio" name="tutorteachingMode" value={mode} className="hidden peer" />
                  <div className="py-2 border rounded-lg text-xs peer-checked:bg-purple-500 peer-checked:text-white transition-all">
                    {mode}
                  </div>
                </label>
              ))}
            </div>
            {errors["tutorteachingMode"] && <p className="text-red-500 text-xs">{errors["tutorteachingMode"]}</p>}
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