"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import login from "../../assets/logIn.json";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
        const session = await fetch("/api/auth/session").then((res) =>
          res.json()
        );

        toast.success(`Welcome ${session?.user?.name || "User"}!`);

        router.push(callbackUrl);
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
    <div className="min-h-screen bg-gradient-to-r from-[#D6DAC8] to-[#d9c4b0] text-[#000000]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 md:justify-between md:items-center py-10">
        {/* Lottie Animation */}
        <div className="md:w-1/2 w-full md:mt-20 lg:mt-0">
          <Lottie animationData={login} loop={true} />
        </div>

        {/* Form Section */}
        <div
          className="w-full md:w-1/2 bg-[#ffffff]/70 p-6 rounded-lg text-black md:mt-20 lg:mt-0"
          style={{ boxShadow: "0 0 15px rgba(18, 65, 112, 0.5)" }}
        >
          <h3 className="text-3xl font-semibold mb-6 text-center text-[#124170]">
            Please Login
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label font-medium text-[#124170]">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000]"
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
              <label className="label font-medium text-[#124170]">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000] pr-10"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
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
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            {/* Register Link */}
            <p className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#124170] hover:underline">
                Register Now
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 w-full text-center font-semibold bg-[#124170] text-white rounded-md shadow-md hover:bg-[#0e3156] transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div>
              <GoogleLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
