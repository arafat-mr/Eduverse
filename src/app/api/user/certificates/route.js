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

    const certificatesCollection = await dbConnect("certificates");

    // Normalize email to lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Fetch issued certificates for this user
    const myCertificates = await certificatesCollection
      .find({ email: cleanEmail, status: "issued" })
      .toArray();

    console.log("Certificates found for", cleanEmail, ":", myCertificates.length);

    return new Response(
      JSON.stringify({
        totalCertificates: myCertificates.length,
        certificates: myCertificates,
      }),
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
