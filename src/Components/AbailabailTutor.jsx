// import TutorSearch from '@/components/TutorSearch';

import TutorSearch from "./TutorSearch";

const FindTutorPage = async () => {
    const res = await fetch(`http://localhost:1000/tutors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const tutors = await res.json();

    const limitedTutors = tutors.slice(0, 6);

    return <TutorSearch tutors={limitedTutors} />;
};

export default FindTutorPage;