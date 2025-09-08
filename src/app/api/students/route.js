import { dbConnect } from "@/lib/dbConnect";

// GET /api/students - get all students
export async function GET() {
  try {
    const col = await dbConnect("students");
    const students = await col.find().toArray();

    return new Response(JSON.stringify(students), {
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

// POST /api/students - add new student
export async function POST(req) {
  try {
    const body = await req.json();

    // Optional: validate required fields
    if (!body.name || !body.email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await dbConnect("students");
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
