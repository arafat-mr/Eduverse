import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">Eduverse</div>

        {/* Main Links */}
        <div className="space-x-6 text-white">
          <Link
            href="/"
            className="hover:text-green-100 font-medium transition"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="hover:text-green-100 font-medium transition"
          >
            Courses
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-100 font-medium transition"
          >
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-100 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
