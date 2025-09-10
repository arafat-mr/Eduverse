"use client";

import WithRole from "@/app/components/WithRole";
import React, { useEffect, useState } from "react";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

function UserCertificatesPage() {
  const user = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/userCertificates?email=${user.email}`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to fetch certificates");
      setCertificates(data.certificates);
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [user?.email]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <button
          onClick={fetchCertificates}
          className="btn btn-sm btn-outline rounded-lg border-white text-white hover:bg-white hover:text-blue-900"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <span className="loading loading-spinner text-white"></span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-white">
          <p className="text-lg font-medium">
            You have not received any certificates yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-blue-950 rounded-lg shadow p-4">
          <table className="min-w-[600px] w-full text-white border-collapse border border-gray-600">
            <thead className="bg-blue-800 font-mono">
              <tr>
                <th className="p-3 border-b border-gray-600">Course</th>
                <th className="p-3 border-b border-gray-600">Status</th>
                <th className="p-3 border-b border-gray-600">Applied At</th>
                <th className="p-3 border-b border-gray-600">Issued At</th>
                <th className="p-3 border-b border-gray-600">Certificate ID</th>
                <th className="p-3 border-b border-gray-600">Action</th>
              </tr>
            </thead>
        <tbody>
  {certificates.map((c) => {
    const status = c.status?.toLowerCase();
    const isPending = status === "pending";
    const isIssued = status === "issued";

    return (
      <tr key={c._id} className="hover:bg-blue-900 font-mono text-sm">
        {/* Course */}
        <td className="p-3 border-b border-gray-600">
          {c.courseName || c.courseTitle || "—"}
        </td>

        {/* Status */}
        <td className="p-3 border-b border-gray-600">
          {isPending && (
            <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
              Pending
            </span>
          )}
          {isIssued && (
            <span className="bg-green-300 text-green-900 px-2 py-1 rounded-full text-xs font-semibold">
              Issued
            </span>
          )}
        </td>

        {/* Applied At */}
        <td className="p-3 border-b border-gray-600">
          {new Date(c.appliedAt).toLocaleString()}
        </td>

        {/* Issued At */}
        <td className="p-3 border-b border-gray-600">
          {c.issuedAt ? new Date(c.issuedAt).toLocaleString() : "—"}
        </td>

        {/* Certificate ID */}
        <td className="p-3 border-b border-gray-600 font-mono text-xs break-all">
          {c.certificateId}
        </td>

        {/* Action */}
        <td className="p-3 border-b border-gray-600">
          {isIssued ? (
            <Link
              href={`userCertificates/${c.certificateId}`}
              className="btn px-2 py-1 text-xs bg-blue-600 hover:bg-blue-500 rounded text-white w-full"
            >
              View Certificate
            </Link>
          ) : (
            <button
              disabled
              className="btn px-2 py-1 text-xs bg-gray-500 rounded text-white w-full cursor-not-allowed"
            >
              View Certificate
            </button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>


          </table>
        </div>
      )}
    </div>
  );
}

// Wrap with user-only protection
export default WithRole(UserCertificatesPage, ["user"]);
