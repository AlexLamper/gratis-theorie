import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "@/libs/mongodb"
import Vehicle from "@/models/Vehicle"
import Category from "@/models/Category"
import Lesson from "@/models/Lesson"

// (optioneel) definieer types als je die nog niet hebt
interface VehicleDoc {
  _id: string
  name: string
  displayName: string
  icon?: string
}

interface CategoryDoc {
  _id: string
  slug: string
  title: string
  icon?: string
  vehicleId: string
  order: number
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const voertuig = searchParams.get("voertuig")
    const categorie = searchParams.get("categorie")

    console.log("[DEBUG] Verbinden met MongoDB...")
    await connectMongoDB()

    if (!voertuig) {
      return NextResponse.json({ error: "Voertuig is vereist." }, { status: 400 })
    }

    console.log("[DEBUG] voertuig:", voertuig, "categorie:", categorie)

    // Zoek voertuig op slug (bv. "auto")
    const vehicle = await Vehicle.findOne({ name: voertuig }).lean<VehicleDoc | null>()
    if (!vehicle || !vehicle._id) {
      return NextResponse.json({ error: "Voertuig niet gevonden." }, { status: 404 })
    }

    // Als categorie meegegeven is, haal lessen op binnen die categorie
    if (categorie) {
      const category = await Category.findOne({
        vehicleId: vehicle._id,
        slug: categorie,
      }).lean<CategoryDoc | null>()

      // Bestaande data kan nog volgens het oude schema zijn opgeslagen
      // waarbij lessen een `voertuig` en `categorie` veld hebben.
      // Zoek daarom eerst lessen via het nieuwe schema, maar val terug
      // op het oude schema wanneer er niets wordt gevonden.

      let lessons: any[] = []

      if (category && category._id) {
        lessons = await Lesson.find({ categoryId: category._id })
          .sort({ order: 1 })
          .lean()
      }

      // Fallback naar oud schema wanneer er geen lessen zijn gevonden
      if (lessons.length === 0) {
        lessons = await Lesson.find({ voertuig, categorie }).sort({ volgorde: 1 }).lean()
      }

      if (lessons.length === 0) {
        return NextResponse.json({ error: "Geen lessen gevonden." }, { status: 404 })
      }

      return NextResponse.json(lessons)
    }

    // Geen categorie → geef alle categorieën voor dit voertuig
    const categories = await Category.find({ vehicleId: vehicle._id }).sort({ order: 1 }).lean()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[ERROR] Fout bij ophalen leerdata:", error)
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 })
  }
}