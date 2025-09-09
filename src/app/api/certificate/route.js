"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, email, courseName } = body;

    if (!userId || !name || !email || !courseName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const certificatesCollection = await dbConnect("certificates");

    
    const existing = await certificatesCollection.findOne({
      email,
      courseName,
    });

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Certificate request already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate unique certificate ID
    const certificateId = "CERT-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    const result = await certificatesCollection.insertOne({
      userId,
      name,
      email,
      courseName,
      status: "pending",
      appliedAt: new Date().toISOString(),
      issuedAt: null,
      certificateId,
    });

    return new Response(
      JSON.stringify({ message: "Certificate request created", result }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
