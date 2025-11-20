import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import TrafficSign from "@/models/TrafficSign"

export async function GET() {
  try {
    await connectMongoDB()
    const trafficSigns = await TrafficSign.find().lean()
    return NextResponse.json({ trafficSigns })
  } catch (error) {
    console.error("Error fetching traffic signs:", error)
    return NextResponse.json({ error: "Failed to fetch traffic signs" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const trafficSign = new TrafficSign(data);
    await trafficSign.save();
    return NextResponse.json({ trafficSign }, { status: 201 });
  } catch (error) {
    console.error("Error creating traffic sign:", error);
    return NextResponse.json({ error: "Failed to create traffic sign" }, { status: 500 });
  }
}
