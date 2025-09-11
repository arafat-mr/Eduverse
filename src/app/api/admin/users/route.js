"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await dbConnect("users");
    const totalUsers = await usersCollection.countDocuments();

    return new Response(
      JSON.stringify({ totalUsers }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
