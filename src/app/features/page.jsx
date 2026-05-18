'use client';
import React from 'react';
import { 
  MapPin, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  Star, 
  ArrowRight, 
  BookOpen,
  Monitor
} from 'lucide-react';
import Link from 'next/link';

const tutors = [
  {
    "_id": "6a0a8603a2f0fea39c7b2a42",
    "photoUrl": "https://randomuser.me/api/portraits/men/1.jpg",
    "fullName": "Rahim Ahmed",
    "email": "rahim.ahmed@example.com",
    "subject": "Mathematics",
    "location": "Mirpur, Dhaka",
    "experience": "3 years experience",
    "availability": "Sun, Tue, Thu (5-8 PM)",
    "hourlyFee": 500,
    "totalSlots": 5,
    "startDate": "2024-05-20",
    "institution": "BUET",
    "teachingMode": "Both"
  },
  {
    "_id": "6a0a8603a2f0fea39c7b2a43",
    "photoUrl": "https://randomuser.me/api/portraits/women/2.jpg",
    "fullName": "Sumaiya Akhter",
    "email": "sumaiya.edu@example.com",
    "subject": "English",
    "location": "Chawkbazar, Ctg",
    "experience": "5 years experience",
    "availability": "Mon, Wed, Sat (4-6 PM)",
    "hourlyFee": 800,
    "totalSlots": 3,
    "startDate": "2024-06-01",
    "institution": "Dhaka University",
    "teachingMode": "Online"
  },
  {
    "_id": "6a0a8603a2f0fea39c7b2a44",
    "photoUrl": "https://randomuser.me/api/portraits/men/3.jpg",
    "fullName": "Tanvir Hasan",
    "email": "tanvir.phy@example.com",
    "subject": "Physics",
    "location": "Khulna City",
    "experience": "2 years experience",
    "availability": "Everyday (7-9 PM)",
    "hourlyFee": 400,
    "totalSlots": 10,
    "startDate": "2024-05-25",
    "institution": "KUET",
    "teachingMode": "Offline"
  },
  {
    "_id": "6a0a8603a2f0fea39c7b2a45",
    "photoUrl": "https://randomuser.me/api/portraits/women/4.jpg",
    "fullName": "Nusrat Jahan",
    "email": "nusrat.chem@example.com",
    "subject": "Chemistry",
    "location": "Rajshahi Sadar",
    "experience": "4 years experience",
    "availability": "Fri, Sat (10 AM-1 PM)",
    "hourlyFee": 600,
    "totalSlots": 4,
    "startDate": "2024-06-05",
    "institution": "Rajshahi University",
    "teachingMode": "Both"
  },
  {
    "_id": "6a0a8603a2f0fea39c7b2a46",
    "photoUrl": "https://randomuser.me/api/portraits/men/5.jpg",
    "fullName": "Arifur Rahman",
    "email": "arif.ict@example.com",
    "subject": "ICT",
    "location": "Uttara, Dhaka",
    "experience": "1 year experience",
    "availability": "Sun to Thu (8-10 PM)",
    "hourlyFee": 1000,
    "totalSlots": 2,
    "startDate": "2024-05-15",
    "institution": "NSU",
    "teachingMode": "Online"
  },
  {
    "_id": "6a0a8603a2f0fea39c7b2a47",
    "photoUrl": "https://randomuser.me/api/portraits/women/8.jpg",
    "fullName": "Farhana Islam",
    "email": "farhana.bio@example.com",
    "subject": "Biology",
    "location": "Sylhet City",
    "experience": "3 years experience",
    "availability": "Mon, Wed (5-7 PM)",
    "hourlyFee": 450,
    "totalSlots": 6,
    "startDate": "2024-05-30",
    "institution": "Sylhet Medical",
    "teachingMode": "Offline"
  }
];

const TutorCard = ({ tutor }) => (
  <div className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
    {/* Image & Badge */}
    <div className="relative p-3">
      <div className="relative h-56 w-full overflow-hidden rounded-[1.8rem]">
        <img 
          src={tutor.photoUrl} 
          alt={tutor.fullName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{tutor.teachingMode}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
          ৳{tutor.hourlyFee}/hr
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="px-6 pb-6 pt-2">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{tutor.fullName}</h3>
        <div className="flex items-center gap-1 text-orange-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold">4.9</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-4">
        <BookOpen size={16} />
        <span>{tutor.subject} Specialist</span>
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <GraduationCap size={18} className="text-gray-400" />
          <span className="truncate">{tutor.institution}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <MapPin size={18} className="text-gray-400" />
          <span>{tutor.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <Clock size={18} className="text-gray-400" />
          <span className="truncate">{tutor.availability}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 pt-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Experience</span>
          <span className="text-sm font-bold text-gray-700">{tutor.experience}</span>
        </div>
        <Link 
          href={`/tutors/${tutor._id}`}
          className="p-2.5 bg-gray-50 hover:bg-purple-600 text-purple-600 hover:text-white rounded-xl transition-colors group/btn"
        >
          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-purple-600 font-bold uppercase tracking-[0.2em] text-sm mb-3">Expert Educators</h2>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Our Featured Tutors
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Find the perfect mentor to help you master your subjects with personalized 1-on-1 sessions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/tutors"
            className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all shadow-md active:scale-95"
          >
            Explore More Tutors <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;