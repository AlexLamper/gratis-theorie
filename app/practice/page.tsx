import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Target, Brain, Clock, Trophy, ArrowRight, Zap, Star } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Oefenen - Gratis Theorie-examen Vragen",
  description:
    "Oefen gratis voor je theorie-examen met actuele vragen. Kies uit verschillende onderwerpen en moeilijkheidsgraden. Auto, scooter en motor theorie.",
  openGraph: {
    title: "Oefenen - Gratis Theorie-examen Vragen",
    description:
      "Oefen gratis voor je theorie-examen met actuele vragen. Verschillende onderwerpen en moeilijkheidsgraden.",
  },
}

export default function PracticePage() {
  const categories = [
    {
      id: "auto",
      name: "Auto (B)",
      description: "Personenauto's en lichte bedrijfsvoertuigen",
      color: "blue",
      questions: 500,
      topics: [
        "Verkeersborden en -regels",
        "Voorrang en kruispunten",
        "Snelheid en afstand",
        "Parkeren en stilstaan",
        "Alcohol en drugs",
        "Milieu en zuinig rijden",
      ],
    },
    {
      id: "scooter",
      name: "Scooter (AM)",
      description: "Bromfietsen en lichte quadricycles",
      color: "green",
      questions: 300,
      topics: [
        "Verkeersborden",
        "Voorrangsregels",
        "Snelheid en veiligheid",
        "Helm en bescherming",
        "Fietspad gebruik",
        "Technische eisen",
      ],
    },
    {
      id: "motor",
      name: "Motor (A)",
      description: "Motorfietsen en zware quadricycles",
      color: "red",
      questions: 400,
      topics: [
        "Verkeersborden en -regels",
        "Voorrang en kruispunten",
        "Snelheid en remmen",
        "Bochten en inhalen",
        "Beschermende kleding",
        "Motorspecifieke regels",
      ],
    },
  ]

  const practiceTypes = [
    {
      id: "mixed",
      title: "Gemengd Oefenen",
      description: "Willekeurige vragen uit alle onderwerpen",
      icon: Brain,
      color: "bg-purple-500",
      recommended: true,
    },
    {
      id: "topic",
      title: "Per Onderwerp",
      description: "Focus op specifieke onderwerpen",
      icon: Target,
      color: "bg-blue-500",
    },
    {
      id: "difficulty",
      title: "Per Moeilijkheid",
      description: "Oefen op jouw niveau",
      icon: Star,
      color: "bg-green-500",
    },
    {
      id: "mistakes",
      title: "Foutieve Vragen",
      description: "Herhaal vragen die je fout had",
      icon: Zap,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oefenen voor je Theorie-examen</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kies je voertuigcategorie en begin met oefenen. Alle vragen zijn gebaseerd op de nieuwste CBR richtlijnen.
          </p>
        </div>

        {/* Practice Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Hoe wil je oefenen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card
                  key={type.id}
                  className={`hover:shadow-lg transition-all cursor-pointer border-2 ${type.recommended ? "border-purple-200 bg-purple-50" : "hover:border-gray-300"}`}
                >
                  <CardContent className="p-6 text-center">
                    {type.recommended && <Badge className="mb-3 bg-purple-100 text-purple-800">Aanbevolen</Badge>}
                    <div
                      className={`${type.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Kies je Categorie</h2>

          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-blue-200"
            >
              <div className="md:flex">
                {/* Left side - Category info */}
                <div
                  className={`p-8 md:w-1/3 bg-gradient-to-br ${
                    category.color === "blue"
                      ? "from-blue-50 to-blue-100"
                      : category.color === "green"
                        ? "from-green-50 to-green-100"
                        : "from-red-50 to-red-100"
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Badge variant="secondary" className="mb-4">
                      {category.questions}+ vragen
                    </Badge>

                    <div className="space-y-2">
                      <Button
                        asChild
                        className={`w-full ${
                          category.color === "blue"
                            ? "bg-blue-600 hover:bg-blue-700 border border-blue-700/80"
                            : category.color === "green"
                              ? "bg-green-600 hover:bg-green-700 border border-green-700/80"
                              : "bg-red-600 hover:bg-red-700 border border-red-700/80"
                        }`}
                      >
                        <Link href={`/practice/mixed?category=${category.id}`}>
                          <Brain className="mr-2 h-4 w-4" />
                          Start Gemengd Oefenen
                        </Link>
                      </Button>

                      <Button asChild variant="outline" className="w-full bg-transparent border border-gray-300/80">
                        <Link href={`/practice/topics?category=${category.id}`}>
                          <Target className="mr-2 h-4 w-4" />
                          Kies Onderwerp
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right side - Topics */}
                <div className="p-8 md:w-2/3">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Beschikbare Onderwerpen:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {category.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Proefexamen beschikbaar</span>
                    </div>
                    <p className="text-blue-800 text-sm mb-3">
                      Test je kennis met een volledig proefexamen (40 vragen, 30 minuten)
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-700 hover:bg-blue-100 bg-transparent border border-blue-200/80"
                    >
                      <Link href={`/exams?category=${category.id}`}>
                        <Clock className="mr-2 h-4 w-4" />
                        Start Proefexamen
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Tips voor Effectief Oefenen</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Studietips:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Oefen dagelijks 15-30 minuten voor de beste resultaten</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Begin met gemengd oefenen, focus daarna op zwakke punten</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Lees de uitleg bij verkeerde antwoorden altijd goed door</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Doe regelmatig proefexamens om je voortgang te meten</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Examen Tips:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Je hebt 70% nodig om te slagen voor het echte examen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Verkeersborden vormen een groot deel van het examen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Neem de tijd om vragen goed te lezen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Blijf kalm en vertrouw op je voorbereiding</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
