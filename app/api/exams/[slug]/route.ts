import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Exam from "@/models/Exam"

// Explicitly define the type of context
type Params = {
  params: {
    slug: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  const { slug } = params

  try {
    await connectMongoDB()
    const exam = await Exam.findOne({ slug }).populate("questions")

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 })
    }

    return NextResponse.json({ exam })
  } catch (error) {
    console.error("Error fetching exam:", error)
    return NextResponse.json({ error: "Failed to fetch exam" }, { status: 500 })
  }
}
