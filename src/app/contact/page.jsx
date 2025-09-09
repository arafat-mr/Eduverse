"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ContactPage() {
  const [status, setStatus] = useState(null); 
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.target);

  
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_KEY ;
    const endpoint = `https://formspree.io/f/${formId}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }, 
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        e.target.reset(); 
      } else {
        const msg =
          data?.errors?.map((e) => e.message).join(" ") ||
          "Something went wrong. Please try again.";
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg(err?.message || "Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white transition-colors duration-300 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-primary backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-100 dark:text-gray-200 text-center max-w-2xl mx-auto mb-8">
          Got questions or feedback about{" "}
          <span className="text-white font-semibold">
            EduVerse
          </span>
          ? We’re always listening. Reach out and let’s connect!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
            <p className="text-gray-100 dark:text-gray-200">Email</p>
            <a
              href="mailto:teamfive.devs@gmail.com"
              className="text-white hover:text-black px-3 py-2 rounded-lg bg-gray-500 mt-2 transition"
            >
              teamfive.devs@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
            <p className="text-gray-100 dark:text-gray-200">Phone</p>
            <p className="text-white px-3 py-2 rounded-lg bg-gray-500 mt-2">
              +880 1234 567 890
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
            <p className="text-gray-100 dark:text-gray-200">Address</p>
            <p className="text-white px-3 py-2 rounded-lg bg-gray-500 mt-2">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "success" && (
            <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md text-center">
              ✅ Message sent successfully! We’ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-center">
              ❌ {errorMsg}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-black dark:text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg px-4 py-2 bg-white border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-black dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg px-4 py-2 bg-white border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-50 dark:text-gray-200 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full rounded-lg px-4 py-2 bg-white border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
