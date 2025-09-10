// components/CourseSelector.js
import React from 'react';
import WithRole from '@/app/components/WithRole';

const CourseSelector = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedCourse,
  setSelectedCourse,
  moduleName,
  setModuleName,
  handleProceed,
}) => {
  const coursesInSelectedCategory =
    categories.find((cat) => cat.category === selectedCategory)?.courses || [];

  return (
    <div className="bg-blue-800 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Step 1: Select Course and Module
      </h2>

      <div className="mb-4">
        <label htmlFor="category" className="block text-white font-medium mb-2">
          Select Category
        </label>
        <select
          id="category"
          className="w-full p-3 bg-blue-800 text-white border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Choose a category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="course" className="block text-white font-medium mb-2">
          Select Course
        </label>
        <select
          id="course"
          className="w-full p-3 border border-blue-700 rounded-md bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">-- Choose a course --</option>
          {coursesInSelectedCategory.map((course, index) => (
            <option key={index} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="moduleName" className="block text-white font-medium mb-2">
          Module Name
        </label>
        <input
          type="text"
          id="moduleName"
          className="w-full p-3 border border-blue-700 rounded-md bg-blue-800 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g., Module 1: Introduction to MERN Stack"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          disabled={!selectedCourse}
        />
      </div>

      <button
        onClick={handleProceed}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-md transition-colors duration-200"
        disabled={!selectedCourse || !moduleName}
      >
        Proceed to Add Videos
      </button>
    </div>
  );
};

// Wrap with role check for admin
export default WithRole(CourseSelector, ['admin']);
