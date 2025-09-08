"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaChalkboardTeacher,
  FaClock,
  FaCalendarAlt,
  FaHourglassHalf,
  FaProjectDiagram,
} from "react-icons/fa";

import useAuth from "@/app/hooks/useAuth";
import { setCookie } from "cookies-next";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    fetch("/coursesData/courses.json")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!slug || categories.length === 0) return;
    for (let cat of categories) {
      const found = cat.courses.find(
        (c) => encodeURIComponent(c.title) === slug
      );
      if (found) {
        setCourse(found);
        break;
      }
    }
  }, [slug, categories]);

  if (!course)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  const tabs = [
    "Curriculum",
    "Software Used",
    "Designed For",
    "Career Opportunities",
    "Open Job Positions",
    "Exclusive Solutions",
    "Projects",
  ];

  const tabContent = {
    Curriculum: course.courseOverview.curriculum,
    "Software Used": course.courseOverview.softwareYouWillUse,
    "Designed For": course.courseOverview.designedFor,
    "Career Opportunities": course.courseOverview.careerOpportunities,
    "Open Job Positions": course.courseOverview.openJobPositions,
    "Exclusive Solutions": course.courseOverview.exclusiveSolutions,
    Projects: `Total Projects: ${course.projectCount || 1}\nProject: ${
      course.project
    }`,
  };
  const handlePay = () => {
    console.log("hanldle pay");
    // Save payment data in a cookie (secure storage)
    setCookie(
      "paymentData",
      JSON.stringify({
        amount: course.price.toLocaleString(),
        cus_name: user?.name,
        cus_email: user?.email,
        course_name: course.title,
      })
    );

    // Redirect to payment page
    router.push("/payment");
  };
  return (
    <div className="min-h-screen bg-[#031043] py-10 px-6 max-w-8xl mx-auto">

      <button
        onClick={() => router.back()}
        className="mb-6 inline-block text-blue-600 hover:underline font-medium"
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0C1B54] shadow-2xl rounded-3xl p-8 grid md:grid-cols-3 gap-10"
      >
        {/* Left Column */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Course Image */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={course.courseImage || "/default-course.png"}
              alt={course.title}
              className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* Payment Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-gray-50 shadow-xl flex flex-col gap-3">
            <p className="text-lg font-semibold">
              Price:{" "}
              <span className="text-3xl font-bold">
                TK {course.price.toLocaleString()}
              </span>
            </p>
            <p className="line-through text-gray-200">
              Original: TK {course.originalPrice.toLocaleString()} (
              {course.discount} Off)
            </p>
            <button
              onClick={handlePay}
              className="mt-2 w-full bg-white text-blue-700 font-semibold py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Enroll Now
            </button>
          </div>

          {/* Instructor Info */}
          <div className="bg-gray-100 p-5 rounded-2xl shadow-inner">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">
              Instructor
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={course.instructor.profileImage}
                alt={course.instructor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <p className="font-bold text-gray-900">
                  {course.instructor.name}
                </p>
                <p className="text-sm text-gray-500">
                  {course.instructor.designation}
                </p>
                <p className="text-sm text-gray-600">
                  {course.instructor.experience}
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-sm">
              {course.instructor.bio}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-blue-600">{course.title}</h1>
          <p className="text-gray-50 text-lg">{course.courseIntroduction}</p>

          {/* Course Overview */}
          <div className="bg-gray-50 p-5 rounded-2xl shadow-inner text-gray-700 text-base">
            <p className="mb-5 font-semibold text-lg">Course Overview</p>

            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-600" />
                <span>
                  Total Classes: <strong>{course.totalClasses}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                <span>
                  Duration: <strong>{course.courseDuration}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-600" />
                <span>
                  Weekly Classes: <strong>{course.weeklyClasses}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaHourglassHalf className="text-purple-600" />
                <span>
                  Total Hours: <strong>{course.totalHours}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaProjectDiagram className="text-red-600" />
                <span>
                  Project: <strong>{course.projectCount || 1}</strong>
                </span>
              </div>
            </div>

            <p className="mt-4">{course.courseOverview.brief}</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-2xl border font-medium transition whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-6 rounded-2xl shadow-inner text-gray-700 text-base"
          >
            {course.courseOverview.tabs[activeTab] ? (
              Array.isArray(course.courseOverview.tabs[activeTab]) ? (
                <ul className="list-disc ml-5 space-y-1">
                  {course.courseOverview.tabs[activeTab].map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{course.courseOverview.tabs[activeTab]}</p>
              )
            ) : (
              <p>No information available.</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
