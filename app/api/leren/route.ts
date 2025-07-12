import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectMongoDB from "@/libs/mongodb"
import Vehicle from "@/models/Vehicle"
import Category from "@/models/Category"
import Lesson from "@/models/Lesson"

interface VehicleDoc {
  _id: mongoose.Types.ObjectId
  name: string
  displayName: string
  icon?: string
}

interface CategoryDoc {
  _id: mongoose.Types.ObjectId
  slug: string
  title: string
  icon?: string
  vehicleId: mongoose.Types.ObjectId
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

    // Zoek voertuig op naam
    const vehicle = await Vehicle.findOne({ name: voertuig }).lean<VehicleDoc | null>()
    if (!vehicle || !vehicle._id) {
      console.error("[DEBUG] Geen voertuig gevonden:", voertuig)
      return NextResponse.json({ error: "Voertuig niet gevonden." }, { status: 404 })
    }

    const vehicleId = new mongoose.Types.ObjectId(vehicle._id)

    if (categorie) {
      console.log("[DEBUG] Opzoeken categorie voor voertuigId:", vehicleId, "en slug:", categorie)

      const category = await Category.findOne({
        vehicleId,
        slug: categorie,
      }).lean<CategoryDoc | null>()

      console.log("[DEBUG] Gevonden categorie:", category)

      let lessons: any[] = []

      if (category && category._id) {
        const categoryId = new mongoose.Types.ObjectId(category._id)
        lessons = await Lesson.find({ categoryId }).sort({ order: 1 }).lean()
        console.log("[DEBUG] Gevonden lessen via categoryId:", lessons.length)
      }

      // Fallback voor oude data
      if (lessons.length === 0) {
        lessons = await Lesson.find({ voertuig, categorie }).sort({ volgorde: 1 }).lean()
        console.log("[DEBUG] Gevonden lessen via fallback:", lessons.length)
      }

      if (lessons.length === 0) {
        console.warn("[DEBUG] Geen lessen gevonden voor categorie:", categorie)
        return NextResponse.json({ error: "Geen lessen gevonden." }, { status: 404 })
      }

      return NextResponse.json(lessons)
    }

    // Geen categorie? Geef alle categorieën voor dit voertuig
    const categories = await Category.find({ vehicleId }).sort({ order: 1 }).lean()
    console.log("[DEBUG] Gevonden categorieën:", categories.length)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[ERROR] Fout bij ophalen leerdata:", error)
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 })
  }
}
