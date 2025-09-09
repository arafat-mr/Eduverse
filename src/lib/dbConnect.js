"use server";

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

let client;
let clientPromise;

// Global connection to prevent multiple connections in dev
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function dbConnect(collectionName) {
  const conn = await clientPromise;
  return conn.db(process.env.DB_NAME).collection(collectionName);
}
