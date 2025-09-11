"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const certificatesCollection = await dbConnect("certificates");

    // Fetch all certificates (pending + issued), latest applied first
    const certificates = await certificatesCollection
      .find({})
      .sort({ appliedAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ certificates }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching certificates:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
