// components/CourseCard.jsx
import React from 'react';
import {
  Book,
  Calendar,
  Clock,
  GraduationCap,
  SquareGanttChart,
} from 'lucide-react';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#1e1c31] rounded-xl shadow-lg overflow-hidden border border-[#2e2b4f] mb-6">
      {/* Course Image */}
      <div className="w-full md:w-2/5 h-48 md:h-64 overflow-hidden flex-shrink-0">
        <img
          src={course.courseImage}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Info and Buttons */}
      <div className="w-full md:w-3/5 p-6 flex flex-col justify-between text-white">
        <div>
          <h2 className="text-xl font-bold mb-1">{course.title}</h2>
          <p className="text-sm text-gray-400 mb-4">
            {course.instructor.name} - {course.instructor.designation}
          </p>
        </div>

        {/* Course Overview section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-gray-200 shadow-inner">
          <h3 className="text-base font-bold mb-2 text-gray-50">
            Course Overview
          </h3>
          <div className="flex flex-wrap items-center space-x-4 mb-2 text-xs font-medium text-gray-400">
            <span className="flex items-center space-x-1">
              <Book size={16} />
              <span>Total Classes: {course.totalClasses}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Duration: {course.courseDuration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock size={16} />
              <span>Weekly Classes: {course.weeklyClasses}</span>
            </span>
            <span className="flex items-center space-x-1">
              <GraduationCap size={16} />
              <span>Total Hours: {course.totalHours}</span>
            </span>
            <span className="flex items-center space-x-1">
              <SquareGanttChart size={16} />
              <span>Projects: {course.project}</span>
            </span>
          </div>
          {/* You can add a short description here if available in your course data */}
          {/* <p className="text-gray-300 text-sm">
            {course.description}
          </p> */}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
          <button className="flex-1 text-center py-2 px-4 rounded-full font-semibold bg-[#7d41f0] hover:bg-[#6a36d2]">
            <Link
              href={`/dashboard/continue-course/${encodeURIComponent(
                course.title
              )}?course=${encodeURIComponent(JSON.stringify(course))}`}
            >
              Continue Course
            </Link>
          </button>
          <button className="flex-1 text-center py-2 px-4 rounded-full font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            <Link href={`/courses/${encodeURIComponent(course.title)}`}>
              View Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
