"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <div className="relative bg-secondary text-primary ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/9XxwRBF8/digitization-1599552.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay for readability */}

      <div className="relative grid grid-cols-12 place-content-center place-items-center text-center md:text-start px-6 sm:px-12 py-12 sm:py-20 gap-6 md:gap-10">
        {/* Left Side: Text Content */}
        <div className="col-span-12 md:col-span-6 space-y-6 z-10">
          <h1 className="sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            <span id="header">
              Our Courses Will Make Learning Your Favorite Habit!
            </span>
          </h1>

          {/* Typing Effect Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-bold min-h-[30px]">
            <Typewriter
              words={[
                "Cloud-based LMS Trusted by 1000+.",
                "Learn at your own pace.",
                "Unlimited Access to Courses.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={"/courses"}>
              <button className="px-6 py-3 w-full sm:w-auto rounded-xl border-2 border-[#4a9bec] text-white font-semibold hover:bg-[#4a9bec] hover:text-white transition-all duration-300 shadow-md">
                View Courses
              </button>
            </Link>
            <Link href={"/aboutUs"}>
              <button className="px-6 py-3 w-full sm:w-auto rounded-xl bg-[#4a9bec] text-white font-semibold transition-all duration-300 shadow-md hover:bg-white hover:text-primary">
                Explore More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Image */}
        <div className="col-span-12 md:col-span-6 flex justify-center mt-10 md:mt-0 z-10">
          <motion.div
            className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[580px]"
            animate={{ y: [0, -15, 0] }} // Floating effect
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src="https://i.postimg.cc/X7HvdMg0/istockphoto-1360520509-612x612.jpg"
              alt="Banner Illustration"
              className="w-full h-auto object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
