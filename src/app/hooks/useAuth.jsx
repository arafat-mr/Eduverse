"use client";
import { useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session } = useSession();
  return session?.user || null;
}
