import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Vehicle from "@/models/Vehicle"

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB()
    const voertuigen = await Vehicle.find({}).sort({ name: 1 }).lean()
    return NextResponse.json(voertuigen)
  } catch (error) {
    console.error("[ERROR] /api/voertuigen:", error)
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 })
  }
}
