"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/usersProfile/${encodeURIComponent(session.user.email)}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">No user data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen 0 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Profile Card */}
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center text-white">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={userData.profileImage || "/default-profile.png"}
            alt={userData.name}
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 rounded-full object-cover border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Name and Email */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-5 text-center">
          {userData.name}
        </h1>
        <p className="text-sm sm:text-lg text-gray-300 mt-1 text-center">{userData.email}</p>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1   lg:grid-cols-3 gap-6 w-full">
          {/* Contact Number */}
          <div className="p-4 sm:p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center">Contact Number</h2>
            <p className="text-sm sm:text-lg text-center">{userData.contactNumber || "N/A"}</p>
          </div>

          {/* Role */}
          <div className="p-4 sm:p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center">Role</h2>
            <p className="text-sm sm:text-lg capitalize text-center">{userData.role}</p>
          </div>

          {/* Account Created */}
          <div className="p-4 sm:p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-center">Account Created</h2>
            <p className="text-sm sm:text-lg text-center">
              {new Date(userData.createdAt).toLocaleString()}
            </p>
            {/* <Link className="btn">apply</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
