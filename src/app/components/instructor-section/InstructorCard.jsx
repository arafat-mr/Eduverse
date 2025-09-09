'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function InstructorCard({ instructor }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative bg-gradient-to-b from-sky-500 to-sky-700 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-end text-white p-4 w-full max-w-xs h-[350px] mx-auto"
    >
      {/* Instructor Image */}
      <div className="absolute inset-0">
        <Image
          src={instructor.profileImage}
          alt={instructor.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 hover:bottom-4  z-10 bg-white/10 border-t-20 border-l-20 border-white/30 hover:border-blue-500 hover:border-r-blue-500 transition-colors duration-500 backdrop-blur-sm pt-4 px-4 rounded-tl-2xl w-[90%] ">
        <h3 className="text-lg font-bold">{instructor.name}</h3>
        <p className="text-sm">{instructor.designation}</p>
        <p className="text-xs opacity-80">{instructor.experience}</p>
      </div>
    </motion.div>
  );
}
