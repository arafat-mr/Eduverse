"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email query parameter is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }  

    const paymentsCollection = await dbConnect("payments");

    // Fetch payments for this user only
    const payments = await paymentsCollection
      .find({ status: "success", cus_email: email.trim().toLowerCase() })
      .toArray();

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching payments:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
