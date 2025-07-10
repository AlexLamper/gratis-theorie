import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Exam from "@/models/Exam"

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const query = category ? { category } : {}
    const exams = await Exam.find(query).select("title slug category timeLimit passRate")
    return NextResponse.json({ exams })
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB()
    const data = await req.json()
    const exam = new Exam(data)
    await exam.save()
    return NextResponse.json({ exam }, { status: 201 })
  } catch (error) {
    console.error("Error creating exam:", error)
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 })
  }
}