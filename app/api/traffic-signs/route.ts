import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import TrafficSign from "@/models/TrafficSign"

// Simple placeholder image as base64 data URI (small 1x1 pixel)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjUwIiBmaWxsPSIjZDFkNWRiIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjgwIiB5PSI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZiNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj4/PC90ZXh0Pjwvc3ZnPg=="

// Enhanced sample traffic signs data - always available
function getSampleTrafficSigns(category: string, type: string | null, limit: number) {
  const allSigns = [
    {
      _id: "sample-1",
      name: "Rijbaanversmalling",
      description: "Waarschuwing voor versmalling van de rijbaan",
      meaning: "De weg wordt smaller, let op tegenliggers en pas je snelheid aan",
      category: "waarschuwing",
      type: "waarschuwing",
      shape: "driehoek",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Wegwerkzaamheden", "Smalle bruggen", "Verkeerseilanden"],
    },
    {
      _id: "sample-2",
      name: "Let op kinderen",
      description: "Waarschuwing voor spelende kinderen",
      meaning: "Kinderen kunnen onverwacht de weg op lopen",
      category: "waarschuwing",
      type: "waarschuwing",
      shape: "driehoek",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bij scholen", "Speelplaatsen", "Woonwijken"],
    },
    {
      _id: "sample-3",
      name: "Stop",
      description: "Verplicht stoppen en voorrang verlenen",
      meaning: "Je moet volledig stoppen voordat je verder rijdt",
      category: "voorrang",
      type: "voorrang",
      shape: "achthoek",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Gevaarlijke kruispunten", "Spoorwegovergangen", "Slechte zichtlijnen"],
    },
    {
      _id: "sample-4",
      name: "Fietspad",
      description: "Aanduiding van fietspad",
      meaning: "Pad bestemd voor fietsers en bromfietsers",
      category: "informatie",
      type: "informatie",
      shape: "vierkant",
      color: "blauw-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["bromfiets", "fiets", "alle voertuigen"],
      examples: ["Fietspaden", "Gescheiden fietsbanen", "Recreatieve routes"],
    },
    {
      _id: "sample-5",
      name: "Parkeerverbod",
      description: "Verbod om te parkeren",
      meaning: "Je mag hier niet parkeren",
      category: "parkeren",
      type: "parkeren",
      shape: "rond",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto"],
      examples: ["Hoofdwegen", "Bushaltes", "Kruispunten"],
    },
    {
      _id: "sample-6",
      name: "Maximum snelheid 50",
      description: "Maximumsnelheid van 50 km/h",
      meaning: "Je mag niet harder rijden dan 50 km/h",
      category: "snelheid",
      type: "snelheid",
      shape: "rond",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bebouwde kom", "Schoolzones", "Woonwijken"],
    },
    {
      _id: "sample-7",
      name: "Voorrang verlenen",
      description: "Je moet voorrang verlenen",
      meaning: "Stop of vertraag om voorrang te verlenen aan ander verkeer",
      category: "voorrang",
      type: "voorrang",
      shape: "driehoek",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Kruispunten", "Invoegstroken", "Zijwegen"],
    },
    {
      _id: "sample-8",
      name: "Eenrichtingsweg",
      description: "Eenrichtingsverkeer",
      meaning: "Je mag alleen in de aangegeven richting rijden",
      category: "rijrichting",
      type: "rijrichting",
      shape: "rond",
      color: "blauw-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Stadscentra", "Smalle straten", "Verkeerscirculatie"],
    },
    {
      _id: "sample-9",
      name: "Gesloten voor auto's",
      description: "Verbod voor personenauto's",
      meaning: "Auto's mogen hier niet rijden",
      category: "verbod",
      type: "verbod",
      shape: "rond",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto"],
      examples: ["Busbanen", "Fietsstraten", "Voetgangersgebieden"],
    },
    {
      _id: "sample-10",
      name: "Autosnelweg",
      description: "Begin van autosnelweg",
      meaning: "Je rijdt nu op een autosnelweg met bijbehorende regels",
      category: "informatie",
      type: "informatie",
      shape: "vierkant",
      color: "blauw-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "motor"],
      examples: ["A1", "A2", "A4 snelwegen"],
    },
    {
      _id: "sample-11",
      name: "Bocht naar rechts",
      description: "Vooraanduiding bocht naar rechts",
      meaning: "Scherpe bocht naar rechts, verminder snelheid",
      category: "waarschuwing",
      type: "waarschuwing",
      shape: "driehoek",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bergwegen", "Landelijke wegen", "Haakse bochten"],
    },
    {
      _id: "sample-12",
      name: "Gesloten voor motorfietsen",
      description: "Verbod voor motorfietsen",
      meaning: "Motorfietsen mogen hier niet rijden",
      category: "verbod",
      type: "verbod",
      shape: "rond",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["motor"],
      examples: ["Woonwijken", "Bepaalde tunnels", "Natuurgebieden"],
    },
    {
      _id: "sample-13",
      name: "Woonerf",
      description: "Begin van woonerf",
      meaning: "Speciale verkeersregels voor woongebied",
      category: "informatie",
      type: "informatie",
      shape: "vierkant",
      color: "blauw-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Woonwijken", "Speelstraten", "Rustige gebieden"],
    },
    {
      _id: "sample-14",
      name: "Verboden in te rijden",
      description: "Verbod om in te rijden",
      meaning: "Je mag deze weg niet inrijden",
      category: "verbod",
      type: "verbod",
      shape: "rond",
      color: "rood-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Eenrichtingswegen", "Voetgangersgebieden", "Afgesloten straten"],
    },
    {
      _id: "sample-15",
      name: "Voorrangsweg",
      description: "Je rijdt op een voorrangsweg",
      meaning: "Je hebt voorrang op verkeer dat invoegt of kruist",
      category: "voorrang",
      type: "voorrang",
      shape: "ruit",
      color: "geel-wit",
      image: PLACEHOLDER_IMAGE,
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Hoofdwegen", "Doorgaande routes", "Provinciale wegen"],
    },
  ]

  // Filter by category (vehicle type)
  let filteredSigns = allSigns

  if (category !== "alle") {
    filteredSigns = allSigns.filter((sign) => {
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
      return true
    })
  }

  // Filter by type if specified
  if (type && type !== "all") {
    filteredSigns = filteredSigns.filter((sign) => sign.type === type)
  }

  return filteredSigns.slice(0, limit)
}

export async function GET(request: NextRequest) {
  try {
    // Parse URL parameters safely
    const url = new URL(request.url)
    const category = url.searchParams.get("category") || "auto"
    const type = url.searchParams.get("type")
    const limit = Math.min(Math.max(1, Number.parseInt(url.searchParams.get("limit") || "50")), 100)

    console.log(`[API] Traffic Signs Request: category=${category}, type=${type}, limit=${limit}`)

    // Try database connection
    try {
      await connectToDatabase()
      console.log("[API] Database connection successful")

      // Build query filter
      const filter: Record<string, any> = {}

      // Filter by applicable vehicles for specific categories
      if (category !== "alle") {
        if (category === "auto") {
          filter.applicableFor = { $in: ["auto", "alle voertuigen"] }
        } else if (category === "bromfiets") {
          filter.applicableFor = { $in: ["bromfiets", "fiets", "alle voertuigen"] }
        } else if (category === "motor") {
          filter.applicableFor = { $in: ["motor", "alle voertuigen"] }
        }
      }

      if (type && type !== "all") {
        filter.type = type
      }

      console.log("[API] Database filter:", JSON.stringify(filter))

      // Query database using Mongoose
      const signs = await TrafficSign.find(filter)
        .limit(limit)
        .select("name description meaning type category shape color applicableFor image examples")
        .lean() // Returns plain JavaScript objects for better performance

      if (signs && signs.length > 0) {
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

    // Return sample data as fallback
    const sampleSigns = getSampleTrafficSigns(category, type, limit)
    console.log(`[API] Returning ${sampleSigns.length} sample signs`)
    return NextResponse.json({
      signs: sampleSigns,
      total: sampleSigns.length,
      category,
      source: "sample",
    })
  } catch (error) {
    console.error("[API] Unexpected error:", error)

    // Emergency fallback
    const emergencyData = [
      {
        _id: "emergency-1",
        name: "Verkeersbord",
        description: "Sample verkeersbord",
        meaning: "Dit is een voorbeeld verkeersbord",
        category: "informatie",
        type: "informatie",
        shape: "rond",
        color: "blauw-wit",
        image: PLACEHOLDER_IMAGE,
        applicableFor: ["alle voertuigen"],
        examples: ["Voorbeeld"],
      },
    ]

    return NextResponse.json({
      signs: emergencyData,
      total: emergencyData.length,
      category: "auto",
      source: "emergency",
      error: "API error occurred",
    })
  }
}
