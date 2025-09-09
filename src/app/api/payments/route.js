"use server";

import { dbConnect } from "@/lib/dbConnect";


export async function GET(req) {
  try {
    const paymentsCollection = await dbConnect("payments"); 
    const payments = await paymentsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch payments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
