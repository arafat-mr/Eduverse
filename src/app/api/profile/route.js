import { dbConnect } from "@/lib/dbConnect";

// GET /api/profile - get admin profile
export async function GET() {
  try {
    const col = await dbConnect("users");
    const profile = await col.findOne({});
    return new Response(JSON.stringify(profile || {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST /api/profile - update admin profile
export async function POST(req) {
  try {
    const body = await req.json();
    const col = await dbConnect("profiles");

    const result = await col.updateOne({}, { $set: body }, { upsert: true });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
