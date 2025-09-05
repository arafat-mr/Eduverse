"use client";

import Lottie from "lottie-react";

import notFoundLottie from "../assets/404 error.json";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center  text-center">
      <div>
        <Lottie animationData={notFoundLottie} loop={true} />
      </div>
    </div>
  );
}
