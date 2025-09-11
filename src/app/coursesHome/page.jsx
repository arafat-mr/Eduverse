"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function CoursesHome() {
  const [courses, setCourses] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    fetch("/api/courses-data")
      .then((res) => res.json())
      .then((data) => {
        const allCourses = data[0].categories.flatMap((cat) => cat.courses);
        setCourses(allCourses.slice(0, 6));
        setLoadingState(false);
      })
      .catch((err) => console.error(err));
  }, []);
  if (loadingState) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden py-10 px-6">
      <div className=" max-w-11/12 mx-auto ">
        <div className="relative">
          {/* Background watermark text */}
          <h2 className="absolute inset-0 flex pt-5 items-center justify-center text-7xl font-extrabold text-gray-400 opacity-20 select-none">
            Featured Courses
          </h2>
          <h1 className="text-4xl font-bold text-center   text-blue-700 py-5">
            Featured Courses
          </h1>
        </div>
        <p className="md:text-center text-justify text-lg  text-gray-500  lg:max-w-1/2 mx-auto  pb-10 ">
          Explore our most popular and trending courses.Learn from top
          instructors with real-world expertise.Curated learning paths designed
          for your success.Level up your knowledge with our best courses
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            // card
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                // rotate: 1, // small tilt
                boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white hover:cursor-pointer  rounded-3xl overflow-hidden flex flex-col justify-between transition-transform duration-1000"
              style={{
                boxShadow: "3px 10px 200px 200px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.5s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 10px 30px 30px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 5px 20px 20px rgba(0,0,0,0.1)";
              }}
            >
              <div className="relative">
                <img
                  src={course.courseImage}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {course.discount} Off
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-primary hover:text-blue-700 transition">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {course.courseIntroduction}
                  </p>

                  <p className="text-sm text-gray-500 mb-1">
                    Duration:{" "}
                    <span className="font-medium">{course.courseDuration}</span>{" "}
                    | Classes:{" "}
                    <span className="font-medium">{course.totalClasses}</span> |
                    Hours:{" "}
                    <span className="font-medium">{course.totalHours}</span>
                  </p>

                  <p className="text-lg text-green-700 font-semibold">
                    TK {course.price.toLocaleString()}{" "}
                    <span className="line-through text-gray-400 ml-2">
                      TK {course.originalPrice.toLocaleString()}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/courses/${encodeURIComponent(course.title)}`}
                  className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-semibold  hover:bg-blue-700 transition "
                >
                  Details Info
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-24">
          <Link
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore More Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
