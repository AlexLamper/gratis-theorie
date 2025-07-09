// import { NextResponse } from "next/server"
// import connectMongoDB from "@/lib/mongodb"
// import Question from "@/models/Question"
// import TrafficSign from "@/models/TrafficSign"

// export async function GET() {
//   try {
//     // Check if MongoDB URI is configured
//     if (!process.env.MONGODB_URI) {
//       return NextResponse.json({
//         status: "error",
//         message: "MONGODB_URI environment variable not configured",
//         hasEnvVar: false,
//       })
//     }

//     // Try to connect to database using Mongoose
//     await connectMongoDB()
//     console.log("Mongoose connection successful")

//     // Count documents in collections using Mongoose models
//     const questionsCount = await Question.countDocuments()
//     const trafficSignsCount = await TrafficSign.countDocuments()

//     // Test a simple query
//     const sampleQuestion = await Question.findOne().lean()
//     const sampleSign = await TrafficSign.findOne().lean()

//     return NextResponse.json({
//       status: "success",
//       message: "Mongoose connection successful",
//       hasEnvVar: true,
//       driver: "Mongoose",
//       collections: {
//         questions: questionsCount,
//         traffic_signs: trafficSignsCount,
//       },
//       samples: {
//         hasQuestions: !!sampleQuestion,
//         hasTrafficSigns: !!sampleSign,
//       },
//       timestamp: new Date().toISOString(),
//     })
//   } catch (error) {
//     console.error("Mongoose test error:", error)
//     return NextResponse.json({
//       status: "error",
//       message: error instanceof Error ? error.message : "Unknown database error",
//       hasEnvVar: !!process.env.MONGODB_URI,
//       driver: "Mongoose",
//       error: error instanceof Error ? error.name : "UnknownError",
//     })
//   }
// }
