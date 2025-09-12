"use client";
import { useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session,status } = useSession();
  const authLoading =status==='loading'
  
  return { user: session?.user || null, authLoading };
  
}

