'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const InstructorSwiper = dynamic(() => import('./InstructorSwiper'), {
  ssr: false,
});

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch('/coursesData/courses.json')
      .then((res) => res.json())
      .then((data) => {
        const extracted = data.categories.flatMap((cat) =>
          cat.courses.map((course) => course.instructor)
        );
        setInstructors(extracted);
      });
  }, []);

  return (
    <div className="bg-gray-50 py-10 px-6 max-w-7xl mx-auto border-t border-gray-300">
      <h1 className='text-4xl text-blue-600 font-semibold text-center py-5'>Meet Our Instructors</h1>
      {/* Client-only Swiper */}
      {instructors.length > 0 && <InstructorSwiper instructors={instructors} />}
    </div>
  );
}
