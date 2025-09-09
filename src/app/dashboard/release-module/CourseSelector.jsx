// components/CourseSelector.js
import React from 'react';

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
  const coursesInSelectedCategory = categories.find(cat => cat.category === selectedCategory)?.courses || [];

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Step 1: Select Course and Module</h2>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Select Category</label>
        <select
          id="category"
          className="w-full p-3 bg-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Choose a category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.category}>{cat.category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="course" className="block text-gray-700 font-medium mb-2">Select Course</label>
        <select
          id="course"
          className="w-full p-3 border rounded-md bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">-- Choose a course --</option>
          {coursesInSelectedCategory.map((course, index) => (
            <option key={index} value={course.title}>{course.title}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="moduleName" className="block text-gray-700 font-medium mb-2">Module Name</label>
        <input
          type="text"
          id="moduleName"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Module 1: Introduction to MERN Stack"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          disabled={!selectedCourse}
        />
      </div>

      <button
        onClick={handleProceed}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
        disabled={!selectedCourse || !moduleName}
      >
        Proceed to Add Videos
      </button>
    </div>
  );
};

export default CourseSelector;