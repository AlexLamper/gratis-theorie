// import { NextResponse } from "next/server"
// import connectMongoDB from "@/lib/mongodb"
// import Question from "@/models/Question"

// export async function GET() {
//   try {
//     await connectMongoDB()

//     // Get categories with question counts
//     const categories = await Question.aggregate([
//         {
//           $group: {
//             _id: "$category",
//             count: { $sum: 1 },
//             difficulties: { $addToSet: "$difficulty" },
//           },
//         },
//         {
//           $project: {
//             category: "$_id",
//             questionCount: "$count",
//             difficulties: 1,
//             _id: 0,
//           },
//         },
//       ])

//     // If no categories found, return default categories
//     if (categories.length === 0) {
//       return NextResponse.json({
//         categories: [
//           { category: "auto", questionCount: 500, difficulties: ["easy", "medium", "hard"] },
//           { category: "scooter", questionCount: 300, difficulties: ["easy", "medium", "hard"] },
//           { category: "motor", questionCount: 400, difficulties: ["easy", "medium", "hard"] },
//         ],
//       })
//     }

//     return NextResponse.json({ categories })
//   } catch (error) {
//     console.error("Error fetching categories:", error)

//     // Return default categories on error
//     return NextResponse.json({
//       categories: [
//         { category: "auto", questionCount: 500, difficulties: ["easy", "medium", "hard"] },
//         { category: "scooter", questionCount: 300, difficulties: ["easy", "medium", "hard"] },
//         { category: "motor", questionCount: 400, difficulties: ["easy", "medium", "hard"] },
//       ],
//     })
//   }
// }