import { dbConnect } from "@/lib/dbConnect";

// GET /api/certificates - get all certificates
export async function GET() {
  try {
    const col = await dbConnect("certificates");
    const certs = await col.find().toArray();

    return new Response(JSON.stringify(certs), {
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

// POST /api/certificates - add new certificate
export async function POST(req) {
  try {
    const body = await req.json();

    // Optional: validate required fields
    if (!body.title || !body.studentId) {
      return new Response(
        JSON.stringify({ error: "Title and studentId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await dbConnect("certificates");
    const result = await col.insertOne(body);

    return new Response(
      JSON.stringify({ _id: result.insertedId, ...body }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
