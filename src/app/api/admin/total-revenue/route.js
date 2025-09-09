"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const txCollection = await dbConnect("payments");
    const transactions = await txCollection.find({}).toArray();
    const totalRevenue = transactions.reduce((acc, t) => acc + (t.amount || 0), 0);

    return new Response(
      JSON.stringify({ totalRevenue }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
