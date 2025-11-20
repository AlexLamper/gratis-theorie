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

    // Verbinden met MongoDB
    await connectMongoDB()

    if (!voertuig) {
      return NextResponse.json({ error: "Voertuig is vereist." }, { status: 400 })
    }

    // voertuig en categorie info

    // Zoek voertuig op naam
    const vehicle = await Vehicle.findOne({ name: voertuig }).lean<VehicleDoc | null>()
    if (!vehicle || !vehicle._id) {
      return NextResponse.json({ error: "Voertuig niet gevonden." }, { status: 404 })
    }

    const vehicleId = new mongoose.Types.ObjectId(vehicle._id)

    if (categorie) {
      // Opzoeken categorie voor voertuigId en slug
      const category = await Category.findOne({
        vehicleId,
        slug: categorie,
      }).lean<CategoryDoc | null>()

      let lessons: any[] = []

      if (category && category._id) {
        const categoryId = new mongoose.Types.ObjectId(category._id)
        lessons = await Lesson.find({ categoryId }).sort({ order: 1 }).lean()
      }

      // Fallback voor oude data
      if (lessons.length === 0) {
        lessons = await Lesson.find({ voertuig, categorie }).sort({ volgorde: 1 }).lean()
      }

      if (lessons.length === 0) {
        return NextResponse.json({ error: "Geen lessen gevonden." }, { status: 404 })
      }

      return NextResponse.json(lessons)
    }

    // Geen categorie? Geef alle categorieën voor dit voertuig
    const categories = await Category.find({ vehicleId }).sort({ order: 1 }).lean()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 })
  }
}
