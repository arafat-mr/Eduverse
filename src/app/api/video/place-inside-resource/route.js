// /app/api/video/place-inside-resource/route.js
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

export async function PATCH(req) {
  try {
    const { category, title } = await req.json();

    if (!category || !title) {
      return NextResponse.json(
        { message: 'Category and course title are required.' },
        { status: 400 }
      );
    }

    const collection = await dbConnect('course_resources');

    const newCourse = {
      title,
      modules: [] // empty modules array
    };

    // Push the new course inside the category
    const result = await collection.updateOne(
      { category },
      { $push: { courses: newCourse } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Category not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Course added successfully', course: newCourse, result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
