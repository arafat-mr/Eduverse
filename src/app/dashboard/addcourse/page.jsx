'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import WithRole from '@/app/components/WithRole';

const CourseForm = () => {
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
      totalClasses: '',
      courseDuration: '',
      weeklyClasses: '',
      totalHours: '',
      project: '',
      courseImage: null,
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
        profileImage: null,
        bio: '',
      },
    },
  });

  // Field Arrays
  const { fields: curriculumFields, append: appendCurriculum, remove: removeCurriculum } =
    useFieldArray({ control, name: 'courseOverview.tabs.Curriculum' });

  const { fields: softwareFields, append: appendSoftware, remove: removeSoftware } =
    useFieldArray({ control, name: "courseOverview.tabs['Software Used']" });

  const { fields: careerFields, append: appendCareer, remove: removeCareer } =
    useFieldArray({ control, name: "courseOverview.tabs['Career Opportunities']" });

  const { fields: projectFields, append: appendProject, remove: removeProject } =
    useFieldArray({ control, name: 'courseOverview.tabs.Projects' });

  const handleAddCourse = async (data) => {
    try {
      const res = await fetch('/api/courses-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to add course');

      alert('Course added successfully!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error adding course');
    }
  };

  const courseImage = watch('courseImage');
  const instructorImage = watch('instructor.profileImage');

  return (
  

   
    <form
      onSubmit={handleSubmit(handleAddCourse)}
      className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-[#746a4a] to-[#4b3f2a] shadow-xl rounded-xl space-y-6 text-white"
    >
      <h2 className="text-4xl font-bold text-center text-white tracking-wide">Add New Course</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'title', label: 'Course Title' },
          { name: 'totalClasses', label: 'Total Classes', type: 'number' },
          { name: 'courseDuration', label: 'Course Duration' },
          { name: 'weeklyClasses', label: 'Weekly Classes', type: 'number' },
          { name: 'totalHours', label: 'Total Hours', type: 'number' },
          { name: 'project', label: 'Projects', type: 'number' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'originalPrice', label: 'Original Price', type: 'number' },
          { name: 'discount', label: 'Discount' },
        ].map(({ name, label, type }) => (
          <input
            key={name}
            {...register(name, { required: name !== 'originalPrice' && name !== 'discount' })}
            type={type || 'text'}
            placeholder={label}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}
      </div>

      {/* Course Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Course Image</label>
        {!courseImage ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setValue('courseImage', e.target.files[0])}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ) : (
          <div className="relative w-40 h-40">
            <img
              src={URL.createObjectURL(courseImage)}
              alt="Course Preview"
              className="w-40 h-40 object-cover rounded shadow"
            />
            <button
              type="button"
              onClick={() => setValue('courseImage', null)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Introduction */}
      <textarea
        {...register('courseIntroduction')}
        placeholder="Course Introduction"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
      />

      {/* Overview */}
      <h3 className="text-xl font-semibold text-white border-b border-gray-400 pb-2 mt-6">
        Course Overview
      </h3>
      <textarea
        {...register('courseOverview.brief')}
        placeholder="Brief Overview"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-20"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Total Classes', 'Course Duration', 'Weekly Classes', 'Total Hours', 'Projects'].map((key) => (
          <input
            key={key}
            {...register(`courseOverview.details.${key}`)}
            placeholder={key}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append('')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
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
          className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('instructor.designation')}
          placeholder="Designation"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          {...register('instructor.experience')}
          placeholder="Experience"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Instructor Image Upload */}
      <div>
        <label className="block font-semibold mb-2">Instructor Profile Image</label>
        {!instructorImage ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setValue('instructor.profileImage', e.target.files[0])}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ) : (
          <div className="relative w-32 h-32">
            <img
              src={URL.createObjectURL(instructorImage)}
              alt="Instructor Preview"
              className="w-32 h-32 object-cover rounded-full shadow"
            />
            <button
              type="button"
              onClick={() => setValue('instructor.profileImage', null)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Instructor Bio */}
      <textarea
        {...register('instructor.bio')}
        placeholder="Instructor Bio"
        className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg mt-6 transition"
      >
        Add Course
      </button>
    </form>
    
  );
};

export default WithRole(CourseForm, ['admin']);
