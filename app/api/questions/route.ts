import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "auto"
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const difficulty = searchParams.get("difficulty")

    const { db } = await connectToDatabase()

    // Build query filter
    const filter: any = { category }
    if (difficulty) {
      filter.difficulty = difficulty
    }

    // Get questions from database
    const questions = await db.collection("questions").find(filter).limit(limit).toArray()

    // If no questions found, return sample data
    if (questions.length === 0) {
      const sampleQuestions = getSampleQuestions(category, limit)
      return NextResponse.json({
        questions: sampleQuestions,
        total: sampleQuestions.length,
        category,
      })
    }

    return NextResponse.json({
      questions,
      total: questions.length,
      category,
    })
  } catch (error) {
    console.error("Error fetching questions:", error)

    // Fallback to sample data on error
    const category = new URL(request.url).searchParams.get("category") || "auto"
    const limit = Number.parseInt(new URL(request.url).searchParams.get("limit") || "20")
    const sampleQuestions = getSampleQuestions(category, limit)

    return NextResponse.json({
      questions: sampleQuestions,
      total: sampleQuestions.length,
      category,
    })
  }
}

// Sample questions for when database is not available
function getSampleQuestions(category: string, limit: number) {
  const sampleQuestions = {
    auto: [
      {
        _id: "1",
        question: "Wat is de maximumsnelheid binnen de bebouwde kom?",
        options: ["30 km/h", "50 km/h", "60 km/h", "70 km/h"],
        correctAnswer: 1,
        explanation: "Binnen de bebouwde kom is de maximumsnelheid 50 km/h, tenzij anders aangegeven.",
        category: "auto",
        difficulty: "easy" as const,
      },
      {
        _id: "2",
        question: "Wanneer moet je je richtingaanwijzer gebruiken?",
        options: [
          "Alleen bij het afslaan",
          "Bij elke verandering van richting of rijstrook",
          "Alleen op de snelweg",
          "Alleen bij het parkeren",
        ],
        correctAnswer: 1,
        explanation:
          "Je moet altijd je richtingaanwijzer gebruiken bij elke verandering van richting of rijstrook om andere weggebruikers te waarschuwen.",
        category: "auto",
        difficulty: "easy" as const,
      },
      {
        _id: "3",
        question: "Wat betekent een geel verkeerslicht?",
        options: [
          "Doorrijden is toegestaan",
          "Stop, tenzij dit gevaarlijk is",
          "Snelheid verhogen",
          "Alleen voor bussen",
        ],
        correctAnswer: 1,
        explanation:
          "Geel licht betekent dat je moet stoppen, tenzij dit gevaarlijk zou zijn (bijvoorbeeld als je al heel dicht bij het stoplicht bent).",
        category: "auto",
        difficulty: "medium" as const,
      },
      {
        _id: "4",
        question: "Wat is de minimale volgafstand op de snelweg bij 100 km/h?",
        options: ["1 seconde", "2 seconden", "3 seconden", "4 seconden"],
        correctAnswer: 2,
        explanation:
          "De minimale volgafstand op de snelweg is 3 seconden. Dit geeft je voldoende tijd om te reageren bij noodremmen.",
        category: "auto",
        difficulty: "medium" as const,
      },
      {
        _id: "5",
        question: "Wanneer mag je een doorgetrokken streep overschrijden?",
        options: ["Nooit", "Bij inhalen", "Alleen in noodgevallen", "Bij het verlaten van de weg"],
        correctAnswer: 3,
        explanation:
          "Een doorgetrokken streep mag alleen worden overschreden bij het verlaten van de weg (bijvoorbeeld bij het inrijden van een oprit).",
        category: "auto",
        difficulty: "hard" as const,
      },
    ],
    scooter: [
      {
        _id: "6",
        question: "Wat is de maximumsnelheid voor een bromfiets?",
        options: ["25 km/h", "35 km/h", "45 km/h", "55 km/h"],
        correctAnswer: 2,
        explanation: "De maximumsnelheid voor een bromfiets is 45 km/h.",
        category: "scooter",
        difficulty: "easy" as const,
      },
      {
        _id: "7",
        question: "Vanaf welke leeftijd mag je een bromfiets besturen?",
        options: ["14 jaar", "15 jaar", "16 jaar", "18 jaar"],
        correctAnswer: 2,
        explanation: "Je mag vanaf 16 jaar een bromfiets besturen met een AM-rijbewijs.",
        category: "scooter",
        difficulty: "easy" as const,
      },
      {
        _id: "8",
        question: "Mag je met een bromfiets op het fietspad rijden?",
        options: ["Ja, altijd", "Nee, nooit", "Alleen buiten de bebouwde kom", "Alleen als er geen autoweg is"],
        correctAnswer: 2,
        explanation:
          "Met een bromfiets mag je alleen buiten de bebouwde kom op het fietspad rijden, mits dit is toegestaan.",
        category: "scooter",
        difficulty: "medium" as const,
      },
    ],
    motor: [
      {
        _id: "9",
        question: "Wat is het verschil tussen categorie A1 en A2?",
        options: ["Leeftijd en vermogen", "Alleen leeftijd", "Alleen vermogen", "Er is geen verschil"],
        correctAnswer: 0,
        explanation: "A1 is vanaf 18 jaar voor motoren tot 11 kW, A2 is vanaf 20 jaar voor motoren tot 35 kW.",
        category: "motor",
        difficulty: "medium" as const,
      },
      {
        _id: "10",
        question: "Wanneer is een helm verplicht op de motor?",
        options: ["Alleen op de snelweg", "Alleen boven 50 km/h", "Altijd", "Alleen bij slecht weer"],
        correctAnswer: 2,
        explanation:
          "Een helm is altijd verplicht bij het besturen van een motorfiets, ongeacht de snelheid of locatie.",
        category: "motor",
        difficulty: "easy" as const,
      },
    ],
  }

  const categoryQuestions = sampleQuestions[category as keyof typeof sampleQuestions] || sampleQuestions.auto
  return categoryQuestions.slice(0, limit)
}
