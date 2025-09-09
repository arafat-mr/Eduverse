"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  HiOutlineHome, HiUser, HiPlusCircle, HiUsers, HiCurrencyDollar,
  HiBadgeCheck, HiClipboardList, HiBookOpen, HiClipboardCheck
} from "react-icons/hi";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: HiOutlineHome, allowedRoles: ["admin", "user"] },
  { href: "/dashboard/profile", label: "Profile Management", icon: HiUser, allowedRoles: ["admin", "user"] },
  { href: "/dashboard/addcourse", label: "Add/Update Courses & Videos", icon: HiPlusCircle, allowedRoles: ["admin"] },
  { href: "/dashboard/students", label: "Users Management", icon: HiUsers, allowedRoles: ["admin"] },
  { href: "/dashboard/payments", label: "Payment Management", icon: HiCurrencyDollar, allowedRoles: ["admin"] },
  { href: "/dashboard/certificates", label: "Certificates", icon: HiBadgeCheck, allowedRoles: ["admin"] },
  { href: "/dashboard/userCertificates", label: "My Certificates", icon: HiClipboardList, allowedRoles: ["user"] },
  { href: "/dashboard/userCourses", label: "My Courses", icon: HiBookOpen, allowedRoles: ["user"] },
  { href: "/dashboard/userQuizzes", label: "My Quizzes", icon: HiClipboardCheck, allowedRoles: ["user"] },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const userRole = session?.user?.role || "user";

  const filteredLinks = links.filter(link => link.allowedRoles.includes(userRole));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-200">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex w-64 bg-primary text-white shadow-lg flex-col">
        <div className="p-6 border-b border-secondary text-center">
          <p className="text-sm text-gray-200 uppercase mb-1">Welcome</p>
          <h2 className="text-2xl font-bold capitalize">{userName}</h2>
          <p className="text-sm text-gray-200 capitalize">{userRole}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  pathname === link.href
                    ? "bg-accent text-black font-semibold shadow-md"
                    : "hover:bg-secondary/40 text-white"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content + top links for small screens */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for small devices */}
        <div className="md:hidden bg-primary text-white shadow-lg p-4 text-center">
          <p className="text-sm uppercase mb-1">Welcome</p>
          <h2 className="text-xl font-bold capitalize">{userName}</h2>
          <p className="text-sm capitalize">{userRole}</p>

          {/* Links stacked vertically */}
          <nav className="mt-4 flex flex-col space-y-2">
            {filteredLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all whitespace-nowrap ${
                    pathname === link.href
                      ? "bg-accent text-black font-semibold shadow-md"
                      : "hover:bg-secondary/40 text-white"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Outlet / main content */}
        <main className="flex-1 p-6 bg-[#031043] overflow-auto">
          <div className="rounded-xl shadow-xl p-6 overflow-auto bg-blue-900">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
