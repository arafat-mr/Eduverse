"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CertificateVerification() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    console.log(certId);

    try {
      // Call your backend API to verify certificate
      const res = await fetch(`/api/verify-certificate/${certId}`);
      const data = await res.json();

      if (res.ok) {
        setResult({ valid: true, data });
      } else {
        setResult({ valid: false });
      }
    } catch (err) {
      console.error(err);
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)]   bg-gradient-to-r from-accent to-secondary flex flex-col items-center justify-center  p-5">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary mb-8 text-center"
      >
        Verify Your Certificate
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleVerify}
        className="flex flex-col items-center gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="input border-none bg-white text-black focus:border-0 focus:outline-0  w-full"
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        >
          Verify
        </button>
      </motion.form>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 w-full max-w-md p-6 rounded-lg shadow-lg bg-white text-center"
        >
          {result.valid ? (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Certificate Verified ✅
              </h2>
              <p className="text-gray-700">Name: {result.data.studentName}</p>
              <p className="text-gray-700">Course: {result.data.courseName}</p>
              <p className="text-gray-700">Date: {result.data.date}</p>
              <p className="text-gray-700">Certificate ID: {certId}</p>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-red-600">
              Invalid Certificate ❌
            </h2>
          )}
        </motion.div>
      )}
    </div>
  );
}
