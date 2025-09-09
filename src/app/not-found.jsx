
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCompass, FaEnvelope, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-slate-800 to-black text-gray-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10 text-center"
      >
        {/* Animated "404" */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl font-extrabold text-indigo-400 drop-shadow-md"
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="mt-3 text-slate-300">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold shadow-lg"
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/alltasks"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition text-white font-semibold shadow-lg"
          >
            <FaCompass /> Explore
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-500 text-slate-300 hover:bg-slate-800 transition font-semibold shadow"
          >
            <FaEnvelope /> Contact
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Or try visiting{" "}
          <Link href="/about" className="underline hover:text-indigo-300">
            about us
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
