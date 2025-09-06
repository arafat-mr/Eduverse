"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  const linkStyle =
    "text-base hover:scale-105  hover:bg-transparent hover:text-accent hover:font-semibold hover:shadow-lg hover:shadow-accent transform transition-all rounded-md font-medium px-4 duration-1000";

  const activeStyle =
    "text-base scale-105  text-accent font-semibold shadow-lg shadow-accent transform transition-all rounded-md font-medium px-4 duration-1000 border-b-accent border-b-4 ";
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
   {/* <li
  className={`${linkStyle} ${pathname.startsWith("/admin") ? activeStyle : ""}`}
>
  <Link href="/admin"> Admin </Link>
</li> */}

    </>
  );
  return (
    <div className="bg-linear-to-r from-secondary via-primary to-accent py-2 sticky top-0 z-50000">
      <div className="navbar text-white max-w-11/12 mx-auto">
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

          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end ">
          <div className="md:flex gap-3 hidden">
            <Link href={"/login"} className="btn btn-outline">
              Log In
            </Link>
            <Link href={"/register"} className="btn btn-outline">
              Register
            </Link>
          </div>
          {/* <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
