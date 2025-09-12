"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function CertificateVerification() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl relative overflow-hidden"
      >
        {/* Subtle gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl p-[3px]">
          <div className="w-full h-full bg-white rounded-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative p-10 flex flex-col items-center">
          {/* Gradient Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-wide text-primary"
          >
            Verify a Certificate
          </motion.h1>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleVerify}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            <motion.input
              type="text"
              placeholder="Enter Certificate ID"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0px 0px 15px rgba(59,130,246,0.25)",
              }}
              className="w-full rounded-xl px-5 py-3 shadow-md bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block border-4 border-t-white border-gray-200 w-5 h-5 rounded-full"
                  ></motion.span>
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </motion.button>
          </motion.form>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`mt-10 w-full max-w-md p-6 rounded-2xl shadow-xl ${
                result.valid
                  ? "bg-gradient-to-r from-green-50 via-emerald-50 to-green-100"
                  : "bg-gradient-to-r from-red-50 via-rose-50 to-red-100"
              }`}
            >
              {result.valid ? (
                <div className="text-center flex flex-col items-center gap-2">
                  <AiOutlineCheckCircle className="text-green-700 text-5xl animate-pulse" />
                  <h2 className="text-3xl font-bold text-green-700">
                    Certificate Verified
                  </h2>
                  <p className="text-gray-800">
                    <span className="font-semibold">Name:</span>{" "}
                    {result.data.studentName}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Course:</span>{" "}
                    {result.data.courseName || result.data.courseTitle}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Email:</span>{" "}
                    {result.data.email}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Date:</span>{" "}
                    {result.data.date}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">Certificate ID:</span>{" "}
                    {certId}
                  </p>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center gap-2">
                  <AiOutlineCloseCircle className="text-red-600 text-5xl animate-pulse" />
                  <h2 className="text-3xl font-bold text-red-600">
                    Invalid Certificate
                  </h2>
                  <p className="text-gray-700 mt-2">
                    Certificate ID{" "}
                    <span className="font-semibold">{certId}</span> is not
                    valid or not issued yet.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
