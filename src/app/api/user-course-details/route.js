import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    
    const paymentsCollection =await  dbConnect("payments");
    const courseResources = await dbConnect("course_resources");

    // Step 1: success course names
    const payments = await paymentsCollection
      .find({ cus_email: email, status: "success" })
      .project({ course_name: 1, _id: 0 })
      .toArray();

    const courseNames = payments.map((p) => p.course_name);

    if (courseNames.length === 0) {
      return NextResponse.json({
        success: true,
        email,
        courses: [],
        count: 0,
      });
    }

    // Step 2: course details
    const coursesDetails = [];
    for (const name of courseNames) {
      const course = await courseResources.findOne(
        { "courses.title": name },
        { projection: { "courses.$": 1 } }
      );
      if (course && course.courses && course.courses.length > 0) {
        coursesDetails.push(course.courses[0]);
      }
    }

    return NextResponse.json({
      success: true,
      email,
      courses: coursesDetails,
      count: coursesDetails.length,
    });
  } catch (error) {
    console.error("Error fetching user course details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
