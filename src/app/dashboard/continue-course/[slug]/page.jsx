'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ContinueCoursePage({ params }) {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  
  
  const course = courseParam
    ? JSON.parse(decodeURIComponent(courseParam))
    : null;
  
  
  
  if (!course) return <p>No course found!</p>;

  const [currentVideo, setCurrentVideo] = useState(
    course.modules[0]?.videos[0]
  );

  return (
    <div className="flex flex-col lg:flex-row bg-[#1e1c31] text-white font-sans rounded-xl overflow-hidden">
      {/* Main ভিডিও */}
      <div className="flex-1 rounded-xl overflow-hidden shadow-xl lg:mr-6 mb-6 lg:mb-0 bg-[#2e2b4f]">
        <div className="relative aspect-video bg-black">
          <video
            src={currentVideo.url}
            controls
            autoPlay
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
        </div>
      </div>

      {/* মোডুল লিস্ট */}
      <div className="w-full lg:w-1/3 bg-[#2e2b4f] rounded-xl shadow-xl overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold p-6 border-b border-[#3a375a]">
          {course.title}
        </h2>
        {course.modules.map((module, moduleIndex) => (
          <div
            key={moduleIndex}
            className="p-4 border-b border-[#3a375a] last:border-b-0"
          >
            <h3 className="text-lg font-semibold mb-2">{module.moduleName}</h3>
            <ul className="space-y-2 mb-4">
              {module.videos.map((video, videoIndex) => (
                <li
                  key={videoIndex}
                  className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                    currentVideo.url === video.url
                      ? 'bg-[#4a466c]'
                      : 'hover:bg-[#3a375a]'
                  }`}
                  onClick={() => setCurrentVideo(video)}
                >
                  <div className="flex-1 flex items-center">
                    <span className="mr-3">▶</span>
                    <p className="truncate text-sm font-medium">
                      {video.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Complete Course Button */}
            
          </div>
         
        ))}
         <div>
          <Link
  href={`/certificate?course=${encodeURIComponent(course.title)}`}
  className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
>
  Complete Course
</Link>

         </div>
         
      </div>
    </div>
  );
}
