"use client";
import React, { useState, useEffect } from "react";

export default function AddVideo() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);

  // Fetch existing videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch("/api/video/get-videos");
    const data = await res.json();
     console.log("Fetched videos:", data); // 👀 check structure
    setVideos(data);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // 1. Get Cloudinary signature
      const sigRes = await fetch("/api/video/cloudinary-video-signature");
      const { signature, timestamp } = await sigRes.json();

      // 2. Upload video to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEYZ);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", "videos");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAMEZ}/auto/upload`,
        { method: "POST", body: formData }
      );
      const data = await uploadRes.json();

      // 3. Save URL to MongoDB
      await fetch("/api/video/save-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: file.name, videoUrl: data.secure_url }),
      });

      setFile(null);
      fetchVideos();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border rounded max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Video</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h3 className="text-lg font-semibold mb-2">Uploaded Videos</h3>
      <div className="space-y-4">
        {videos?.map((v) => (
          <video key={v._id} controls width="400" className="rounded shadow">
            <source src={v.videoUrl} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
}
