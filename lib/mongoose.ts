import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Cache the database connection in development to prevent re-connecting on every request
declare global {
  var myMongoose: MongooseCache | undefined
}

let cached = global.myMongoose

if (!cached) {
  cached = global.myMongoose = { conn: null, promise: null }
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached!.conn) {
    console.log("Using cached MongoDB connection")
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true,
    }

    console.log("Creating new MongoDB connection...")
    cached!.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached!.conn = await cached!.promise
    console.log("MongoDB connected successfully")
    return cached!.conn
  } catch (e) {
    cached!.promise = null
    console.error("MongoDB connection error:", e)
    throw e
  }
}

export default connectToDatabase
