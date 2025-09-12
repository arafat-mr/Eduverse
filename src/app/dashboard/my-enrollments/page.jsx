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
import WithRole from '@/app/components/WithRole';

function Enrollments() {
  const {user} = useAuth();
  const [userCoursesData, setUserCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/user-course-details?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.courses)) {
            setUserCoursesData(data.courses);
          } else {
            setUserCoursesData([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching courses:', err);
          setError('Failed to load courses.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  if (loading) {
    return <p className="text-center text-white items-center flex justify-center w-full h-60">Loading courses <span className="loading text-white loading-spinner "></span></p>;
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
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
// export default Enrollments;
// Wrap with WithRole to allow any authenticated user
export default WithRole(Enrollments, ['user']);
