'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';

const CourseForm = () => {
  const [uploadingCourse, setUploadingCourse] = useState(false);
  const [uploadingInstructor, setUploadingInstructor] = useState(false);
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      totalClasses: '',
      courseDuration: '',
      weeklyClasses: '',
      totalHours: '',
      project: '',
      courseImage: '', // Will now store the Cloudinary URL
      price: '',
      originalPrice: '',
      discount: '',
      courseIntroduction: '',
      courseOverview: {
        brief: '',
        details: {
          'Total Classes': '',
          'Course Duration': '',
          'Weekly Classes': '',
          'Total Hours': '',
          Projects: '',
        },
        tabs: {
          Curriculum: [''],
          'Software Used': [''],
          'Designed For': '',
          'Career Opportunities': [''],
          'Open Job Positions': '',
          'Exclusive Solutions': [''],
          Projects: [''],
        },
      },
      instructor: {
        name: '',
        designation: '',
        experience: '',
        profileImage: '', // Will now store the Cloudinary URL
        bio: '',
      },
    },
  });

  // Hardcoded categories from the provided data
  const categories = [
    'Web & Software Development',
    'Artificial Intelligence & Machine Learning',
    'Cybersecurity & Networking',
    'Business & Management',
    'Design & Creativity',
  ];

  // Field Arrays
  const { fields: curriculumFields, append: appendCurriculum, remove: removeCurriculum } =
    useFieldArray({ control, name: 'courseOverview.tabs.Curriculum' });

  const { fields: softwareFields, append: appendSoftware, remove: removeSoftware } =
    useFieldArray({ control, name: "courseOverview.tabs['Software Used']" });

  const { fields: careerFields, append: appendCareer, remove: removeCareer } =
    useFieldArray({ control, name: "courseOverview.tabs['Career Opportunities']" });

  const { fields: projectFields, append: appendProject, remove: removeProject } =
    useFieldArray({ control, name: 'courseOverview.tabs.Projects' });

  // Cloudinary upload logic
  const uploadImage = async (file, type) => {
    if (!file) return;

    if (type === 'course') {
      setUploadingCourse(true);
    } else {
      setUploadingInstructor(true);
    }

    try {
      const sigRes = await fetch("/api/cloudinary-signature");
      const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", apiKey);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        if (type === 'course') {
          setValue('courseImage', data.secure_url);
        } else {
          setValue('instructor.profileImage', data.secure_url);
        }
        Swal.fire('Success', 'Image uploaded successfully!', 'success');
      } else {
        Swal.fire('Error', 'Image upload failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error("Signed upload error:", err);
      Swal.fire('Error', 'Something went wrong during image upload.', 'error');
    } finally {
      if (type === 'course') {
        setUploadingCourse(false);
      } else {
        setUploadingInstructor(false);
      }
    }
  };

  const handleAddCourse = async (data) => {
    try {
      const res = await fetch('/api/courses/add-course-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to add course');
      }

      Swal.fire('Success', 'Course added successfully!', 'success');
      // reset();
    } catch (error) {
      console.log(error);
      // console.error(error);
      // Swal.fire('Error', 'Error adding course. Check console for details.', 'error');
    }
  };

  const courseImage = watch('courseImage');
  const instructorImage = watch('instructor.profileImage');

  return (
    <form
      onSubmit={handleSubmit(handleAddCourse)}
      className="max-w-5xl mx-auto p-6 bg-gray-800 shadow-2xl rounded-xl space-y-6 text-white"
    >
      <h2 className="text-4xl font-bold text-center text-white tracking-wide">Add New Course</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Course Title"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Category Dropdown */}
        <select
          {...register('category', { required: true })}
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          {...register('totalClasses', { required: true })}
          type="number"
          placeholder="Total Classes"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('courseDuration', { required: true })}
          type="text"
          placeholder="Course Duration"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('weeklyClasses', { required: true })}
          type="number"
          placeholder="Weekly Classes"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('totalHours', { required: true })}
          type="number"
          placeholder="Total Hours"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('project', { required: true })}
          type="number"
          placeholder="Projects"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('price', { required: true })}
          type="number"
          placeholder="Price"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('originalPrice')}
          type="number"
          placeholder="Original Price (Optional)"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('discount')}
          type="text"
          placeholder="Discount (Optional)"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Course Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Course Image</label>
        {courseImage ? (
          <div className="relative w-40 h-40">
            <img
              src={courseImage}
              alt="Course Preview"
              className="w-40 h-40 object-cover rounded shadow"
            />
            <button
              type="button"
              onClick={() => setValue('courseImage', '')}
              className="absolute top-1 right-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0], 'course')}
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {uploadingCourse && <p className="text-sm mt-2">Uploading course image...</p>}
          </div>
        )}
        <input
          type="hidden"
          {...register('courseImage', { required: 'Course image is required' })}
        />
        {errors.courseImage && <p className="text-red-500 text-sm mt-1">{errors.courseImage.message}</p>}
      </div>

      {/* Introduction */}
      <textarea
        {...register('courseIntroduction')}
        placeholder="Course Introduction"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
      />

      {/* Overview */}
      <h3 className="text-xl font-semibold text-white border-b border-gray-400 pb-2 mt-6">
        Course Overview
      </h3>
      <textarea
        {...register('courseOverview.brief')}
        placeholder="Brief Overview"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-20"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Total Classes', 'Course Duration', 'Weekly Classes', 'Total Hours', 'Projects'].map((key) => (
          <input
            key={key}
            {...register(`courseOverview.details.${key}`)}
            placeholder={key}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}
      </div>

      {/* Dynamic Sections */}
      {[
        { label: 'Curriculum', fields: curriculumFields, append: appendCurriculum, remove: removeCurriculum },
        { label: 'Software Used', fields: softwareFields, append: appendSoftware, remove: removeSoftware },
        { label: 'Career Opportunities', fields: careerFields, append: appendCareer, remove: removeCareer },
        { label: 'Projects', fields: projectFields, append: appendProject, remove: removeProject },
      ].map(({ label, fields, append, remove }) => (
        <div key={label}>
          <h3 className="text-xl font-semibold text-white border-b border-gray-400 pb-2 mt-6">{label}</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`courseOverview.tabs['${label}'].${index}`)}
                placeholder={`${label} Item ${index + 1}`}
                className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append('')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            Add {label}
          </button>
        </div>
      ))}

      {/* Instructor Info */}
      <h3 className="text-xl font-semibold text-white border-b border-gray-400 pb-2 mt-6">
        Instructor Info
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register('instructor.name')}
          placeholder="Instructor Name"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('instructor.designation')}
          placeholder="Designation"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('instructor.experience')}
          placeholder="Experience"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Instructor Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Instructor Profile Image</label>
        {instructorImage ? (
          <div className="relative w-32 h-32">
            <img
              src={instructorImage}
              alt="Instructor Preview"
              className="w-32 h-32 object-cover rounded-full shadow"
            />
            <button
              type="button"
              onClick={() => setValue('instructor.profileImage', '')}
              className="absolute top-1 right-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0], 'instructor')}
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {uploadingInstructor && <p className="text-sm mt-2">Uploading instructor image...</p>}
          </div>
        )}
        <input
          type="hidden"
          {...register('instructor.profileImage')}
        />
        {errors.instructor?.profileImage && <p className="text-red-500 text-sm mt-1">{errors.instructor.profileImage.message}</p>}
      </div>

      {/* Instructor Bio */}
      <textarea
        {...register('instructor.bio')}
        placeholder="Instructor Bio"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white px-6 py-3 rounded-lg text-lg font-semibold mt-6 transition transform hover:scale-105"
      >
        Add Course
      </button>
    </form>
  );
};

export default CourseForm;
