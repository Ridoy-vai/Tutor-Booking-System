import {
    MapPin,
    BookOpen,
    Clock,
    Star,
    ArrowRight,
    GraduationCap,
    LayoutGrid,
} from 'lucide-react';
import { readResponseBody } from '@/lib/http';
import Link from 'next/link';

const FindTutorPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/Featurstutors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const responseBody = await readResponseBody(res);
    const tutors = Array.isArray(responseBody) ? responseBody : [];

    // const limitedTutors = tutors.slice(0, 6);

     return (
        <section className="max-w-7xl mx-auto bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Available <span className="text-purple-600">Expert Tutors</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                        your educational needs. Our experienced tutors will help you achieve your goals.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <div className="h-1.5 w-20 bg-purple-600 rounded-full"></div>
                    </div>
                </div>

                {/* Tutor Cards Grid */}
                {tutors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutors.map((tutor) => (
                            <div
                                key={tutor._id}
                                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={
                                            tutor?.photoUrl ||
                                            `https://ui-avatars.com/api/?name=${tutor.fullName}&background=7c3aed&color=fff&size=512`
                                        }
                                        alt={tutor.fullName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    
                                    {/* Badges on Image */}
                                    <div className="absolute top-4 left-4">
                                        <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            {tutor.teachingMode}
                                        </span>
                                    </div>
                                    
                                    <div className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                                        ৳{tutor.hourlyFee}/hr
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                                {tutor.fullName}
                                            </h3>
                                            <p className="text-purple-600 font-semibold text-sm flex items-center gap-1.5">
                                                <BookOpen size={16} />
                                                {tutor.subject} Specialist
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md">
                                            <Star size={14} fill="currentColor" />
                                            <span className="font-bold text-xs">4.9</span>
                                        </div>
                                    </div>

                                    {/* Info List */}
                                    <div className="space-y-3.5 mt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                <GraduationCap size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Institution</p>
                                                <p className="text-sm font-semibold text-gray-700 leading-tight">{tutor.institution}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                <MapPin size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</p>
                                                <p className="text-sm font-semibold text-gray-700 leading-tight">{tutor.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                <Clock size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Availability</p>
                                                <p className="text-sm font-semibold text-gray-700 leading-tight">{tutor.startDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Experience</p>
                                        <p className="text-sm font-bold text-gray-800">{tutor.experience}</p>
                                    </div>

                                    <Link
                                        href={`/tutors/${tutor._id}`}
                                        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 hover:shadow-lg hover:shadow-purple-200"
                                    >
                                        Details
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
                        <LayoutGrid size={60} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Tutors Found</h3>
                        <p className="text-gray-500">Try adjusting your filters to find more results.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FindTutorPage;
