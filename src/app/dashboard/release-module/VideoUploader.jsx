import React, { useState } from 'react';
import {
  FaCloudUploadAlt,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const VideoUploader = ({
  courseTitle,
  moduleName,
  uploadedVideos,
  setUploadedVideos,
  onSave,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // 1. Get Cloudinary signature
      const sigRes = await fetch('/api/video/cloudinary-video-signature');
      const { signature, timestamp } = await sigRes.json();

      // 2. Upload video to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      // NOTE: Use your environment variables here. The component is just a placeholder.
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEYZ);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('folder', 'videos');

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAMEZ}/auto/upload`,
        { method: 'POST', body: formData }
      );
      const data = await uploadRes.json();

      // 3. Prepare data and save URL to MongoDB
      const payload = {
        courseTitle, 
        moduleName, 
        videos: [
          {
            title: file.name.split('.')[0],
            description: '',
            url: data.public_id,
            status: 'uploaded',
          },
        ],
      };

      const saveRes = await fetch('/api/video/release-module', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) {
        throw new Error('Failed to save video URL to database.');
      }

      setFile(null); // Clear the selected file
      toast.success('Video uploaded and saved!');
      // You may want to update the main state to show the new video
      // This part depends on how you fetch/display the uploaded list.
      // For now, let's assume you'll manually manage the list.
      // setUploadedVideos(prev => [...prev, videoData]);
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Video upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // const handleDeleteVideo = async (videoId) => {
  //   setUploadedVideos(uploadedVideos.filter((v) => v.id !== videoId));
  //   // TODO: Call your backend API to delete the video from Cloudinary
  //   try {
  //     await fetch(`/api/cloudinary-video-delete/${videoId}`, {
  //       method: 'DELETE',
  //     }); // Use fetch
  //     toast.success('Video deleted from server.');
  //   } catch (error) {
  //     console.error('Failed to delete video:', error);
  //     toast.error('Failed to delete video from server.');
  //   }
  // };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Step 2: Upload Videos for "{moduleName}"
      </h2>

      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center mb-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => document.getElementById('file-upload').click()}
      >
        <FaCloudUploadAlt className="text-5xl text-gray-500 mx-auto mb-3" />
        <p className="text-gray-700">
          Drag & Drop Your Videos Here or Click to Upload
        </p>
        <input
          id="file-upload"
          type="file"
          multiple // The new code only handles one file, so you might need to adjust this.
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploading && (
        <div className="text-center text-blue-600 mb-4">
          Uploading... Please wait.
        </div>
      )}

      {file && (
        <div className="mb-4 p-4 border rounded-md bg-gray-800 flex items-center justify-between">
          <span>Selected File: {file.name}</span>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Now'}
          </button>
        </div>
      )}

      {uploadedVideos.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Videos in Module</h3>
          <ul className="space-y-4 mb-6">
            {uploadedVideos.map((video, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-md bg-gray-50"
              >
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <div className="flex-grow">
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => {
                      const newVids = [...uploadedVideos];
                      newVids[index].title = e.target.value;
                      setUploadedVideos(newVids);
                    }}
                    className="font-semibold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">{video.url}</p>
                  <textarea
                    value={video.description}
                    onChange={(e) => {
                      const newVids = [...uploadedVideos];
                      newVids[index].description = e.target.value;
                      setUploadedVideos(newVids);
                    }}
                    className="w-full mt-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Add a brief description..."
                    rows="2"
                  />
                </div>
                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash className="text-xl" />
                </button>
              </li>
            ))}
          </ul>
          {/* Note: The final Save button is now redundant if you save video-by-video.
              If you want to save all at once, you need to change the logic. */}
        </>
      )}
    </div>
  );
};

export default VideoUploader;
