"use client";

<<<<<<< HEAD
const adminLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile Management" },
  { href: "/dashboard/addcourse", label: "Add Courses" },
  { href: "/dashboard//release-module", label: "Release Module" },
  { href: "/dashboard/students", label: "Student Management" },
  { href: "/dashboard/payments", label: "Payment Management" },
  { href: "/dashboard/certificates", label: "Certificates" },
  { href: "/dashboard/my-enrollments", label: "My Enrollments" },
];
=======
import React from "react";
import AdminLayout from "../components/AdminLayout";
>>>>>>> 6122c5fd38389123355318ae810f9d13e67f0ef5

export default function DashboardLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}  