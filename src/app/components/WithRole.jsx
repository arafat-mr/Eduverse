"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotFound from "../not-found";
const WithRole = (WrappedComponent, allowedRoles = []) => {
  const RoleProtected = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; 

      if (!session) {
        // Not logged in
        router.replace("/login");
        return;
      }

      if (!allowedRoles.includes(session.user.role)) {
        // Role not allowed
        router.replace("/not-found"); 
      }
    }, [session, status, router]);

    if (status === "loading" || !session || !allowedRoles.includes(session?.user?.role)) {
      
      return (
        <div className="flex justify-center items-center h-screen text-white">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return RoleProtected;
};

export default WithRole;
