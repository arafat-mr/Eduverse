"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // this is certificateId string
    const body = await req.json();

    const { status } = body;
    if (!status) {
      return new Response(
        JSON.stringify({ error: "Missing status field" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const certificatesCollection = await dbConnect("certificates");

    const result = await certificatesCollection.updateOne(
      { certificateId: id },
      { $set: { status: status, issuedAt: status === "issued" ? new Date().toISOString() : null } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Certificate not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Certificate status updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
