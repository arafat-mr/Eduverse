import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="text-2xl font-bold hover:cursor-pointer">
      <div className="flex items-center justify-center">
        <div className="h-14 w-28 ">
          <img
            className="w-full h-full  rounded-full  "
            src="/EduLogo.png"
            alt="logo"
          />
        </div>
        <p className="-ml-4 text-3xl font-extrabold text-[#278380]">Eduverse</p>
      </div>
    </Link>
  );
}
