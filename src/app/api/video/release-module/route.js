/* import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';


export async function PATCH(req) {
  try {
    console.log('Hit Korse Bhai');
    const { courseTitle, moduleName, videos } = await req.json();
    console.log('Received data:', { courseTitle, moduleName, videos });
    // Ensure all required data is present
    if (!courseTitle || !moduleName || !videos || !Array.isArray(videos)) {
      return NextResponse.json(
        { message: 'Missing required fields: courseTitle, moduleName, or videos array.' },
        { status: 400 }
      );
    }

    // Connect to the 'courses' collection
    const coursesCollection = await dbConnect('courses');
    
    // Create the new module object with the videos
    const newModule = {
      moduleName,
      videos
    };

    // Find the course by its title and update it
    const result = await coursesCollection.updateOne(
      { "categories.courses.title": courseTitle },
      {
        $push: {
          "categories.$[cat].courses.$[course].modules": newModule
        }
      },
      {
        arrayFilters: [
          { "cat.category": { $exists: true } }, // Filter for categories array
          { "course.title": courseTitle }     // Filter for the specific course by title
        ]
      }
    );

    // Check if the update was successful
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Course not found. Check the course title.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Videos successfully added to the module.', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding videos to module:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
} */
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

export async function PATCH(req) {
  try {
    const { courseTitle, moduleName, videos, category } = await req.json();

    console.log('Received data:', {
      courseTitle,
      moduleName,
      videos,
      category,
    });

    // Validate input
    if (!courseTitle || !moduleName || !Array.isArray(videos)) {
      return NextResponse.json(
        {
          message:
            'Missing required fields: courseTitle, moduleName, or videos array.',
        },
        { status: 400 }
      );
    }

    // Connect to the 'course_resources' collection
    const coursesCollection = await dbConnect('course_resources');

    // New module object
    const newModule = { moduleName, videos };

    // Build query
    const query = category
      ? { category: category, 'courses.title': courseTitle }
      : { 'courses.title': courseTitle };

    // Update the specific course
    const result = await coursesCollection.updateOne(
      query,
      {
        $push: {
          'courses.$[course].modules': newModule,
        },
      },
      {
        arrayFilters: [{ 'course.title': courseTitle }],
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Course not found. Check the course title or category.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Videos successfully added to the module.', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding videos to module:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
