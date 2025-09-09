"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        // encodeURIComponent in case email has special characters
        const res = await fetch(`/api/usersProfile/${encodeURIComponent(session.user.email)}`);
      
        
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        console.log(data);
        
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
    <div className="max-w-3xl mx-auto p-6 bg-blue-800 text-white rounded-xl shadow-lg mt-10">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src={userData.profileImage || "/default-profile.png"}
          alt={userData.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
        />
        {/* Name */}
        <h1 className="text-3xl font-bold mt-4">{userData.name}</h1>
        {/* Email */}
        <p className="text-lg text-gray-300 mt-1">{userData.email}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Number */}
        <div className="p-4  rounded-lg shadow flex flex-col">
          <h2 className="font-semibold text-lg mb-2">Contact Number</h2>
          <p className="text-gray-300">{userData.contactNumber || "N/A"}</p>
        </div>

        {/* Role */}
        <div className="p-4  rounded-lg shadow flex flex-col">
          <h2 className="font-semibold text-lg mb-2">Role</h2>
          <p className="text-gray-300">{userData.role}</p>
        </div>

        {/* Account Created */}
        <div className="p-4  rounded-lg shadow flex flex-col">
          <h2 className="font-semibold text-lg mb-2">Account Created</h2>
          <p className="text-gray-300">{new Date(userData.createdAt).toLocaleString()}</p>
        </div>

        
      </div>
      </div>)
}

