"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  BookOpen,
  Star,
  Users,
  Clock,
  Brain,
  Cpu,
  Code,
} from "lucide-react";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What programming languages and technologies do you teach?",
      answer:
        "We offer Python, JavaScript, React, Node.js, AI/ML with TensorFlow, Data Science, Cloud Computing (AWS/Azure), and much more. Always updated with industry trends.",
      icon: <Code className="w-6 h-6 text-blue-500" />,
      category: "Courses",
    },
    {
      id: 2,
      question: "Are your courses suitable for beginners?",
      answer:
        "Yes! Each course starts with fundamentals and gradually progresses to advanced topics. Beginner-friendly projects & real-world examples are included.",
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      category: "Learning",
    },
    {
      id: 3,
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, you’ll receive a verified certificate recognized by industry professionals. Perfect for LinkedIn, resumes, and portfolios.",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      category: "Certification",
    },
    {
      id: 4,
      question: "What's included in AI/ML courses?",
      answer:
        "We cover neural networks, deep learning, NLP, computer vision, deployment, and real projects using TensorFlow & PyTorch.",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      category: "AI/ML",
    },
    {
      id: 5,
      question: "How long does it take to complete a course?",
      answer:
        "Courses last 4–16 weeks depending on difficulty. Most students spend 3–5 hours weekly, fully self-paced.",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      category: "Duration",
    },
    {
      id: 6,
      question: "Do you provide job placement support?",
      answer:
        "Yes! Resume reviews, interview prep, portfolio guidance, and access to exclusive partner job boards.",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      category: "Career",
    },
    {
      id: 7,
      question: "Can I access courses on mobile devices?",
      answer:
        "Absolutely! Our platform is mobile-optimized. Learn from your phone, tablet, or laptop anytime.",
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      category: "Platform",
    },
  ];

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/30 to-pink-200/40 blur-3xl -z-10"></div>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-xl"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our courses, AI, and career paths
          </p>
        </div>
        <div className="space-y-6">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-6 pb-5 text-gray-700 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <div className="rounded-3xl p-10 ">
            <h3 className="text-2xl font-bold mb-3 text-black">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our advisors can help you choose the perfect course
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:support@yourplatform.com"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Contact Support
              </a>
              <a
                href="/courses"
                className="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-semibold shadow-md hover:bg-gray-200 hover:scale-105 transition-transform"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
