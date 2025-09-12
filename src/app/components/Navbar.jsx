

"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";


export default function Navbar() {
  const pathname = usePathname();
  const {user,authLoading} = useAuth();
 
  const router=useRouter()
  const userEmail = user?.email;
  const userProfileImage = user?.profileImage;
 const toProfile=()=>{
  router.push('/dashboard/profile')
 }

  const linkStyle =
    "text-base hover:scale-105 font-semibold hover:shadow-lg hover:shadow-white transform transition-all rounded-md font-medium px-4 duration-1000";

  const activeStyle =
    "text-base scale-105 font-semibold transform transition-all rounded-md font-medium px-4 duration-1000 border-b-4";

  // Render links for both drawer and desktop
  const renderLinks = () => (
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
    </>
  );

  return (
    <div className="bg-primary py-1 sticky top-0 z-200">
      {/* Drawer system */}
      <input type="checkbox" id="drawer-toggle" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar text-white px-6 mx-auto ">
          {/* Left side */}
          <div className="navbar-start ">
            {/* Mobile drawer toggle */}
            <label htmlFor="drawer-toggle" className="btn btn-ghost lg:hidden cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <div className="italianno-regular ">
              <Logo place={"nav"} />
            </div>
          </div>

          {/* Center (desktop menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1">{renderLinks()}</ul>
          </div>

          {/* Right side */}
          <div className="navbar-end flex items-center gap-2 ">
        

        {

          authLoading ? <span className="loading loading-spinner text-white"></span>:
        userEmail  ? (
              <>
             
                <div className="dropdown dropdown-end">
                  <div role="button" className="btn btn-sm md:btn-md btn-ghost btn-circle avatar">
                    <div onClick={toProfile} className="w-10 rounded-full">
                      <img alt="User Profile" src={userProfileImage} />
                    </div>
                  </div>
                </div>
                   <button onClick={() => signOut()} className="btn btn-sm md:btn-md rounded-md btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <div className="ml-3 flex gap-2 md:gap-3">
                <Link href={"/login"} className="btn btn-sm md:btn-md rounded-md btn-outline ">
                  Log In
                </Link>
                <Link href={"/register"} className="btn btn-sm md:btn-md rounded-md btn-outline ">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer side for mobile */}
      <div className="drawer-side  ">
  <label htmlFor="drawer-toggle" className="drawer-overlay "></label>
  <div className="w-64 bg-primary text-white p-5 flex flex-col justify-between h-full ">
    <div>
      {/* Logo */}
      <div className="mb-4">
        <Logo place={"nav"} />
      </div>
      {/* Links */}
      <ul className="menu flex flex-col gap-2">{renderLinks()}</ul>
    </div>
  </div>
</div>

    </div>
  );
}
