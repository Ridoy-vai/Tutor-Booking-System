import React from 'react';
import CourseCard from './TutorCard';

const tutors = async () => {

    const res = await fetch(`http://localhost:1000/tutors`, {
      method: "GET",
      headers: {  "Content-Type": "application/json" }, 
    });
    const tutors = await res.json();
    return (
        <div className='grid grid-cols-4 gap-4 max-w-7xl mx-auto'>
            <CourseCard tutors={tutors} />
        </div>
    );
};

export default tutors;