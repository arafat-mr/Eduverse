"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const paymentsCollection = await dbConnect("payments");

    // Fetch all successful payments
    const payments = await paymentsCollection.find({ status: "success" }).toArray();

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
