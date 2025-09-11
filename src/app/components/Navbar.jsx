"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuth();
  const userEmail = user?.email;
  const userProfileImage = user?.profileImage;

  const linkStyle =
    "text-base hover:scale-105 font-semibold hover:shadow-lg hover:shadow-white transform transition-all rounded-md font-medium px-4 duration-1000";

  const activeStyle =
    "text-base scale-105 font-semibold transform transition-all rounded-md font-medium px-4 duration-1000 border-b-4";

  const links = (
    <>
      <li className={`${linkStyle} ${pathname === "/" ? activeStyle : ""}`}>
        <Link href={"/"}>Home</Link>
      </li>
      <li className={`${linkStyle} ${pathname === "/courses" ? activeStyle : ""}`}>
        <Link href={"/courses"}>Courses</Link>
      </li>
      <li className={`${linkStyle} ${pathname === "/contact" ? activeStyle : ""}`}>
        <Link href={"/contact"}>Contact</Link>
      </li>
      <li className={`${linkStyle} ${pathname === "/aboutUs" ? activeStyle : ""}`}>
        <Link href={"/aboutUs"}>About Us</Link>
      </li>
      <li
        className={`${linkStyle} ${
          pathname === "/certificateVerification" ? activeStyle : ""
        }`}
      >
        <Link href={"/certificateVerification"}>Certificate Verification</Link>
      </li>
      {userEmail && (
        <li className={`${linkStyle} ${pathname === "/dashboard" ? activeStyle : ""}`}>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      )}
      {!userEmail && (
        <>
          <li>
            <Link href={"/login"} className="btn btn-sm rounded-md btn-outline w-full">
              Log In
            </Link>
          </li>
          <li>
            <Link href={"/register"} className="btn btn-sm rounded-md btn-outline w-full">
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-primary py-1 sticky top-0 z-50">
      <div className="navbar text-white px-8 mx-auto">
        {/* Left side */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary text-white rounded-box z-[999] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="italianno-regular">
            <Logo place={"nav"} />
          </div>
        </div>

        {/* Center (desktop menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1">{links}</ul>
        </div>

        {/* Right side */}
        <div className="navbar-end">
          {userEmail ? (
            <div className="flex items-center gap-2">
              <button onClick={() => signOut()} className="btn rounded-md btn-outline">
                Logout
              </button>
              <div className="dropdown dropdown-end">
                <div role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User Profile" src={userProfileImage} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Always visible login/register on desktop
            <div className="flex gap-3">
              <Link href={"/login"} className="btn rounded-md btn-outline hidden md:inline-flex">
                Log In
              </Link>
              <Link href={"/register"} className="btn rounded-md btn-outline hidden md:inline-flex">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
