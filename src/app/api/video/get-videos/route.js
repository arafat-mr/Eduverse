// app/api/get-videos/route.js
 // adjust path if needed

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const videosCollection = await dbConnect("videos");
    const videos = await videosCollection.find({}).toArray();

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch videos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
