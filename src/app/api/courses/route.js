import { dbConnect } from "@/lib/dbConnect";

// GET /api/courses - get all courses
export async function GET() {
  try {
    const col = await dbConnect("courses");
    const courses = await col.find().toArray();

    return new Response(JSON.stringify(courses), {
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

// POST /api/courses - add new course
export async function POST(req) {
  try {
    const body = await req.json();

    // Optional: validate body fields
    if (!body.title || !body.description) {
      return new Response(
        JSON.stringify({ error: "Title and description are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await dbConnect("courses");
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
