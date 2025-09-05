import courses from "../data/courses.json";

export default function HomeCourse() {
  return (
   <div className="bg-blue-200">
    <h1 className="text-4xl font-semibold text-center py-5">Our Courses</h1>
     <div className="max-w-6xl mx-auto p-4">
      {courses.map(course => (
        <div key={course.id} className="mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p>{course.description}</p>
          <p className="text-sm text-primary">{course.instructor} • {course.duration}</p>
        </div>
      ))}
    </div>
   </div>
  );
}
