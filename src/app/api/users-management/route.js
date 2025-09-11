"use server";

import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const usersCollection = await dbConnect("users");

   
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
