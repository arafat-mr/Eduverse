"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className=" bg-gradient-to-r from-accent to-secondary min-h-screen py-20 px-5 md:px-20">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-center text-primary mb-10"
      >
        About Eduverse
      </motion.h1>

      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-11/12 mx-auto text-center mb-16"
      >
        <p className="text-lg md:text-xl text-gray-700">
          Eduverse is your go-to platform for high-quality tech tutorials. We
          provide pre-recorded courses by industry-renowned mentors, interactive
          quizzes after each video, and track your progress so you can achieve
          your learning goals efficiently.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
          hidden: {},
        }}
      >
        {/* Feature 1 */}
        <motion.div
          className="bg-white p-8 rounded-2xl hover:cursor-pointer shadow-lg  hover:shadow-xl transition duration-500"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            Interactive Quizzes
          </h3>
          <p className="text-gray-600">
            Test your knowledge after every video with quizzes designed to
            reinforce learning and track your progress.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="bg-white p-8 rounded-2xl hover:cursor-pointer shadow-lg  hover:shadow-xl transition duration-500"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            Auto-Generated Certificates
          </h3>
          <p className="text-gray-600">
            Receive certificates automatically after completing courses and
            verify them anytime with our secure verification system.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="bg-white p-8 rounded-2xl hover:cursor-pointer shadow-lg  hover:shadow-xl transition duration-500"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            AI Chat Support
          </h3>
          <p className="text-gray-600">
            Have questions while learning? Our AI-powered chat assistant helps
            you solve doubts instantly and guides you throughout your journey.
          </p>
        </motion.div>

        {/* Feature 4 */}
        <motion.div
          className="bg-white p-8 rounded-2xl hover:cursor-pointer shadow-lg  hover:shadow-xl transition duration-500"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-bold text-primary mb-4">
            Renowned Mentors
          </h3>
          <p className="text-gray-600">
            Learn from experts who are recognized in the tech industry, bringing
            you the latest knowledge and best practices.
          </p>
        </motion.div>
      </motion.div>

      {/* Closing Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-20 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Join Eduverse Today
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">
          Enhance your tech skills, track your growth, earn certificates, and
          get help anytime with our AI assistant. Start your journey with
          Eduverse now!
        </p>
      </motion.div>
    </div>
  );
}
