'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css';


import InstructorCard from './InstructorCard';

export default function InstructorSwiper({ instructors }) {
  return (
    <Swiper
      modules={[Autoplay]} 
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 2000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onTouchStart={(swiper) => swiper.autoplay.stop()}
      onTouchEnd={(swiper) => swiper.autoplay.start()}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {instructors.map((inst, idx) => (
        <SwiperSlide key={idx}>
          <InstructorCard instructor={inst} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}