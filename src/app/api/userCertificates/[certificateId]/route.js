"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const certificateId = url.pathname.split("/").pop(); // get dynamic param
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email query parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const certificatesCollection = await dbConnect("certificates");

    // Just fetch the existing certificate
    const certificate = await certificatesCollection.findOne({
      certificateId,
      email: email.trim().toLowerCase(),
    });

    if (!certificate) {
      return new Response(
        JSON.stringify({ error: "Certificate not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ certificate }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Error fetching certificate:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
