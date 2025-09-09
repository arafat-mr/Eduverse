"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { id } = params; // certificateId from URL
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Certificate ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const certificatesCollection = await dbConnect("certificates");

    // Find certificate with status 'issued'
    const certificate = await certificatesCollection.findOne({
      certificateId: id,
      status: "issued",
    });

    if (!certificate) {
      return new Response(
        JSON.stringify({ error: "Certificate not found or not issued" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        studentName: certificate.name,
        email: certificate.email,
        courseName: certificate.courseName,
        date: new Date(certificate.issuedAt).toLocaleDateString(),
        certificateId: certificate.certificateId,
      }),
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
