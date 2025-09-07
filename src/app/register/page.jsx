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
  const [imageLoaded, setImageLoaded] = useState(false); // for image load spinner
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

  // Set createdAt when component mounts
  useEffect(() => {
    const now = new Date().toISOString();
    setValue("createdAt", now);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data); // Your API function
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
    setImageLoaded(false); // reset image loaded state
    try {
      const sigRes = await fetch("/api/cloudinary-signature");
      const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", apiKey);

      console.log(formData);

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
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 text-gray-800">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
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
          className="w-full md:w-1/2 shadow-2xl p-6 rounded-lg md:mt-20 md:mb-10"
          style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
        >
          <h3 className="text-3xl font-semibold mb-6 text-center">
            Register Now
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 w-full  mx-auto relative z-10"
          >
            {/* Name */}
            <div>
              <label className="label text-black">Your Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-transparent"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label text-black">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label text-black">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="input input-bordered w-full bg-transparent pr-10"
                placeholder="Enter your password"
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

         

           {/* Profile Image */}
<div className="relative">
  <label className="label text-black">Profile Image</label>

  {/* Show spinner while uploading */}
  {uploading && (
    <div className="text-primary mb-2 flex items-center gap-2">
      Uploading<span className="loading loading-dots loading-sm"></span> 
    </div>
  )}

  {/* Show spinner while image is loading */}
  {preview && !imageLoaded && !uploading && (
    <span className="loading loading-dots loading-sm mb-2"></span>
  )}

  {/* Show image after fully loaded */}
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

  {/* File input (NOT directly stored in form) */}
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      await handleFileChange(e); // uploads to Cloudinary
    }}
    className="file-input file-input-bordered w-full bg-transparent"
  />

  {/* Hidden input registered with react-hook-form */}
  <input
    type="hidden"
    {...register("profileImage", { required: "Profile image is required" })}
  />

  {/* Validation error */}
  {errors.profileImage && (
    <p className="text-red-500 text-sm mt-1">
      {errors.profileImage.message}
    </p>
  )}
</div>

            {/* Contact Number */}
            <div>
              <label className="label text-black">Contact Number</label>
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
                className="input input-bordered w-full bg-transparent"
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
                <Link href="/login" className="text-green-500 hover:underline">
                  Login
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-6 py-3 text-center font-semibold bg-pink-500 text-white rounded-md shadow-lg hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse text-sm w-full"
              style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
            >
              {loading ? "Registering..." : "Register"}
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

export default Register;
