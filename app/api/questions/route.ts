// import { type NextRequest, NextResponse } from "next/server"
// import connectMongoDB from "@/lib/mongodb"
// import Question from "@/models/Question"

// // Cache for frequently accessed data
// const cache = new Map()
// const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const category = searchParams.get("category") || "auto"
//     const limit = Number.parseInt(searchParams.get("limit") || "20")
//     const difficulty = searchParams.get("difficulty")
//     const topic = searchParams.get("topic")

//     // Create cache key
//     const cacheKey = `questions-${category}-${limit}-${difficulty || "all"}-${topic || "all"}`

//     // Check cache first
//     const cached = cache.get(cacheKey)
//     if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//       return NextResponse.json(cached.data)
//     }

//     // Connect to database
//     await connectMongoDB()

//     // Build query filter
//     const filter: any = { category }
//     if (difficulty) {
//       filter.difficulty = difficulty
//     }
//     if (topic) {
//       filter.topic = topic
//     }

//     // Get questions from database with optimized query
//     const questions = await Question.find(filter)
//       .limit(limit)
//       .select("question options correctAnswer explanation category difficulty topic image")
//       .lean() // Returns plain JavaScript objects for better performance


//     // If no questions found, return sample data
//     if (questions.length === 0) {
//       const sampleQuestions = getSampleQuestions(category, limit)
//       const response = {
//         questions: sampleQuestions,
//         total: sampleQuestions.length,
//         category,
//       }

//       // Cache the response
//       cache.set(cacheKey, {
//         data: response,
//         timestamp: Date.now(),
//       })

//       return NextResponse.json(response)
//     }

//     const response = {
//       questions,
//       total: questions.length,
//       category,
//     }

//     // Cache the response
//     cache.set(cacheKey, {
//       data: response,
//       timestamp: Date.now(),
//     })

//     return NextResponse.json(response)
//   } catch (error) {
//     console.error("Error fetching questions:", error)

//     // Fallback to sample data on error
//     const category = new URL(request.url).searchParams.get("category") || "auto"
//     const limit = Number.parseInt(new URL(request.url).searchParams.get("limit") || "20")
//     const sampleQuestions = getSampleQuestions(category, limit)

//     return NextResponse.json({
//       questions: sampleQuestions,
//       total: sampleQuestions.length,
//       category,
//     })
//   }
// }

// // Enhanced sample questions with more variety
// function getSampleQuestions(category: string, limit: number) {
//   const sampleQuestions = {
//     auto: [
//       {
//         _id: "1",
//         question: "Wat is de maximumsnelheid binnen de bebouwde kom?",
//         options: ["30 km/h", "50 km/h", "60 km/h", "70 km/h"],
//         correctAnswer: 1,
//         explanation: "Binnen de bebouwde kom is de maximumsnelheid 50 km/h, tenzij anders aangegeven.",
//         category: "auto",
//         difficulty: "easy" as const,
//         topic: "Snelheid en afstand",
//       },
//       {
//         _id: "2",
//         question: "Wanneer moet je je richtingaanwijzer gebruiken?",
//         options: [
//           "Alleen bij het afslaan",
//           "Bij elke verandering van richting of rijstrook",
//           "Alleen op de snelweg",
//           "Alleen bij het parkeren",
//         ],
//         correctAnswer: 1,
//         explanation:
//           "Je moet altijd je richtingaanwijzer gebruiken bij elke verandering van richting of rijstrook om andere weggebruikers te waarschuwen.",
//         category: "auto",
//         difficulty: "easy" as const,
//         topic: "Verkeersborden en -regels",
//       },
//       {
//         _id: "3",
//         question: "Wat betekent een geel verkeerslicht?",
//         options: [
//           "Doorrijden is toegestaan",
//           "Stop, tenzij dit gevaarlijk is",
//           "Snelheid verhogen",
//           "Alleen voor bussen",
//         ],
//         correctAnswer: 1,
//         explanation:
//           "Geel licht betekent dat je moet stoppen, tenzij dit gevaarlijk zou zijn (bijvoorbeeld als je al heel dicht bij het stoplicht bent).",
//         category: "auto",
//         difficulty: "medium" as const,
//         topic: "Verkeersborden en -regels",
//       },
//       {
//         _id: "4",
//         question: "Wat is de minimale volgafstand op de snelweg bij 100 km/h?",
//         options: ["1 seconde", "2 seconden", "3 seconden", "4 seconden"],
//         correctAnswer: 2,
//         explanation:
//           "De minimale volgafstand op de snelweg is 3 seconden. Dit geeft je voldoende tijd om te reageren bij noodremmen.",
//         category: "auto",
//         difficulty: "medium" as const,
//         topic: "Snelheid en afstand",
//       },
//       {
//         _id: "5",
//         question: "Wanneer mag je een doorgetrokken streep overschrijden?",
//         options: ["Nooit", "Bij inhalen", "Alleen in noodgevallen", "Bij het verlaten van de weg"],
//         correctAnswer: 3,
//         explanation:
//           "Een doorgetrokken streep mag alleen worden overschreden bij het verlaten van de weg (bijvoorbeeld bij het inrijden van een oprit).",
//         category: "auto",
//         difficulty: "hard" as const,
//         topic: "Verkeersborden en -regels",
//       },
//       {
//         _id: "6",
//         question: "Wat is de maximale alcoholpromillage voor beginnende bestuurders?",
//         options: ["0,0‰", "0,2‰", "0,5‰", "0,8‰"],
//         correctAnswer: 0,
//         explanation: "Voor beginnende bestuurders (eerste 5 jaar na het behalen van het rijbewijs) geldt 0,0‰ alcohol.",
//         category: "auto",
//         difficulty: "medium" as const,
//         topic: "Alcohol en drugs",
//       },
//       {
//         _id: "7",
//         question: "Hoe lang is een Nederlandse rijbewijs geldig?",
//         options: ["5 jaar", "10 jaar", "15 jaar", "Levenslang"],
//         correctAnswer: 1,
//         explanation: "Een Nederlands rijbewijs is 10 jaar geldig en moet daarna worden verlengd.",
//         category: "auto",
//         difficulty: "easy" as const,
//         topic: "Algemene kennis",
//       },
//       {
//         _id: "8",
//         question: "Wat moet je doen bij een voorrangsbord (driehoek met punt naar beneden)?",
//         options: [
//           "Stoppen",
//           "Voorrang verlenen aan alle verkeer",
//           "Alleen voorrang verlenen aan verkeer van rechts",
//           "Snelheid minderen",
//         ],
//         correctAnswer: 1,
//         explanation: "Bij een voorrangsbord moet je voorrang verlenen aan al het verkeer op de kruisende weg.",
//         category: "auto",
//         difficulty: "medium" as const,
//         topic: "Voorrang en kruispunten",
//       },
//     ],
//     scooter: [
//       {
//         _id: "9",
//         question: "Wat is de maximumsnelheid voor een bromfiets?",
//         options: ["25 km/h", "35 km/h", "45 km/h", "55 km/h"],
//         correctAnswer: 2,
//         explanation: "De maximumsnelheid voor een bromfiets is 45 km/h.",
//         category: "scooter",
//         difficulty: "easy" as const,
//         topic: "Snelheid en veiligheid",
//       },
//       {
//         _id: "10",
//         question: "Vanaf welke leeftijd mag je een bromfiets besturen?",
//         options: ["14 jaar", "15 jaar", "16 jaar", "18 jaar"],
//         correctAnswer: 2,
//         explanation: "Je mag vanaf 16 jaar een bromfiets besturen met een AM-rijbewijs.",
//         category: "scooter",
//         difficulty: "easy" as const,
//         topic: "Algemene kennis",
//       },
//       {
//         _id: "11",
//         question: "Mag je met een bromfiets op het fietspad rijden?",
//         options: ["Ja, altijd", "Nee, nooit", "Alleen buiten de bebouwde kom", "Alleen als er geen autoweg is"],
//         correctAnswer: 2,
//         explanation:
//           "Met een bromfiets mag je alleen buiten de bebouwde kom op het fietspad rijden, mits dit is toegestaan.",
//         category: "scooter",
//         difficulty: "medium" as const,
//         topic: "Fietspad gebruik",
//       },
//       {
//         _id: "12",
//         question: "Wat is het maximale cilindervolume van een bromfiets?",
//         options: ["25cc", "50cc", "75cc", "100cc"],
//         correctAnswer: 1,
//         explanation: "Een bromfiets mag maximaal 50cc cilinderinhoud hebben.",
//         category: "scooter",
//         difficulty: "easy" as const,
//         topic: "Technische eisen",
//       },
//       {
//         _id: "13",
//         question: "Is een helm verplicht op een bromfiets?",
//         options: ["Nee, nooit", "Ja, altijd", "Alleen boven 25 km/h", "Alleen buiten de bebouwde kom"],
//         correctAnswer: 1,
//         explanation: "Een helm is altijd verplicht bij het besturen van een bromfiets.",
//         category: "scooter",
//         difficulty: "easy" as const,
//         topic: "Helm en bescherming",
//       },
//     ],
//     motor: [
//       {
//         _id: "14",
//         question: "Wat is het verschil tussen categorie A1 en A2?",
//         options: ["Leeftijd en vermogen", "Alleen leeftijd", "Alleen vermogen", "Er is geen verschil"],
//         correctAnswer: 0,
//         explanation: "A1 is vanaf 18 jaar voor motoren tot 11 kW, A2 is vanaf 20 jaar voor motoren tot 35 kW.",
//         category: "motor",
//         difficulty: "medium" as const,
//         topic: "Motorspecifieke regels",
//       },
//       {
//         _id: "15",
//         question: "Wanneer is een helm verplicht op de motor?",
//         options: ["Alleen op de snelweg", "Alleen boven 50 km/h", "Altijd", "Alleen bij slecht weer"],
//         correctAnswer: 2,
//         explanation:
//           "Een helm is altijd verplicht bij het besturen van een motorfiets, ongeacht de snelheid of locatie.",
//         category: "motor",
//         difficulty: "easy" as const,
//         topic: "Beschermende kleding",
//       },
//       {
//         _id: "16",
//         question: "Wat is het maximale vermogen voor een A2 motorfiets?",
//         options: ["11 kW", "25 kW", "35 kW", "Onbeperkt"],
//         correctAnswer: 2,
//         explanation: "Voor categorie A2 is het maximale vermogen 35 kW (47 pk).",
//         category: "motor",
//         difficulty: "medium" as const,
//         topic: "Motorspecifieke regels",
//       },
//       {
//         _id: "17",
//         question: "Vanaf welke leeftijd mag je een A1 motorfiets besturen?",
//         options: ["16 jaar", "18 jaar", "20 jaar", "21 jaar"],
//         correctAnswer: 1,
//         explanation: "Je mag vanaf 18 jaar een A1 motorfiets besturen.",
//         category: "motor",
//         difficulty: "easy" as const,
//         topic: "Algemene kennis",
//       },
//       {
//         _id: "18",
//         question: "Wat betekent progressieve toegang bij motorrijbewijzen?",
//         options: [
//           "Je mag direct alle motoren besturen",
//           "Je moet eerst ervaring opdoen met lichtere motoren",
//           "Je betaalt minder voor je rijbewijs",
//           "Je hoeft geen theorie-examen te doen",
//         ],
//         correctAnswer: 1,
//         explanation:
//           "Progressieve toegang betekent dat je eerst ervaring moet opdoen met lichtere motoren voordat je zwaardere motoren mag besturen.",
//         category: "motor",
//         difficulty: "hard" as const,
//         topic: "Motorspecifieke regels",
//       },
//     ],
//   }

//   const categoryQuestions = sampleQuestions[category as keyof typeof sampleQuestions] || sampleQuestions.auto
//   return categoryQuestions.slice(0, limit)
// }
