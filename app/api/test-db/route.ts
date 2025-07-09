import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        status: "error",
        message: "MONGODB_URI environment variable not configured",
        hasEnvVar: false,
      })
    }

    // Try to connect to database
    const { connectToDatabase } = await import("@/lib/mongodb")
    const { db } = await connectToDatabase()

    // Test the connection
    await db.admin().ping()

    // Count documents in collections
    const questionsCount = await db.collection("questions").countDocuments()
    const trafficSignsCount = await db.collection("traffic_signs").countDocuments()

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      hasEnvVar: true,
      collections: {
        questions: questionsCount,
        traffic_signs: trafficSignsCount,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown database error",
      hasEnvVar: !!process.env.MONGODB_URI,
      error: error instanceof Error ? error.name : "UnknownError",
    })
  }
}
