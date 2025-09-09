import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    const coursesCollection = await dbConnect("courses");

    let query = {};
    if (title) {
      query = { title: title }; 
    }

    const courses = await coursesCollection.find(query).toArray();

    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch courses" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
