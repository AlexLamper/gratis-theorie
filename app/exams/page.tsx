import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Trophy, Car, Bike, BikeIcon as Motorcycle, CheckCircle, AlertCircle, Target, Users } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default async function ExamsPage() {
  const categories = [
    {
      id: "auto",
      name: "Auto (B)",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Volledige proefexamen voor personenauto's",
      questions: 40,
      timeLimit: 30,
      passRate: 70,
      features: [
        "40 officiële CBR-stijl vragen",
        "30 minuten tijdslimiet",
        "70% vereist om te slagen",
        "Directe resultaten en uitleg",
        "Vraag navigator",
        "Realistische examenervaring",
      ],
    },
    {
      id: "scooter",
      name: "Scooter (AM)",
      icon: Bike,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Volledige proefexamen voor bromfietsen",
      questions: 40,
      timeLimit: 30,
      passRate: 70,
      features: [
        "40 officiële CBR-stijl vragen",
        "30 minuten tijdslimiet",
        "70% vereist om te slagen",
        "Bromfiets-specifieke vragen",
        "Verkeersborden en regels",
        "Praktische situaties",
      ],
    },
    {
      id: "motor",
      name: "Motor (A)",
      icon: Motorcycle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Volledige proefexamen voor motorfietsen",
      questions: 40,
      timeLimit: 30,
      passRate: 70,
      features: [
        "40 officiële CBR-stijl vragen",
        "30 minuten tijdslimiet",
        "70% vereist om te slagen",
        "Motor-specifieke situaties",
        "A1, A2 en A categorieën",
        "Geavanceerde verkeerssituaties",
      ],
    },
  ]

  const examsByCategory: Record<string, any[]> = {}
  for (const cat of categories) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/exams?category=${cat.id}`, { cache: 'no-store' })
      const data = await res.json()
      examsByCategory[cat.id] = data.exams
    } catch (e) {
      examsByCategory[cat.id] = []
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Theorie Proefexamens</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Test je kennis met volledige proefexamens die identiek zijn aan het echte CBR theorie-examen. 40 vragen, 30
            minuten tijd, en je hebt 70% nodig om te slagen.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">40</div>
              <div className="text-sm text-gray-600">Vragen</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">30</div>
              <div className="text-sm text-gray-600">Minuten</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">70%</div>
              <div className="text-sm text-gray-600">Om te slagen</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Gratis</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid gap-10">
          {categories.map((category) => {
            const IconComponent = category.icon

            return (
              <Card
                key={category.id}
                className={`overflow-hidden rounded-xl border-2 ${category.borderColor} hover:shadow-lg transition-all`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Category info */}
                  <div
                    className={`${category.bgColor} ${category.borderColor} lg:border-r p-8 flex flex-col items-center text-center lg:w-1/3`}
                  >
                    <IconComponent className={`h-16 w-16 ${category.color} mb-4`} />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{category.timeLimit} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{category.questions} vragen</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>{category.passRate}%</span>
                      </div>
                    </div>

                    {examsByCategory[category.id]?.length ? (
                      <div className="w-full space-y-3">
                        {examsByCategory[category.id].map((exam) => (
                          <Button
                            asChild
                            key={exam.slug}
                            size="lg"
                            className={`w-full ${
                              category.color === "text-blue-600"
                                ? "bg-blue-600 hover:bg-blue-700 border border-blue-700/80 text-white"
                                : category.color === "text-green-600"
                                  ? "bg-green-600 hover:bg-green-700 border border-green-700/80 text-white"
                                  : "bg-red-600 hover:bg-red-700 border border-red-700/80 text-white"
                            }`}
                          >
                            <Link href={`/exams/start?exam=${exam.slug}`}>
                              <Trophy className="h-4 w-4 mr-2" />
                              {exam.title}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Geen examens beschikbaar</p>
                    )}
                  </div>

                  {/* Right side - Features and info */}
                  <div className="p-8 lg:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Wat kun je verwachten?</h3>

                    <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-700">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Nog niet klaar voor een proefexamen?</h3>
            <p className="text-lg mb-6 opacity-90">
              Begin eerst met oefenen met losse vragen om je kennis op te bouwen
            </p>
            <Button asChild size="lg" variant="secondary" className="border border-white/80">
              <Link href="/practice">
                <Target className="h-4 w-4 mr-2" />
                Start met Oefenen
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
