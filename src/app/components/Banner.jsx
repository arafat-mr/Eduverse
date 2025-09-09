'use client';
import Lottie from 'lottie-react';
import bannerAnimation from '../../../public/Home-resources/Banner/banner.json';
import { Slide } from 'react-awesome-reveal';
import { Typewriter } from 'react-simple-typewriter';





export default function Banner() {
  return (
    

   
    <Slide direction="up" duration={2000} delay={200} cascade triggerOnce>
      <div className="grid grid-cols-12 place-content-center place-items-center text-center md:text-start bg-gradient-to-r from-green-100 to-green-200 text-gray-800 px-6 sm:px-12 py-12 sm:py-16 gap-4 md:gap-8">
        
        {/* Left Side: Text Content */}
        <div className="col-span-12 md:col-span-6 space-y-4 sm:space-y-6">
          
          <h1 className="text-[#278380] text-3xl md:text-7xl font-bold">
            Your Awesome Online <br className='block md:hidden' /> Course
          </h1>

          {/* Typing Effect Subheading */}
      <div className='w-[300px] md:w-[500px] h-[30px]'>
            <p className="text-sm sm:text-lg md:w-[500px] text-gray-700 font-semibold leading-relaxed">
            <Typewriter
              words={[
                'Cloud-based LMS Trusted by 1000+.',
                'Learn at your own pace.',
                'Unlimited Access.',
              ]}
              loop={0}             // 0 = infinite, change to 1 to play once
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1500}
            />
          </p>
      </div>

          <div className="flex  flex-col items-center sm:flex-row  gap-3 sm:gap-4 mt-5">
            <button className="btn max-w-[200px] btn-outline  px-6 py-2 rounded-md w-full sm:w-auto">
              View Courses
            </button>
            <button className="btn btn-warning  px-6 py-2 max-w-[200px] rounded-md w-full sm:w-auto">
              Explore More
            </button>
         
          </div>
        </div>

        {/* Right Side: Lottie Animation */}
        <div className="col-span-12 md:col-span-6 flex justify-center mt-8 md:mt-0">
          <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
            <Lottie
              animationData={bannerAnimation}
              loop={true}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
  
      </div>
     
    </Slide>
  );
}
// TODO: Button style change dbo,typing effect upgrade dibo
// todo   <slide > ta k div diye wrap kore bg  bg-gradient-to-r from-green-100 to-green-200 ata diyen thle jokhn loading hobe bg white dekhabe nah     