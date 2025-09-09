import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';


// This is the API route handler for POST requests.
// It receives new course data, adds it to the correct category in the database,
// and saves the updated data.
export async function POST(req) {
  try {
    const newCourseData = await req.json();
    const { category, ...courseContent } = newCourseData;

    // Connect to the 'courses' collection
    const collection = await dbConnect('courses');
    
    // Find the document and the specific category to update.
    // We are finding the document by its unique _id and then pushing the new course
    // into the 'courses' array of the matching category object.
    const result = await collection.updateOne(
      { 
        "categories.category": category
      },
      { 
        $push: { "categories.$.courses": courseContent } 
      }
    );

    // If no documents were modified, the category was not found.
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error adding course:', error);
    return NextResponse.json({ message: 'Error adding course' }, { status: 500 });
  }
}