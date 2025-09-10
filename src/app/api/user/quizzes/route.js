"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const quizzesCollection = await dbConnect("quizzes"); 

    // Fetch all quiz documents
    const allQuizzes = await quizzesCollection.find({}).toArray();

    // Sum up the number of questions in each quiz
    const totalQuizzes = allQuizzes.reduce((sum, quiz) => sum + (quiz.questions?.length || 0), 0);

    return new Response(
      JSON.stringify({ totalQuizzes }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("❌ Error fetching total quizzes:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
