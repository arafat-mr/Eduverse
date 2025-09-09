


"use client";

import WithRole from "@/app/components/WithRole";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function truncateText(text, maxLength = 30) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users-management");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <button
          onClick={fetchStudents}
          className="btn btn-sm btn-outline rounded-lg border-white text-white hover:bg-white hover:text-blue-900"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <span className="loading loading-spinner text-white"></span>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-white">
          <p className="text-lg font-medium">No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-blue-950 rounded-lg shadow p-4">
          <table className="min-w-[600px] w-full text-white border-collapse border border-gray-600">
            <thead className="bg-blue-800 font-mono">
              <tr>
                <th className="p-3 border-b border-gray-600">Name</th>
                <th className="p-3 border-b border-gray-600">Email</th>
                <th className="p-3 border-b border-gray-600">Contact Number</th>
                <th className="p-3 border-b border-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-blue-900 font-mono text-sm">
                  <td className="p-3 border-b border-gray-600">{truncateText(s.name, 25)}</td>
                  <td className="p-3 border-b border-gray-600">{truncateText(s.email, 30)}</td>
                  <td className="p-3 border-b border-gray-600">{s.contactNumber || "-"}</td>
                  <td className="p-3 border-b border-gray-600">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Wrap with admin-only protection
export default WithRole(StudentsPage, ["admin"]);
