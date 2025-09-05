import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-base-200 shadow-md sticky top-0 z-50">
      <div className=" mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          EduVerse
        </div>

        {/* Main Links */}
        <div className="space-x-6">
          <Link href="/" className="hover:text-primary font-medium">
            Home
          </Link>
          <Link href="/courses" className="hover:text-primary font-medium">
            Courses
          </Link>
          <Link href="/contact" className="hover:text-primary font-medium">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-base-100 hover:text-white transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-base-100 text-white rounded-lg hover:bg-white transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
