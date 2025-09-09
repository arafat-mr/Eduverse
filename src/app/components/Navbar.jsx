"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuth();
  console.log(user);
  const userEmail = user?.email;
  const userProfileImage = user?.profileImage;

  const linkStyle =
    "text-base hover:scale-105 font-semibold hover:font-semibold hover:shadow-lg hover:shadow-white transform transition-all rounded-md font-medium px-4 duration-1000";

  const activeStyle =
    "text-base scale-105 font-semibold transform transition-all rounded-md font-medium px-4 duration-1000 border-b border-b-4 ";
  const links = (
    <>
      <li className={`${linkStyle} ${pathname === "/" ? activeStyle : ""}`}>
        <Link href={"/"}> Home </Link>
      </li>
      <li
        className={`${linkStyle} ${pathname === "/courses" ? activeStyle : ""}`}
      >
        <Link href={"/courses"}> Courses </Link>
      </li>
      <li
        className={`${linkStyle} ${pathname === "/contact" ? activeStyle : ""}`}
      >
        <Link href={"/contact"}> Contact </Link>
      </li>
      <li
        className={`${linkStyle} ${pathname === "/aboutUs" ? activeStyle : ""}`}
      >
        <Link href={"/aboutUs"}> About Us </Link>
      </li>
      <li
        className={`${linkStyle} ${
          pathname === "/certificateVerification" ? activeStyle : ""
        }`}
      >
        <Link href={"/certificateVerification"}> Certificate Verification</Link>
      </li>
      {userEmail ? (
        <li
          className={`${linkStyle} ${
            pathname === "/dashboard" ? activeStyle : ""
          }`}
        >
          <Link href={"/dashboard"}> Dashboard</Link>
        </li>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className=" bg-primary py-1 sticky top-0 z-50000">
      <div className="navbar text-white px-8 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="italianno-regular ">
                      <Logo place={"nav"}></Logo>
          </div>


        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end ">
          {userEmail ? (
            <div className="flex items-center gap-2">
              <div>
                <button onClick={() => signOut()} className="btn rounded-md btn-outline">
                  Logout
                </button>
              </div>
              <div className="dropdown dropdown-end">
                <div role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userProfileImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:flex gap-3 hidden">
              <Link href={"/login"} className="btn rounded-md btn-outline">
                Log In
              </Link>
              <Link href={"/register"} className="btn rounded-md btn-outline">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
