


"use server"
import bcrypt from 'bcrypt'
import dbConnect from '@/lib/dbConnect'

export const registerUser=async(payload)=>{

    const usersCollection = await dbConnect('users')
console.log(payload);
const existingUser = await usersCollection.findOne({ email: payload.email });
if (!existingUser) {
    const hashedPasss= await bcrypt.hash(payload.password,10)
    payload.password=hashedPasss
    const result = await usersCollection.insertOne(payload);
     return { success: true, insertedId: result.insertedId.toString() };
  }
  return { success: false, message: "User already exists" };
}