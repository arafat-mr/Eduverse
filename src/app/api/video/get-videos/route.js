import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const videos = await dbConnect("videos").find({}).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), { status: 500 });
  }
}
