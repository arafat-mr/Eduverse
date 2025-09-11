"use client";

import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import registerlottie from "../../assets/signup.json";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../actions/registerUser";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      profileImage: "",
      role: "user",
      createdAt: "",
    },
  });

  useEffect(() => {
    const now = new Date().toISOString();
    setValue("createdAt", now);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success("Successfully registered!");
      reset();
      setPreview(null);
      setImageLoaded(false);
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setImageLoaded(false);
    try {
      const sigRes = await fetch("/api/cloudinary-signature");
      const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", apiKey);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        setValue("profileImage", data.secure_url);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      console.error("Signed upload error:", err);
      toast.error("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D6DAC8] to-[#d9c4b0] text-[#000000]">
      <div className="max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10 p-5 md:px-5 py-10 mx-auto">
        {/* Lottie */}
        <div className="w-full md:w-1/2 flex justify-center md:mt-20 md:mb-10">
          <Lottie
            animationData={registerlottie}
            loop={true}
            className="w-[80%] max-w-md"
          />
        </div>

        {/* Form */}
        <div
          className="w-full md:w-1/2 bg-[#ffffff]/80 p-6 rounded-lg md:mt-20 md:mb-10"
          style={{ boxShadow: "0 0 15px rgba(18, 65, 112, 0.5)" }}
        >
          <h3 className="text-3xl font-semibold mb-6 text-center text-[#124170]">
            Register Now
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 w-full mx-auto relative z-10"
          >
            {/* Name */}
            <div>
              <label className="label font-medium text-[#124170]">Your Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000]"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium text-[#124170]">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label font-medium text-[#124170]">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000] pr-10"
                placeholder="Enter your password"
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

            {/* Profile Image */}
            <div className="relative">
              <label className="label font-medium text-[#124170]">Profile Image</label>
              {uploading && (
                <div className="text-[#124170] mb-2 flex items-center gap-2">
                  Uploading <span className="loading loading-dots loading-sm"></span>
                </div>
              )}
              {preview && !imageLoaded && !uploading && (
                <span className="loading loading-dots loading-sm mb-2"></span>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Profile"
                  className={`w-24 h-24 object-cover rounded-full border ${
                    imageLoaded ? "block mb-2" : "hidden"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  await handleFileChange(e);
                }}
                className="file-input file-input-bordered w-full bg-[#D6DAC8]"
              />
              <input
                type="hidden"
                {...register("profileImage", { required: "Profile image is required" })}
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="label font-medium text-[#124170]">Contact Number</label>
              <input
                type="tel"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\+\d{7,15}$/,
                    message:
                      "Enter a valid number starting with + and country code",
                  },
                })}
                className="input input-bordered w-full bg-[#D6DAC8] text-[#000000]"
                placeholder="e.g. +14155552671"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            {/* Already have account */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 text-sm">
                <p>Already have an account?</p>
                <Link href="/login" className="text-[#124170] hover:underline">
                  Login
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-6 py-3 text-center font-semibold bg-[#124170] text-white rounded-md shadow-md hover:bg-[#0e3156] transition duration-300 w-full"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="pt-2">
              <GoogleLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
