"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import WithRole from "@/app/components/WithRole";

function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch certificates
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminCertificates");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch certificates");
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
  }, []);

  // Approve certificate
  const approveCertificate = async (certificateId) => {
    try {
      const res = await fetch(`/api/adminCertificates/${certificateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "issued",
          issuedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve");
      // alert("✅ Certificate approved!");
      fetchCertificates(); // refresh after approval
    } catch (err) {
      // alert("❌ " + err.message);
    }
  };

  return (
    
      <div className="p-6 min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Certificate Requests</h1>
          <button
            onClick={fetchCertificates}
            className="btn btn-sm btn-outline rounded-lg border-white text-white hover:bg-white hover:text-blue-900"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="w-full h-64 flex justify-center items-center">
            <span className="loading loading-spinner text-white"></span>
          </div>
        ) : (
          <div className="overflow-x-auto bg-blue-950 rounded-lg shadow">
            <table className="table-auto min-w-[600px] border-collapse border border-gray-600 text-white">
              <thead className="bg-blue-800 font-mono">
                <tr>
                  <th className="p-3 border-b border-gray-600">Email</th>
                  <th className="p-3 border-b border-gray-600">Course</th>
                  <th className="p-3 border-b border-gray-600">Status</th>
                  <th className="p-3 border-b border-gray-600">Applied At</th>
                  <th className="p-3 border-b border-gray-600">Issued At</th>
                  <th className="p-3 border-b border-gray-600">Certificate ID</th>
                  <th className="p-3 border-b border-gray-600">Action</th>
                </tr>
              </thead>
           <tbody>
  {certificates.map((c) => (
    <tr key={c._id} className="hover:bg-blue-900 font-mono text-sm">
      {/* Name + Email */}
      <td className="p-3 border-b border-gray-600">
        <div className="flex flex-col">
          <span className="font-semibold">{c.name || "—"}</span>
          <span className="text-xs text-gray-300">{c.email}</span>
        </div>
      </td>

      {/* Course */}
      <td className="p-3 border-b border-gray-600">
        {c.courseName || c.courseTitle || "—"}
      </td>

      {/* Status */}
      <td className="p-3 border-b border-gray-600">
        {c.status === "pending" ? (
          <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
            Pending
          </span>
        ) : (
          <span className="bg-green-300 text-green-900 px-2 py-1 rounded-full text-xs font-semibold">
            Issued
          </span>
        )}
      </td>

      {/* Applied */}
      <td className="p-3 border-b border-gray-600">
        {new Date(c.appliedAt).toLocaleString()}
      </td>

      {/* Issued */}
      <td className="p-3 border-b border-gray-600">
        {c.issuedAt ? new Date(c.issuedAt).toLocaleString() : "—"}
      </td>

      {/* Certificate ID */}
      <td className="p-3 border-b border-gray-600 font-mono text-xs break-all">
        {c.certificateId}
      </td>

      {/* Action */}
      <td className="p-3 border-b border-gray-600">
        {c.status === "pending" && (
          <button
            onClick={() => approveCertificate(c.certificateId)}
            className="btn btn-sm rounded-lg bg-green-600 hover:bg-green-500 text-white"
          >
            Approve
          </button>
        )}
      </td>
    </tr>
  ))}
  {certificates.length === 0 && (
    <tr>
      <td colSpan="7" className="text-center p-4 text-gray-300">
        No certificate requests found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        )}
      </div>
    
  );
}

// Wrap with admin-only protection
export default WithRole(CertificatesPage, ["admin"]);
    
  
