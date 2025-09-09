"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  const { id } = params;
  console.log("Fetching certificateId:", id);

  try {
    const certificatesCollection = await dbConnect("certificates");

   const cert = await certificatesCollection.findOne({ certificateId: id });

    console.log("Certificate found:", cert);

    if (!cert) {
      return new Response(
        JSON.stringify({ error: "Certificate not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(cert),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Error fetching certificate:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
