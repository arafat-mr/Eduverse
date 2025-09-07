import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
   const coursesCollection = await dbConnect("courses");
   const courses = await coursesCollection.find({}).toArray();
    

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