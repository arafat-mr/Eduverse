"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InstructorSwiper = dynamic(() => import("./InstructorSwiper"), {
  ssr: false,
});

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("/coursesData/courses.json")
      .then((res) => res.json())
      .then((data) => {
        const extracted = data.categories.flatMap((cat) =>
          cat.courses.map((course) => course.instructor)
        );
        setInstructors(extracted);
      });
  }, []);

  return (
    <div
      className=" relative md:py-20 py-10 px-6 bg-cover bg-no-repeat bg-fixed mx-auto border-t border-gray-300"
      style={{ backgroundImage: "url('/mentor.jpg')" }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/50 to-black/30 " />
      <h1 className="md:text-4xl text-2xl text-blue-600 font-semibold text-center py-5">
        Meet Our Instructors
      </h1>
      <p className="md:text-center text-justify text-lg  text-gray-50  lg:max-w-1/2 mx-auto  pb-10 relative z-100">
        Learn from industry experts passionate about teaching.Guiding you with
        real-world experience and mentorship.Expert-led learning designed to
        unlock your potential.Inspiring knowledge, shaping future careers.
      </p>
      {/* Client-only Swiper */}
      {instructors.length > 0 && <InstructorSwiper instructors={instructors} />}
    </div>
  );
}
