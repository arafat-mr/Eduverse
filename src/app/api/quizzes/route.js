// src/app/api/quizzes/route.js

"use server";

import { dbConnect } from "@/lib/dbConnect";

// GET all quizzes
export async function GET() {
  try {
    const collection = await dbConnect("quizzes");
    const quizzes = await collection.find().toArray();
    return new Response(JSON.stringify({ success: true, quizzes }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

// POST quiz
export async function POST(req) {
  try {
    const collection = await dbConnect("quizzes");
    const body = await req.json();
    const now = new Date();

    if (Array.isArray(body)) {
      body.forEach(doc => {
        doc.createdAt = now;
        doc.updatedAt = now;
      });
      const result = await collection.insertMany(body);
      return new Response(JSON.stringify({ success: true, result }), { status: 201 });
    } else {
      body.createdAt = now;
      body.updatedAt = now;
      const result = await collection.insertOne(body);
      return new Response(JSON.stringify({ success: true, result }), { status: 201 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
