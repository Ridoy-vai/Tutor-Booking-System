'use client';

const Page = () => {
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tutor = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", tutor);

     const res = await fetch(`http://localhost:1000/tutors`, {
      method: "POST",
      headers: {  "Content-Type": "application/json" },
      body: JSON.stringify(tutor),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Tutor added successfully:", result);
        // Optionally, reset the form or show a success message
      })
      .catch((error) => {
        console.error("Error adding tutor:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl w-full mt-1 mx-auto p-6 bg-white shadow-sm rounded-xl space-y-6">
      
      {/* Personal Info Section */}
      <div className="space-y-4 ">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Personal Info</h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Photo URL</label>
          <input name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Full Name</label>
            <input name="fullName" type="text" placeholder="Rahim Ahmed" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Email Address</label>
            <input name="email" type="email" placeholder="rahim@example.com" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Subject</label>
            <select name="subject" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400">
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="english">English</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Location</label>
            <input name="location" type="text" placeholder="Khulna, Bangladesh" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Experience</label>
          <input name="experience" type="text" placeholder="3 years teaching experience" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
        </div>
      </div>

      {/* Schedule & Pricing Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Schedule & Pricing</h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Availability</label>
          <input name="availability" type="text" placeholder="Sun-Thu 5:00 PM - 8:00 PM" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Hourly Fee (BDT)</label>
            <input name="hourlyFee" type="number" placeholder="500" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Total Slots</label>
            <input name="totalSlots" type="number" placeholder="10" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Start Date</label>
            <input name="startDate" type="date" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
          </div>
        </div>
      </div>

      {/* Institution & Mode Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 border-b pb-2">Institution & Mode</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Institution</label>
            <input name="institution" type="text" placeholder="University Name" className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Teaching Mode</label>
            <div className="flex gap-2">
              <button type="button" className="flex-1 py-2 border rounded-lg text-xs hover:bg-purple-50 transition-colors">Online</button>
              <button type="button" className="flex-1 py-2 border rounded-lg text-xs hover:bg-purple-50 transition-colors">Offline</button>
              <button type="button" className="flex-1 py-2 border rounded-lg text-xs hover:bg-purple-50 transition-colors">Both</button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200"
        >
          Post Tuition
        </button>
      </div>

    </form>
  );
};

export default Page;