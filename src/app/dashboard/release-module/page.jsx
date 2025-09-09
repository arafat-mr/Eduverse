// components/VideoManager.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseSelector from './CourseSelector';
import VideoUploader from './VideoUploader';
import { toast } from 'react-hot-toast'; // Example for notifications

const VideoManager = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [isProceed, setIsProceed] = useState(false);

  // Function to fetch all course data from your API
  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses-data'); // TODO: Create this API endpoint
      setCategories(res.data[0].categories);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load course data.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleProceed = () => {
    if (selectedCourse && moduleName) {
      setIsProceed(true);
    } else {
      toast.error('Please select a course and provide a module name.');
    }
  };

  const handleSaveToDB = async () => {
    try {
      const videosPayload = uploadedVideos.map((video) => ({
        title: video.title,
        description: video.description,
        url: video.url,
      }));

      const res = await axios.patch('/api/release-module', {
        courseTitle: selectedCourse,
        moduleName,
        videos: videosPayload,
      });

      if (res.status === 200) {
        toast.success('Videos successfully added!');
        // Reset state after successful upload
        setIsProceed(false);
        setUploadedVideos([]);
        setModuleName('');
      }
    } catch (error) {
      console.error('Failed to save videos:', error);
      toast.error('Failed to save videos.');
    }
  };

  const handleAddVideo = (videoData) => {
    setUploadedVideos((prev) => [...prev, videoData]);
  };

  return (
    <div className="container mx-auto p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Add Videos to Course Module
      </h1>

      {!isProceed ? (
        <CourseSelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          moduleName={moduleName}
          setModuleName={setModuleName}
          handleProceed={handleProceed}
        />
      ) : (
        <VideoUploader
          courseTitle={selectedCourse} 
          moduleName={moduleName}
          uploadedVideos={uploadedVideos}
          setUploadedVideos={setUploadedVideos}
          onSave={handleSaveToDB}
        />
      )}
    </div>
  );
};

export default VideoManager;
