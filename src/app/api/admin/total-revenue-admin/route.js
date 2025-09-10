"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const txCollection = await dbConnect("payments");
    const transactions = await txCollection.find({}).toArray();

    // return full array with amount + pay_at field
    const mapped = transactions.map(t => ({
      amount: t.amount || 0,
      pay_at: t.pay_at || t.createdAt || new Date().toISOString(),
    }));

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
