"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const adminLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile Management" },
  { href: "/dashboard/addcourse", label: "Add/Update Courses & Videos" },
  { href: "/dashboard/students", label: "Student Management" },
  { href: "/dashboard/payments", label: "Payment Management" },
  { href: "/dashboard/certificates", label: "Certificates" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth(); // get user object with role

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard"); // redirect student or other roles
    }
  }, [user, router]);

  if (!user) return <div>Loading...</div>; // waiting for auth

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-secondary">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md transition-all ${
                pathname === link.href
                  ? "bg-accent text-black font-semibold shadow-md"
                  : "hover:bg-secondary/40 text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-base-100">
        <div className="bg-white rounded-xl shadow p-6">{children}</div>
      </main>
    </div>
  );
}
