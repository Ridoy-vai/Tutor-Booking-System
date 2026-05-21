import React from 'react';
import { LayoutGrid, Sparkles } from 'lucide-react';
import TutorList from './TutorList';
// import TutorList from '@/components/TutorList'; 
const FindTutorPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/Featurstutors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const responseBody = await res.json();
    const tutors = Array.isArray(responseBody) ? responseBody : [];

    return (
        <section className="relative w-full bg-[#fdfdff] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* হেডার সেকশন */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[11px] font-black mb-6 border border-purple-100 shadow-sm uppercase tracking-[0.2em]">
                        <Sparkles size={14} />
                        <span>Premium Learning</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Expert Tutors</span>
                    </h2>
                    
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Find the perfect mentor to guide your educational journey. Our verified experts are ready to help you excel in your studies.
                    </p>
                </div>

                {/* টিউটর গ্রিড (অ্যানিমেটেড ক্লায়েন্ট কম্পোনেন্ট) */}
                {tutors.length > 0 ? (
                    <TutorList tutors={tutors} />
                ) : (
                    /* এম্পটি স্টেট */
                    <div className="bg-white rounded-[3rem] border-2 border-dashed border-gray-100 py-24 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LayoutGrid size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Tutors Found</h3>
                        <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FindTutorPage;