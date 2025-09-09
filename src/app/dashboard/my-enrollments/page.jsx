// app/your-page/page.jsx (or wherever Enrollments is)
'use client';
import React, { useState, useEffect } from 'react';
import {
  Book,
  Calendar,
  Clock,
  SquareGanttChart,
  GraduationCap,
  ArrowRight,
  Link,
} from 'lucide-react';
import useAuth from '@/app/hooks/useAuth';
import CourseCard from './Componets/CourseCard';

export default function Enrollments() {
  const user = useAuth();
  // Assuming userCourses is an array of course objects
  const [userCoursesData, setUserCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace with your actual API call to fetch user's courses
    // This is a placeholder example
    if (user?.email) {
      fetch(`/api/user-course-details?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          // Ensure data.courses is an array before setting state
          if (data && Array.isArray(data.courses)) {
            setUserCoursesData(data.courses);
          } else {
            setUserCoursesData([]); // Set to empty array if no courses or unexpected format
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching courses:', err);
          setError('Failed to load courses.');
          setLoading(false);
        });
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user?.email]);
  console.log(userCoursesData);

  if (loading) {
    return <p className="text-center text-gray-700">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        My Courses
      </h1>

      {userCoursesData.length === 0 ? (
        <p className="text-center text-gray-500">No courses enrolled.</p>
      ) : (
        <div>
          {userCoursesData.map((course, idx) => (
            
            // Pass the individual course object to the CourseCard component
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
