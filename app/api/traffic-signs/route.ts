import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "auto"
    const type = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const { db } = await connectToDatabase()

    // Build query filter
    const filter: any = {}

    // Filter by applicable vehicles
    if (category === "auto") {
      filter.applicableFor = { $in: ["auto", "alle voertuigen"] }
    } else if (category === "bromfiets") {
      filter.applicableFor = { $in: ["bromfiets", "scooter", "alle voertuigen"] }
    } else if (category === "motor") {
      filter.applicableFor = { $in: ["motor", "motorfiets", "alle voertuigen"] }
    }

    if (type && type !== "all") {
      filter.type = type
    }

    // Get traffic signs from database
    const signs = await db.collection("traffic_signs").find(filter).limit(limit).toArray()

    // If no signs found, return sample data
    if (signs.length === 0) {
      const sampleSigns = getSampleTrafficSigns(category, type, limit)
      return NextResponse.json({
        signs: sampleSigns,
        total: sampleSigns.length,
        category,
      })
    }

    return NextResponse.json({
      signs,
      total: signs.length,
      category,
    })
  } catch (error) {
    console.error("Error fetching traffic signs:", error)

    // Fallback to sample data on error
    const category = new URL(request.url).searchParams.get("category") || "auto"
    const type = new URL(request.url).searchParams.get("type")
    const limit = Number.parseInt(new URL(request.url).searchParams.get("limit") || "50")
    const sampleSigns = getSampleTrafficSigns(category, type, limit)

    return NextResponse.json({
      signs: sampleSigns,
      total: sampleSigns.length,
      category,
    })
  }
}

// Sample traffic signs data
function getSampleTrafficSigns(category: string, type: string | null, limit: number) {
  const allSigns = [
    // GEBODSBORDEN
    {
      _id: "1",
      name: "Verplicht rechtsaf",
      description: "Dit bord geeft aan dat je verplicht rechts af moet slaan",
      meaning: "Je moet de aangegeven richting volgen, andere richtingen zijn verboden",
      category: "gebod",
      type: "gebod" as const,
      shape: "rond" as const,
      color: "blauw",
      image: "/signs/verplicht-rechtsaf.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bij wegwerkzaamheden", "Eenrichtingsverkeer", "Verkeersleiding"],
    },
    {
      _id: "2",
      name: "Verplicht linksaf",
      description: "Dit bord geeft aan dat je verplicht links af moet slaan",
      meaning: "Je moet de aangegeven richting volgen, andere richtingen zijn verboden",
      category: "gebod",
      type: "gebod" as const,
      shape: "rond" as const,
      color: "blauw",
      image: "/signs/verplicht-linksaf.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bij wegwerkzaamheden", "Eenrichtingsverkeer", "Verkeersleiding"],
    },
    {
      _id: "3",
      name: "Fietspad",
      description: "Verplicht fietspad voor fietsers en bromfietsers",
      meaning: "Alleen fietsers en bromfietsers mogen hier rijden",
      category: "gebod",
      type: "gebod" as const,
      shape: "rond" as const,
      color: "blauw",
      image: "/signs/fietspad.svg",
      applicableFor: ["bromfiets", "fiets"],
      examples: ["Gescheiden fietspaden", "Bromfietspad buiten bebouwde kom"],
    },

    // VERBODSBORDEN
    {
      _id: "4",
      name: "Gesloten voor alle verkeer",
      description: "Verbod voor alle voertuigen en voetgangers",
      meaning: "Niemand mag deze weg gebruiken, behalve bij uitzondering",
      category: "verbod",
      type: "verbod" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: "/signs/gesloten-alle-verkeer.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Wegwerkzaamheden", "Afgesloten straten", "Noodgevallen"],
    },
    {
      _id: "5",
      name: "Gesloten voor motorvoertuigen",
      description: "Verbod voor alle motorvoertuigen",
      meaning: "Auto's, motoren en bromfietsen mogen hier niet rijden",
      category: "verbod",
      type: "verbod" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: "/signs/gesloten-motorvoertuigen.svg",
      applicableFor: ["auto", "bromfiets", "motor"],
      examples: ["Voetgangersgebieden", "Winkelstraten", "Parken"],
    },
    {
      _id: "6",
      name: "Gesloten voor bromfietsen",
      description: "Verbod specifiek voor bromfietsen en scooters",
      meaning: "Bromfietsen en scooters mogen deze weg niet gebruiken",
      category: "verbod",
      type: "verbod" as const,
      shape: "rond" as const,
      color: "rood-wit",
      image: "/signs/gesloten-bromfietsen.svg",
      applicableFor: ["bromfiets"],
      examples: ["Tunnels", "Snelwegen", "Bepaalde fietspaden"],
    },

    // WAARSCHUWINGSBORDEN
    {
      _id: "7",
      name: "Gevaarlijke bocht naar rechts",
      description: "Waarschuwing voor een scherpe bocht naar rechts",
      meaning: "Verminder snelheid en bereid je voor op een scherpe bocht",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/signs/bocht-rechts.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bergwegen", "Landelijke wegen", "Haakse bochten"],
    },
    {
      _id: "8",
      name: "Kruispunt",
      description: "Waarschuwing voor een kruispunt vooruit",
      meaning: "Let op kruisend verkeer en verleen voorrang waar nodig",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/signs/kruispunt.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Landelijke wegen", "Ongeregelde kruispunten", "Zijwegen"],
    },
    {
      _id: "9",
      name: "Kinderen",
      description: "Waarschuwing voor spelende kinderen",
      meaning: "Extra voorzichtig rijden, kinderen kunnen onverwacht de weg op lopen",
      category: "waarschuwing",
      type: "waarschuwing" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/signs/kinderen.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Bij scholen", "Speelplaatsen", "Woonwijken"],
    },

    // VOORRANGSBORDEN
    {
      _id: "10",
      name: "Voorrang verlenen",
      description: "Je moet voorrang verlenen aan verkeer op de kruisende weg",
      meaning: "Stop of vertraag om voorrang te verlenen aan ander verkeer",
      category: "voorrang",
      type: "voorrang" as const,
      shape: "driehoek" as const,
      color: "rood-wit",
      image: "/signs/voorrang-verlenen.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Kruispunten", "Invoegstroken", "Zijwegen"],
    },
    {
      _id: "11",
      name: "Stop",
      description: "Verplicht stoppen en voorrang verlenen",
      meaning: "Je moet volledig stoppen voordat je verder rijdt",
      category: "voorrang",
      type: "voorrang" as const,
      shape: "achthoek" as const,
      color: "rood-wit",
      image: "/signs/stop.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Gevaarlijke kruispunten", "Spoorwegovergangen", "Slechte zichtlijnen"],
    },
    {
      _id: "12",
      name: "Voorrangsweg",
      description: "Je rijdt op een voorrangsweg",
      meaning: "Je hebt voorrang op verkeer dat invoegt of kruist",
      category: "voorrang",
      type: "voorrang" as const,
      shape: "ruit" as const,
      color: "geel-wit",
      image: "/signs/voorrangsweg.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Hoofdwegen", "Doorgaande routes", "Provinciale wegen"],
    },

    // INFORMATIEBORDEN
    {
      _id: "13",
      name: "Parkeerplaats",
      description: "Aanduiding van een parkeerplaats",
      meaning: "Hier mag je je voertuig parkeren",
      category: "informatie",
      type: "informatie" as const,
      shape: "vierkant" as const,
      color: "blauw-wit",
      image: "/signs/parkeren.svg",
      applicableFor: ["auto"],
      examples: ["Winkelcentra", "Stations", "Openbare parkeerplaatsen"],
    },
    {
      _id: "14",
      name: "Benzinestation",
      description: "Aanduiding van een tankstation",
      meaning: "Hier kun je tanken",
      category: "informatie",
      type: "informatie" as const,
      shape: "vierkant" as const,
      color: "blauw-wit",
      image: "/signs/tankstation.svg",
      applicableFor: ["auto", "motor"],
      examples: ["Snelwegen", "Hoofdwegen", "Dorpscentra"],
    },
    {
      _id: "15",
      name: "Ziekenhuis",
      description: "Aanduiding richting ziekenhuis",
      meaning: "Volg deze route naar het ziekenhuis",
      category: "informatie",
      type: "informatie" as const,
      shape: "vierkant" as const,
      color: "blauw-wit",
      image: "/signs/ziekenhuis.svg",
      applicableFor: ["auto", "bromfiets", "motor", "alle voertuigen"],
      examples: ["Stadscentra", "Hoofdroutes", "Noodroutes"],
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
    return true
  })

  // Filter by type if specified
  if (type && type !== "all") {
    filteredSigns = filteredSigns.filter((sign) => sign.type === type)
  }

  return filteredSigns.slice(0, limit)
}
