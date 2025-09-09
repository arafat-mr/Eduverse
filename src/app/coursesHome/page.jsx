'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CoursesHome() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses-data')
      .then((res) => res.json())
      .then((data) => {
        const allCourses = data[0].categories.flatMap((cat) => cat.courses);
        setCourses(allCourses.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(courses);
  return (
    <div className="bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-primary">
          Featured Courses
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between transition-transform duration-300"
            >
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
                    Duration:{' '}
                    <span className="font-medium">{course.courseDuration}</span>{' '}
                    | Classes:{' '}
                    <span className="font-medium">{course.totalClasses}</span> |
                    Hours:{' '}
                    <span className="font-medium">{course.totalHours}</span>
                  </p>

                  <p className="text-lg text-green-700 font-semibold">
                    TK {course.price.toLocaleString()}{' '}
                    <span className="line-through text-gray-400 ml-2">
                      TK {course.originalPrice.toLocaleString()}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/courses/${encodeURIComponent(course.title)}`}
                  className="mt-5 px-4 py-2 bg-accent text-white rounded-lg text-center font-bold hover:bg-primary transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
