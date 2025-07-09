import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  console.warn("MongoDB URI not found in environment variables")
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxIdleTimeMS: 30000,
  // SSL/TLS configuration for Vercel
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

// Only create client if URI is available
if (uri) {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

// Cache for database connections
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!uri) {
    throw new Error("MongoDB URI is not configured")
  }

  if (!clientPromise) {
    throw new Error("MongoDB client is not initialized")
  }

  try {
    if (cachedDb && client) {
      // Test if connection is still alive with timeout
      const pingPromise = cachedDb.admin().ping()
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Ping timeout")), 3000))

      await Promise.race([pingPromise, timeoutPromise])
      return { client, db: cachedDb }
    }

    console.log("Establishing new MongoDB connection...")
    const connectedClient = await clientPromise
    const db = connectedClient.db("gratis-theorie")

    // Test the connection with timeout
    const pingPromise = db.admin().ping()
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timeout")), 5000))

    await Promise.race([pingPromise, timeoutPromise])
    console.log("MongoDB connection successful")

    cachedDb = db
    client = connectedClient

    return { client: connectedClient, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    cachedDb = null // Reset cache on error

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("SSL") || error.message.includes("TLS")) {
        throw new Error("SSL/TLS connection error. Please check MongoDB Atlas configuration.")
      }
      if (error.message.includes("authentication")) {
        throw new Error("Authentication failed. Please check username and password.")
      }
      if (error.message.includes("timeout")) {
        throw new Error("Connection timeout. Please check network access settings.")
      }
    }

    throw error
  }
}

export default clientPromise
