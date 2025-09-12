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

    // Collections connect
    const paymentsCollection = await dbConnect("payments");
    const coursesCollection = await dbConnect("courses");
    const courseResourcesCollection = await dbConnect("course_resources");

    // Step 1: Get all purchased course names
    const payments = await paymentsCollection
      .find({ cus_email: email, status: "success" })
      
      .sort({pay_at: -1})
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

    const coursesDetails = [];

    for (const name of courseNames) {
      // Step 2: Get course info from 'courses' collection
      const courseDoc = await coursesCollection.findOne(
        { "categories.courses.title": name },
        { projection: { "categories.$": 1 } }
      );

      if (
        courseDoc &&
        courseDoc.categories &&
        courseDoc.categories.length > 0
      ) {
        const category = courseDoc.categories[0];
        const course = category.courses.find((c) => c.title === name);

        if (course) {
          // Step 3: Get modules from course_resources
          const resourceDoc = await courseResourcesCollection.findOne(
            { "courses.title": name },
            { projection: { "courses.$": 1, category: 1 } }
          );

          let modules = [];
          if (
            resourceDoc &&
            resourceDoc.courses &&
            resourceDoc.courses.length > 0
          ) {
            modules = resourceDoc.courses[0].modules || [];
          }

          coursesDetails.push({
            title: course.title,
            totalClasses: course.totalClasses,
            courseDuration: course.courseDuration,
            weeklyClasses: course.weeklyClasses,
            totalHours: course.totalHours,
            project: course.project,
            courseImage: course.courseImage,
            instructor: course.instructor,
            modules, // এখানে course_resources থেকে নেওয়া হচ্ছে
            category: category.category,
          });
        }
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
