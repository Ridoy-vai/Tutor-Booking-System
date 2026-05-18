// import TutorSearch from '@/components/TutorSearch'; // আপনার path অনুযায়ী ঠিক করুন

import TutorSearch from "./TutorSearch";

const FindTutorPage = async () => {
    const res = await fetch(`http://localhost:1000/tutors`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // সবসময় fresh data পেতে
    });
    const tutors = await res.json();

    return <TutorSearch tutors={tutors} />;
};

export default FindTutorPage;