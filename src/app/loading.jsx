"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-80px)]  w-screen items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Dotted Spinning Circle */}
        <div className="absolute w-36 h-36 border-4 border-dotted border-accent rounded-full animate-spin"></div>

        {/* Logo in center */}
        <div className="z-10 h-24 w-28">
          <img
            src="/EduLogo.png"
            alt="Eduverse Logo"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
