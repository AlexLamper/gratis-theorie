import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Lesson from "@/models/Lesson"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const voertuig = searchParams.get("voertuig")
    const categorie = searchParams.get("categorie")

    console.log("[DEBUG] verbinden met database...")
    await connectMongoDB()

    console.log("[DEBUG] voertuig:", voertuig, "categorie:", categorie)

    if (voertuig && categorie) {
      const les = await Lesson.findOne({ voertuig, categorie }).lean()
      console.log("[DEBUG] specifieke les gevonden:", !!les)
      if (!les) return NextResponse.json({ error: "Geen les gevonden." }, { status: 404 })
      return NextResponse.json(les)
    }

    if (voertuig) {
      const lessen = await Lesson.find({ voertuig }).lean()
      console.log("[DEBUG] lessen gevonden:", lessen.length)
      return NextResponse.json(lessen)
    }

    return NextResponse.json({ error: "Geen parameters opgegeven." }, { status: 400 })
  } catch (error) {
    console.error("Fout bij ophalen les:", error)
    return NextResponse.json({ error: "Serverfout" }, { status: 500 })
  }
}
