"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CoursesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/coursesData/courses.json")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#031043] py-10 px-6 max-w-8xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-16 text-blue-700">
        Explore Our Courses
      </h1>

      {categories.map((cat, idx) => (
        <div key={idx} className="mb-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-gray-50 border-b pb-2 border-gray-300">
            {cat.category}
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.courses.map((course, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between transition-transform duration-300"
              >
                {/* Course Image */}
                <div className="relative">
                  <img
                    src={course.courseImage}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                      <span className="font-medium">
                        {course.courseDuration}
                      </span>{" "}
                      | Classes:{" "}
                      <span className="font-medium">{course.totalClasses}</span>{" "}
                      | Hours:{" "}
                      <span className="font-medium">{course.totalHours}</span>
                    </p>

                    {/* Price */}
                    <p className="text-lg text-green-700 font-semibold">
                      TK {course.price.toLocaleString()}{" "}
                      <span className="line-through text-gray-400 ml-2">
                        TK {course.originalPrice.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/courses/${encodeURIComponent(course.title)}`}
                    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
