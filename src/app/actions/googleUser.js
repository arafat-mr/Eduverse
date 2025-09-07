"use server";

import dbConnect from "@/lib/dbConnect";

// Find user by email
export const findUserByEmail = async (email) => {
  const usersCollection = await dbConnect("users");
  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
  };
};

// Create new Google user
export const createUser = async ({ email, name, profileImage, role, createdAt }) => {
  const usersCollection = await dbConnect("users");

  const newUser = {
    email,
    name,
    profileImage: profileImage || "",
    role: role || "user",
    createdAt: createdAt || new Date(),
    password: null, 
  };

  const result = await usersCollection.insertOne(newUser);

  return {
    id: result.insertedId.toString(),
    ...newUser,
  };
};
