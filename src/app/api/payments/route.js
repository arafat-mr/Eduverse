"use server"

import { dbConnect } from "@/lib/dbConnect";







// GET /api/payments - get all payments
export async function GET() {
  try {
    const col = await dbConnect("payments");
    const payments = await col.find().toArray();

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ "error": err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST /api/payments - record a new payment
export async function POST(req) {
  try {
    const body = await req.json();

    // Optional: validate required fields
    if (!body.userId || !body.amount || !body.method) {
      return new Response(
        JSON.stringify({ "error": "userId, amount, and method are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await dbConnect("payments");
    const result = await col.insertOne(body);

    return new Response(
      JSON.stringify({ "_id": result.insertedId, ...body }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      "status": 500,
      "headers": { "Content-Type": "application/json" },
    });
  }
}


