"use client";

import WithRole from "@/app/components/WithRole";
import React from "react";

function UserCoursesPage() {
  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      <p>Here you can view all the courses you are enrolled in.</p>
    </div>
  );
}

// Wrap with user-only protection
export default WithRole(UserCoursesPage, ["user"]);
