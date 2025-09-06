

"use server";


import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";


export const loginUser = async (payload) => {
  const { email, password } = payload;

  // connect DB
  const usersCollection = await dbConnect("users");

  // find user
  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  // compare password
  const isPassOk = await bcrypt.compare(password, user.password);
  if (!isPassOk) return null;
    console.log('user is',user);
    
   return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
  };
};
