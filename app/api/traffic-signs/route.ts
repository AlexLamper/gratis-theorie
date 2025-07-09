import { type NextRequest, NextResponse } from "next/server"

// Enhanced sample traffic signs data - always available
function getSampleTrafficSigns(category: string, type: string | null, limit: number) {
  // Create SVG data URI for placeholder
  const createSVGPlaceholder = (text: string, bgColor = "#f3f4f6") => {
    const svg = `<svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <circle cx="80" cy="80" r="50" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
      <text x="80" y="85" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">${text}</text>
    </svg>`
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

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
      image: createSVGPlaceholder("⚠️"),
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
      image: createSVGPlaceholder("👶"),
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
      image: createSVGPlaceholder("STOP", "#dc2626"),
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
      image: createSVGPlaceholder("🚲", "#2563eb"),
      applicableFor: ["bromfiets", "fiets", "alle voertuigen"],
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
      image: createSVGPlaceholder("🚫P"),
      applicableFor: ["auto"],
      examples: ["Hoofdwegen", "Bushaltes", "Kruispunten"],
    },
    {
      _id: "sample-6",
      name: "Maximum snelheid 50",
      description: "Maximumsnelheid van 50 km/h",
      meaning: "Je mag niet harder rijden dan 50 km/h",
      category: "snelheid",
      type: "snelheid" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: createSVGPlaceholder("50"),
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bebouwde kom", "Schoolzones", "Woonwijken"],
    },
    {
      _id: "sample-7",
      name: "Voorrang verlenen",
      description: "Je moet voorrang verlenen",
      meaning: "Stop of vertraag om voorrang te verlenen aan ander verkeer",
      category: "voorrang",
      type: "voorrang" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: createSVGPlaceholder("△"),
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Kruispunten", "Invoegstroken", "Zijwegen"],
    },
    {
      _id: "sample-8",
      name: "Eenrichtingsweg",
      description: "Eenrichtingsverkeer",
      meaning: "Je mag alleen in de aangegeven richting rijden",
      category: "rijrichting",
      type: "rijrichting" as const,
      shape: "rond" as const,
      color: "blauw-wit",
      image: createSVGPlaceholder("→", "#2563eb"),
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Stadscentra", "Smalle straten", "Verkeerscirculatie"],
    },
    {
      _id: "sample-9",
      name: "Gesloten voor auto's",
      description: "Verbod voor personenauto's",
      meaning: "Auto's mogen hier niet rijden",
      category: "verbod",
      type: "verbod" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: createSVGPlaceholder("🚗🚫"),
      applicableFor: ["auto"],
      examples: ["Busbanen", "Fietsstraten", "Voetgangersgebieden"],
    },
    {
      _id: "sample-10",
      name: "Autosnelweg",
      description: "Begin van autosnelweg",
      meaning: "Je rijdt nu op een autosnelweg met bijbehorende regels",
      category: "informatie",
      type: "informatie" as const,
      shape: "vierkant" as const,
      color: "blauw-wit",
      image: createSVGPlaceholder("🛣️", "#2563eb"),
      applicableFor: ["auto", "motor"],
      examples: ["A1", "A2", "A4 snelwegen"],
    },
    {
      _id: "sample-11",
      name: "Bocht naar rechts",
      description: "Vooraanduiding bocht naar rechts",
      meaning: "Scherpe bocht naar rechts, verminder snelheid",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: createSVGPlaceholder("↗️"),
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bergwegen", "Landelijke wegen", "Haakse bochten"],
    },
    {
      _id: "sample-12",
      name: "Gesloten voor motorfietsen",
      description: "Verbod voor motorfietsen",
      meaning: "Motorfietsen mogen hier niet rijden",
      category: "verbod",
      type: "verbod" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: createSVGPlaceholder("🏍️🚫"),
      applicableFor: ["motor"],
      examples: ["Woonwijken", "Bepaalde tunnels", "Natuurgebieden"],
    },
  ]

  // Filter by category (vehicle type)
  let filteredSigns = allSigns.filter((sign) => {
    if (category === "auto") {
      return sign.applicableFor.includes("auto") || sign.applicableFor.includes("alle voertuigen")
    } else if (category === "bromfiets") {
      return (
        sign.applicableFor.includes("bromfiets") ||
        sign.applicableFor.includes("fiets") ||
        sign.applicableFor.includes("alle voertuigen")
      )
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

export async function GET(request: NextRequest) {
  // Always start with safe defaults
  let category = "auto"
  let type: string | null = null
  let limit = 50

  try {
    // Safely parse URL parameters
    const url = new URL(request.url)
    category = url.searchParams.get("category") || "auto"
    type = url.searchParams.get("type")
    limit = Math.min(Number.parseInt(url.searchParams.get("limit") || "50"), 100) // Cap at 100

    console.log(`[API] Request: category=${category}, type=${type}, limit=${limit}`)
  } catch (urlError) {
    console.error("[API] URL parsing error:", urlError)
    // Continue with defaults
  }

  // Always try sample data first to ensure we have a fallback
  const sampleSigns = getSampleTrafficSigns(category, type, limit)
  console.log(`[API] Generated ${sampleSigns.length} sample signs as fallback`)

  // Try database connection only if we have MongoDB URI
  if (process.env.MONGODB_URI) {
    try {
      // Dynamic import to avoid issues if MongoDB is not available
      const { connectToDatabase } = await import("@/lib/mongodb")
      const { db } = await connectToDatabase()

      console.log("[API] Database connection successful")

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

      if (type && type !== "all") {
        filter.type = type
      }

      // Get traffic signs from database
      const signs = await db
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

      if (signs.length > 0) {
        console.log(`[API] Found ${signs.length} signs from database`)
        return NextResponse.json({
          signs,
          total: signs.length,
          category,
          source: "database",
        })
      } else {
        console.log("[API] No signs found in database, using sample data")
      }
    } catch (dbError) {
      console.error("[API] Database error:", dbError)
      // Continue to sample data fallback
    }
  } else {
    console.log("[API] No MongoDB URI configured, using sample data")
  }

  // Always return sample data if database fails or has no data
  console.log(`[API] Returning ${sampleSigns.length} sample signs`)
  return NextResponse.json({
    signs: sampleSigns,
    total: sampleSigns.length,
    category,
    source: "sample",
  })
}
