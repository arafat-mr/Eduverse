
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const email = params.email;
    const usersCollection = await dbConnect("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    
    const { password, ...safeUser } = user;

    return new Response(JSON.stringify(safeUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
