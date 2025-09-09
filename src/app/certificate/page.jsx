"use client";

import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function CertificateButtonClient({ courseName = "MERN Stack Bootcamp" }) {
  const user = useAuth(); // full user object
  const [loading, setLoading] = useState(false);

  if (!user) return null; // hide if not logged in

  const applyCertificate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          courseName,
          status: "pending",
          issuedAt: null,
          appliedAt: new Date().toISOString(),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        const text = await res.text();
        throw new Error("Invalid JSON response: " + text);
      }

      if (!res.ok) throw new Error(data.error || "Something went wrong");
      alert("✅ Certificate requested successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-secondary p-2">
      <div className="max-w-md w-full p-6 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-600 rounded-xl shadow-2xl text-white space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-200">{user.email}</p>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4 bg-purple-900 rounded-lg">
          <h3 className="font-semibold text-lg">Course:</h3>
          <p>{courseName}</p>
          <p className="text-sm mt-2">
            Applying Date: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={applyCertificate}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? <span className="loading loading-spinner text-primary"></span> : "Apply for Certificate"}
        </button>
      </div>
    </div>
  );
}
