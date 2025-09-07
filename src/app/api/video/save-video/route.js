import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { videoUrl } = await req.json();

    if (!videoUrl) {
      return new Response(
        JSON.stringify({ message: "videoUrl is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // dbConnect already returns the collection
    const videosCollection = await dbConnect("videos");

    const result = await videosCollection.insertOne({
      videoUrl,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Save video error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to save video" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
