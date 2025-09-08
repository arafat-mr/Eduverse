"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all certificates
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/certificates");
      setCertificates(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Add new certificate
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !studentId) {
      setError("Title and Student ID are required");
      return;
    }

    try {
      const res = await axios.post("/api/certificates", { title, studentId });
      setCertificates((prev) => [...prev, res.data]);
      setTitle("");
      setStudentId("");
      setSuccess("Certificate added successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to add certificate");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>

      {/* Add Certificate Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Certificates List */}
      {loading ? (
        <p>Loading...</p>
      ) : certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Student ID</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert._id}>
                <td className="border px-2 py-1">{cert._id}</td>
                <td className="border px-2 py-1">{cert.title}</td>
                <td className="border px-2 py-1">{cert.studentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
