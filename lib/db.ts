import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/Makhana";

  if (!MONGODB_URI) {
    throw new Error("Please add MONGODB_URI in .env.local or .env");
  }

  console.log("[DB] connectDB using MONGODB_URI=", MONGODB_URI);

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}