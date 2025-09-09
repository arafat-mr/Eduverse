"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const coursesCollection = await dbConnect("course_resources");
    const totalCourses = await coursesCollection.countDocuments();

    return new Response(
      JSON.stringify({ totalCourses }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
