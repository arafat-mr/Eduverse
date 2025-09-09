"use client";

import WithRole from "@/app/components/WithRole";
import React from "react";

function UserQuizzesPage() {
  return (
    <div className="min-h-screen p-6  text-white">
      <h1 className="text-2xl font-bold mb-4">My Quizzes</h1>
      <p>Here you can view and attempt all your quizzes.</p>
    </div>
  );
}

// Wrap with user-only protection
export default WithRole(UserQuizzesPage, ["user"]);
