"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBook,
  FaCalendarAlt,
  FaStar,
  FaFilter,
} from "react-icons/fa";

const AllTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`https://tutor-booking-system-server.vercel.app/tutors`, {
          cache: "no-store",
        });
        const data = await res.json();
        console.log("Fetched tutors:", data);
        if (!res.ok) {
          throw new Error(
            typeof data === "object" && data?.message
              ? data.message
              : "Failed to fetch tutors."
          );
        }
        if (!Array.isArray(data)) {
          throw new Error("Tutors API did not return JSON data.");
        }

        setTutors(data);
        setFilteredTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    let results = [...tutors];

    // Search by Name
    if (searchName.trim()) {
      results = results.filter((tutor) =>
        tutor.TecherName?.toLowerCase().includes(searchName.trim().toLowerCase())
      );
    }

    // Filter by Date Range
    if (startDate || endDate) {
      results = results.filter((tutor) => {
        const raw = tutor.tutorstartDate;
        if (!raw) return false;

        const tutorTime = new Date(raw).getTime();
        if (isNaN(tutorTime)) return false;

        const startTime = startDate
          ? new Date(startDate + 'T00:00:00').getTime()
          : -Infinity;

        const endTime = endDate
          ? new Date(endDate + 'T23:59:59').getTime()
          : Infinity;

        return tutorTime >= startTime && tutorTime <= endTime;
      });
    }

    setFilteredTutors(results);
  }, [searchName, startDate, endDate, tutors]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-6 md:py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Layout Wrapper: Header and Filter */}
        <div className="flex flex-col gap-8 mb-12">

          {/* Header Section - Moved to top for better mobile UX */}
          <div className="text-center w-full">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Find Your Perfect Tutor
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
              Explore Expert Tutors
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
              Search tutors by name and availability date to find the best tutor
              for your learning journey.
            </p>
          </div>



          {/* Filter Section */}
          <div className="w-full max-w-5xl mx-auto p-4 md:p-5">

            {/* Header */}
            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl border flex items-center justify-center">
                  <FaFilter className="text-blue-600 text-sm" />
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    Search Filters
                  </h2>

                  <p className="text-xs text-gray-500">
                    Search tutors easily
                  </p>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${showFilters
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
                  }`}
              >
                {showFilters ? "Close" : "Open"}
              </button>
            </div>

            {/* Filters */}
            <div
              className={`grid transition-all duration-500 overflow-hidden ${showFilters
                ? "grid-rows-[1fr] opacity-100 mt-5"
                : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
              <div className="overflow-hidden">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tutor Name
                    </label>

                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        placeholder="Search tutor..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date
                    </label>

                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSearchName("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="mt-5 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.03] active:scale-95 transition-all"
                >
                  Reset Filters
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-16 md:py-24 text-center shadow-sm px-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No Tutors Found
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              Try changing your search or filter options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


const TutorCard = ({ tutor }) => {
  return (
    <div className="group bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={
            tutor.TutorBaner ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt={tutor.TecherName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {tutor?.rating ? <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 shadow">
          <FaStar className="text-yellow-500 text-xs" />
          <span className="text-xs font-bold text-gray-800">{tutor?.rating}</span>
        </div> : ''}
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {tutor.TecherName}
        </h2>

        <p className="text-blue-600 font-semibold text-sm flex items-center gap-2 mb-4">
          <FaBook />
          {tutor.TutorSubject}
        </p>

        <div className="space-y-3 text-sm text-gray-500 mb-5">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-400" />
            <span>{tutor.TutorLocation}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-500" />
            <span>{tutor.tutorstartDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Hourly Fee
            </p>

            <h3 className="text-2xl font-black text-gray-900">
              ${tutor.tutorhourlyFee}
            </h3>
          </div>

          <Link href={`/tutors/${tutor._id}`}>
            <button className="bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTutorsPage;
