"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/courses-data")
      .then((res) => res.json())
      .then((data) => setCategories(data[0]?.categories || []))
      .catch((err) => console.error(err));
  }, []);

  // Filter courses by search term (case-insensitive)
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    courses: cat.courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6 max-w-8xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        Explore Our Courses
      </h1>

      {/* 🔍 Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search courses by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-primary bg-blue-200 border-2 border-primary"
        />
      </div>

      {filteredCategories.map((cat, idx) => (
        <div key={idx} className="mb-16 max-w-7xl mx-auto">
          {cat.courses.length > 0 && (
            <>
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
                      <span className="absolute top-3 right-3 bg-green-800 font-bold text-white px-3 py-1 rounded-full text-sm ">
                        {course.discount} Off
                      </span>
                    </div>

                    {/* Course Details */}
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
                          <span className="font-medium">
                            {course.totalClasses}
                          </span>{" "}
                          | Hours:{" "}
                          <span className="font-medium">
                            {course.totalHours}
                          </span>
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
                        className="mt-5 px-4 py-2 bg-accent text-white rounded-lg text-center font-medium hover:bg-blue-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {/* If no course matches */}
      {filteredCategories.every((cat) => cat.courses.length === 0) && (
        <p className="text-center text-gray-300 text-xl mt-10">
          No courses found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}
