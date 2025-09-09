import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const col = await dbConnect("courses");
  const course = await col.findOne({ _id: new ObjectId(params.id) });
  if (!course) return new Response("Not Found", { status: 404 });
  return Response.json(course);
}
