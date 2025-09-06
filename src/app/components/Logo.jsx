import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="text-2xl font-bold hover:cursor-pointer">
      <div className="flex items-center justify-center">
        <div className="lg:h-14 lg:w-28 h-12 w-24">
          <img
            className="w-full h-full rounded-full  "
            src="/EduLogo.png"
            alt="logo"
          />
        </div>
        <p className="-ml-4 lg:text-3xl text-2xl font-extrabold text-white md:text-[#278380]">
          Eduverse
        </p>
      </div>
    </Link>
  );
}
