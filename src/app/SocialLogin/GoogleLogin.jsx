"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const sesssion = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleLogin = async (providerName) => {
    setLoading(true);
    try {
      toast.success(`redirecting...`);
      await signIn("google", { callbackUrl });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="divider divider-primary">Or</div>
      <button
        onClick={() => handleGoogleLogin("google")}
        className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center gap-2 relative"
        style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
        disabled={loading}
      >
        {loading && (
          <span className="loading loading-spinner absolute left-4"></span>
        )}
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        <span>{loading ? "Logging in..." : "Continue with Google"}</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
