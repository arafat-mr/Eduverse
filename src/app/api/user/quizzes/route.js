"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const paymentsCollection = await dbConnect("payments");
    const quizzesCollection = await dbConnect("quizzes");

    // Get all successful payments for this user
    const myPayments = await paymentsCollection
      .find({ cus_email: email, status: "success" })
      .toArray();

    // Extract purchased course names
    const purchasedCourses = myPayments.map(p => p.course_name);

    // Find quizzes where category matches any purchased course
    const availableQuizzes = await quizzesCollection
      .find({ category: { $in: purchasedCourses } })
      .toArray();

    return new Response(
      JSON.stringify({ totalQuizzes: availableQuizzes.length, quizzes: availableQuizzes }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
