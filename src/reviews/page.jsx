// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function ReviewsPage() {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch("/reviewsData/reviews.json")
//       .then((res) => res.json())
//       .then((data) => setReviews(data));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#031043] via-[#0b1d5c] to-[#031043] py-16 px-6">
//       <h1 className="text-5xl font-extrabold text-center text-white mb-16">
//         🌟 What Our Students Say 🌟
//       </h1>

//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
//         {reviews.map((review, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, scale: 0.9, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: idx * 0.15 }}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 flex flex-col"
//           >
//             {/* Image */}
//             <div className="flex items-center mb-4">
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-lg"
//               />
//               <div className="ml-4">
//                 <h3 className="text-xl font-semibold text-white">
//                   {review.name}
//                 </h3>
//                 <p className="text-yellow-400 text-lg">{review.rating}</p>
//               </div>
//             </div>

//             {/* Review Text */}
//             <p className="text-gray-200 leading-relaxed text-base flex-1">
//               {review.review}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/reviewsData/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Auto change reviews every 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#031043] via-[#0b1d5c] to-[#031043] flex flex-col items-center justify-center text-center px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
        Journey to Success Begins Here
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl">
        Real Stories, Real Impact! Discover how our courses transformed their
        careers and opened new doors to success.
      </p>

      {/* Review Card */}
      <div className="relative w-full max-w-3xl h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {reviews.length > 0 && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 flex flex-col items-center"
            >
              {/* Image */}
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg mb-4"
              />

              {/* Name + Stars */}
              <h3 className="text-2xl font-bold text-white">
                {reviews[currentIndex].name}
              </h3>
              <p className="text-yellow-400 mb-4 text-lg">
                {reviews[currentIndex].rating}
              </p>

              {/* Review Text */}
              <p className="text-gray-200 leading-relaxed text-base max-w-xl">
                {reviews[currentIndex].review}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
