// import dbConnect from "@/lib/dbConnect";


// export async function POST(req) {
//   try {
//     const { videoUrl } = await req.json();
//     const db = await dbConnect();
//     const videos = db.collection("videos");

//     await videos.insertOne({ videoUrl, createdAt: new Date() });

//     return Response.json({ success: true, message: "Video saved" });
//   } catch (error) {
//     console.error("Save video error:", error);
//     return new Response(JSON.stringify({ error: "Failed to save video" }), { status: 500 });
//   }
// }
// src/app/api/video/save-video/route.js
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, videoUrl } = body;

    if (!title || !videoUrl) {
      return new Response(
        JSON.stringify({ error: "title and videoUrl are required" }),
        { status: 400 }
      );
    }

    const videosCollection = dbConnect("videos");
    await videosCollection.insertOne({
      title,
      videoUrl,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Video saved successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving video:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save video" }),
      { status: 500 }
    );
  }
}

