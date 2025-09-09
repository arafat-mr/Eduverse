"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  console.log(profile);
  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!imageFile) return profile.image || "";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "eduverse"); // make sure you have a preset in Cloudinary

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image: imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setProfile({ name, email, image: imageUrl });
      setSuccess("Profile updated successfully!");
      setImageFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>

      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      {profile.image && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Current Profile Image:</h2>
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}
    </div>
  );
}
