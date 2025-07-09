import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Cache for traffic signs data
const cache = new Map()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "auto"
    const type = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    console.log(`[API] Fetching traffic signs for category: ${category}, type: ${type}, limit: ${limit}`)

    // Create cache key
    const cacheKey = `traffic-signs-${category}-${type || "all"}-${limit}`

    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("[API] Returning cached data")
      return NextResponse.json(cached.data)
    }

    // Try to connect to database
    let signs = []
    let fromDatabase = false

    try {
      const { db } = await connectToDatabase()
      console.log("[API] Connected to database successfully")

      // Build query filter
      const filter: any = {}

      // Filter by applicable vehicles
      if (category === "auto") {
        filter.applicableFor = { $in: ["auto", "alle voertuigen"] }
      } else if (category === "bromfiets") {
        filter.applicableFor = { $in: ["bromfiets", "fiets", "alle voertuigen"] }
      } else if (category === "motor") {
        filter.applicableFor = { $in: ["motor", "alle voertuigen"] }
      }
      // For category "alle", no filter is applied

      if (type && type !== "all") {
        filter.type = type
      }

      console.log("[API] Database filter:", JSON.stringify(filter))

      // Get traffic signs from database with optimized query
      signs = await db
        .collection("traffic_signs")
        .find(filter)
        .limit(limit)
        .project({
          name: 1,
          description: 1,
          meaning: 1,
          type: 1,
          category: 1,
          shape: 1,
          color: 1,
          applicableFor: 1,
          image: 1,
          examples: 1,
        })
        .toArray()

      fromDatabase = true
      console.log(`[API] Found ${signs.length} signs from database`)
    } catch (dbError) {
      console.error("[API] Database error:", dbError)
      // Fall back to sample data
      console.log("[API] Falling back to sample data")
      signs = getSampleTrafficSigns(category, type, limit)
      fromDatabase = false
    }

    // If no signs found from database, use sample data
    if (signs.length === 0 && fromDatabase) {
      console.log("[API] No signs found in database, using sample data")
      signs = getSampleTrafficSigns(category, type, limit)
      fromDatabase = false
    }

    const response = {
      signs,
      total: signs.length,
      category,
      source: fromDatabase ? "database" : "sample",
    }

    // Cache the response
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    })

    console.log(`[API] Returning ${signs.length} signs from ${response.source}`)
    return NextResponse.json(response)
  } catch (error) {
    console.error("[API] Error:", error)

    // Always return sample data on any error
    try {
      const category = new URL(request.url).searchParams.get("category") || "auto"
      const type = new URL(request.url).searchParams.get("type")
      const limit = Number.parseInt(new URL(request.url).searchParams.get("limit") || "100")
      const sampleSigns = getSampleTrafficSigns(category, type, limit)

      return NextResponse.json({
        signs: sampleSigns,
        total: sampleSigns.length,
        category,
        source: "sample",
        error: "Database unavailable, using sample data",
      })
    } catch (fallbackError) {
      console.error("[API] Fallback error:", fallbackError)
      return NextResponse.json(
        {
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error",
          signs: [],
          total: 0,
          category: "auto",
          source: "error",
        },
        { status: 500 },
      )
    }
  }
}

// Sample traffic signs data as fallback
function getSampleTrafficSigns(category: string, type: string | null, limit: number) {
  const allSigns = [
    {
      _id: "sample-1",
      name: "Rijbaanversmalling",
      description: "Waarschuwing voor versmalling van de rijbaan",
      meaning: "De weg wordt smaller, let op tegenliggers en pas je snelheid aan",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/placeholder.svg?height=160&width=160",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Wegwerkzaamheden", "Smalle bruggen", "Verkeerseilanden"],
    },
    {
      _id: "sample-2",
      name: "Let op kinderen",
      description: "Waarschuwing voor spelende kinderen",
      meaning: "Kinderen kunnen onverwacht de weg op lopen",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/placeholder.svg?height=160&width=160",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bij scholen", "Speelplaatsen", "Woonwijken"],
    },
    {
      _id: "sample-3",
      name: "Stop",
      description: "Verplicht stoppen en voorrang verlenen",
      meaning: "Je moet volledig stoppen voordat je verder rijdt",
      category: "voorrang",
      type: "voorrang" as const,
      shape: "achthoek" as const,
      color: "rood-wit",
      image: "/placeholder.svg?height=160&width=160",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Gevaarlijke kruispunten", "Spoorwegovergangen", "Slechte zichtlijnen"],
    },
    {
      _id: "sample-4",
      name: "Fietspad",
      description: "Aanduiding van fietspad",
      meaning: "Pad bestemd voor fietsers en bromfietsers",
      category: "informatie",
      type: "informatie" as const,
      shape: "vierkant" as const,
      color: "blauw-wit",
      image: "/placeholder.svg?height=160&width=160",
      applicableFor: ["bromfiets", "fiets"],
      examples: ["Fietspaden", "Gescheiden fietsbanen", "Recreatieve routes"],
    },
    {
      _id: "sample-5",
      name: "Parkeerverbod",
      description: "Verbod om te parkeren",
      meaning: "Je mag hier niet parkeren",
      category: "parkeren",
      type: "parkeren" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: "/placeholder.svg?height=160&width=160",
      applicableFor: ["auto"],
      examples: ["Hoofdwegen", "Bushaltes", "Kruispunten"],
    },
  ]

  // Filter by category (vehicle type)
  let filteredSigns = allSigns.filter((sign) => {
    if (category === "auto") {
      return sign.applicableFor.includes("auto") || sign.applicableFor.includes("alle voertuigen")
    } else if (category === "bromfiets") {
      return sign.applicableFor.includes("bromfiets") || sign.applicableFor.includes("alle voertuigen")
    } else if (category === "motor") {
      return sign.applicableFor.includes("motor") || sign.applicableFor.includes("alle voertuigen")
    }
    return true // For "alle" category, return all signs
  })

  // Filter by type if specified
  if (type && type !== "all") {
    filteredSigns = filteredSigns.filter((sign) => sign.type === type)
  }

  return filteredSigns.slice(0, limit)
}
