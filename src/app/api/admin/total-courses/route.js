"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const coursesCollection = await dbConnect("course_resources");

    // Fetch all categories
    const categories = await coursesCollection.find({}).toArray();

    // Count total courses across all categories
    const totalCourses = categories.reduce(
      (sum, category) => sum + (category.courses?.length || 0),
      0
    );

    return new Response(
      JSON.stringify({ totalCourses }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
