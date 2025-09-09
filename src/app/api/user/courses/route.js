"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email")?.trim().toLowerCase();

    const paymentsCollection = await dbConnect("payments");

    // Fetch only successful payments for this user
    const myCourses = await paymentsCollection
      .find({ cus_email: email, status: "success" })
      .toArray();

    return new Response(
      JSON.stringify({ totalCourses: myCourses.length, courses: myCourses }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
