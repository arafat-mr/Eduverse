import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAMEZ,
  api_key: process.env.CLOUDINARY_API_KEYZ,
  api_secret: process.env.CLOUDINARY_API_SECRETZ,
});

export async function GET() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "videos" },
    process.env.CLOUDINARY_API_SECRET
  );

  return Response.json({ signature, timestamp });
}
