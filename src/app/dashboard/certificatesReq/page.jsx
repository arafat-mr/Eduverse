"use client";

import WithRole from "@/app/components/WithRole";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CertificateReq = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch certificates from backend
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/adminCertificates");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setCertificates(data.certificates || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch certificates: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Update certificate status
  const updateStatus = async (id) => {
    try {
      const res = await fetch(`/api/admin/adminCertificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "issued" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      toast.success("Status updated to issued");

      setCertificates((prev) =>
        prev.map((cert) =>
          cert.certificateId === id
            ? { ...cert, status: "issued", issuedAt: new Date().toISOString() }
            : cert
        )
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-white text-xl">
        Loading certificates...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Certificate Requests</h2>
        <button
          onClick={fetchCertificates}
          className="btn btn-sm btn-outline rounded-lg border-white text-white hover:bg-white hover:text-blue-900"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto  rounded-lg shadow p-4">
        <table className="min-w-[800px] w-full text-white  ">
          <thead className="bg-blue-800 font-mono">
            <tr>
              <th className="p-3 border-b border-gray-600">User Email</th>
              <th className="p-3 border-b border-gray-600">Course</th>
              <th className="p-3 border-b border-gray-600">Status</th>
              <th className="p-3 border-b border-gray-600">Applied At</th>
              <th className="p-3 border-b border-gray-600">Issued At</th>
              <th className="p-3 border-b border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr
                key={cert._id}
                className="hover:bg-blue-900 font-mono text-sm transition-colors"
              >
                <td className="p-3 border-b border-gray-600">{cert.email}</td>
                <td className="p-3 border-b border-gray-600">{cert.courseTitle}</td>
                <td className="p-3 border-b border-gray-600">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold ${
                      cert.status === "pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {cert.status}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-600">
                  {new Date(cert.appliedAt).toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-600">
                  {cert.issuedAt ? new Date(cert.issuedAt).toLocaleString() : "-"}
                </td>
                <td className="p-3 border-b border-gray-600">
                  {cert.status === "pending" && (
                    <button
                      onClick={() => updateStatus(cert.certificateId)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-white"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithRole(CertificateReq, ["admin"]);
