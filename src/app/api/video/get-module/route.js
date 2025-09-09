import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

export async function GET(req) {
  try {
    // URL থেকে search params নেওয়া
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // Optional
    const courseTitle = searchParams.get('courseTitle'); // Optional

    const coursesCollection = await dbConnect('course_resources');

    // Query বানানো
    let query = {};
    if (category) {
      query.category = category;
    }

    if (courseTitle) {
      query['courses.title'] = courseTitle;
    }

    // Collection থেকে ডেটা ফেচ করা
    const data = await coursesCollection.find(query).toArray();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: 'No courses found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
