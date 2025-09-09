"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

import login from "../../assets/logIn.json";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
  setLoginError("");
  setLoading(true);

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      // fetch fresh session after login
      const session = await fetch("/api/auth/session").then((res) => res.json());

      toast.success(`Welcome ${session?.user?.name || "User"}!`);
      router.push("/");
    } else {
      setLoginError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 md:justify-between md:items-center py-10">
        {/* Lottie Animation */}
        <div className="md:w-1/2 w-full md:mt-20 lg:mt-0">
          <Lottie animationData={login} loop={true} />
        </div>

        {/* Form Section */}
        <div
          className="w-full md:w-1/2 bg-transparent p-6 rounded-lg text-black md:mt-20 lg:mt-0"
          style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
        >
          <h3 className="text-3xl font-semibold mb-6 text-center">
            Please Login
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-transparent"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="input input-bordered w-full bg-transparent pr-10"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}

            {/* Register Link */}
            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Register Now
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 w-full text-center font-semibold bg-pink-500 text-white rounded-md shadow-lg
                 hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse text-sm flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div>
                <GoogleLogin/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
