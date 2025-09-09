"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook, FaUsers, FaMoneyBillWave, FaCertificate, FaClipboardList, FaQuestion
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    certificates: 0,
    courses: 0,
    quizzes: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const role = session?.user?.role || "user";

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const email = session.user.email.trim().toLowerCase();

        if (role === "admin") {
          // Fetch all admin stats together
          const [coursesRes, revenueRes, usersRes] = await Promise.all([
            fetch("/api/admin/total-courses"),
            fetch("/api/admin/total-revenue"),
            fetch("/api/admin/users"),
          ]);

          const coursesData = coursesRes.ok ? await coursesRes.json() : { totalCourses: 0 };
          const revenueData = revenueRes.ok ? await revenueRes.json() : { totalRevenue: 0 };
          const usersData = usersRes.ok ? await usersRes.json() : { totalUsers: 0 };

          setStats({
            totalCourses: coursesData.totalCourses || 0,
            totalRevenue: revenueData.totalRevenue || 0,
            totalUsers: usersData.totalUsers || 0,
            certificates: stats.certificates, // keep user fields intact
            courses: stats.courses,
            quizzes: stats.quizzes,
          });
        } else {
          // Fetch user-specific stats
          const [certRes, courseRes, quizRes] = await Promise.all([
            fetch(`/api/user/certificates?email=${email}`),
            fetch(`/api/user/courses?email=${email}`),
            fetch(`/api/user/quizzes?email=${email}`),
          ]);

          const certData = certRes.ok ? await certRes.json() : { totalCertificates: 0 };
          const courseData = courseRes.ok ? await courseRes.json() : { totalCourses: 0 };
          const quizData = quizRes.ok ? await quizRes.json() : { totalQuizzes: 0 };

          setStats({
            certificates: certData.totalCertificates || 0,
            courses: courseData.totalCourses || 0,
            quizzes: quizData.totalQuizzes || 0,
            totalCourses: stats.totalCourses,
            totalRevenue: stats.totalRevenue,
            totalUsers: stats.totalUsers,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session, status, role]);

  const cardData = role === "admin"
    ? [
        { title: "Total Courses", value: stats.totalCourses, gradient: "from-indigo-500 to-blue-600", icon: <FaBook size={28} /> },
        { title: "Total Revenue", value: `${stats.totalRevenue.toLocaleString()} BDT`, gradient: "from-green-500 to-emerald-600", icon: <FaMoneyBillWave size={28} /> },
        { title: "Total Users", value: stats.totalUsers, gradient: "from-pink-500 to-rose-600", icon: <FaUsers size={28} /> },
      ]
    : [
        { title: "My Certificates", value: stats.certificates, gradient: "from-purple-500 to-fuchsia-600", icon: <FaCertificate size={28} /> },
        { title: "My Courses", value: stats.courses, gradient: "from-cyan-500 to-blue-600", icon: <FaClipboardList size={28} /> },
        { title: "Total Quizzes", value: stats.quizzes, gradient: "from-yellow-500 to-orange-600", icon: <FaQuestion size={28} /> },
      ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, type: "spring", stiffness: 120 } }),
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen text-white flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {role === "admin" ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {cardData.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`p-6 rounded-xl shadow-lg bg-gradient-to-r ${card.gradient} flex flex-col sm:flex-col lg:flex-row items-start sm:items-center gap-4 break-words`}
            >
              <div className="text-white">{card.icon}</div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">{card.title}</h2>
                <p className="text-2xl sm:text-3xl mt-1 sm:mt-2 font-bold">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
