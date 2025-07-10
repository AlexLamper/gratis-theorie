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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const exams = examsByCategory[category.id] || [];

            const getButtonClass = () => {
              if (category.color === "text-blue-600") {
                return "bg-blue-600 hover:bg-blue-700 border border-blue-700/80 text-white";
              }
              if (category.color === "text-green-600") {
                return "bg-green-600 hover:bg-green-700 border border-green-700/80 text-white";
              }
              return "bg-red-600 hover:bg-red-700 border border-red-700/80 text-white";
            };

            return (
              <Card
                key={category.id}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                {/* Header / Icon / Metadata */}
                <div className={`p-6 ${category.bgColor} ${category.borderColor} border-b flex flex-col items-center text-center`}>
                  <IconComponent className={`h-12 w-12 ${category.color} mb-3`} />
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h2>
                  <p className="text-gray-700 text-sm mb-4">{category.description}</p>

                  <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
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
                </div>

                {/* Features & Exams */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  {/* <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Wat kun je verwachten?</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {exams.length > 0 ? (
                    <div className="space-y-2">
                      {exams.map((exam) => (
                        <Button
                          asChild
                          key={exam.slug}
                          size="sm"
                          className={`w-full ${getButtonClass()}`}
                        >
                          <Link href={`/exams/start?exam=${exam.slug}`}>
                            <Trophy className="h-4 w-4 mr-2" />
                            {exam.title}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center">Geen examens beschikbaar</p>
                  )}
                </div>
              </Card>
            );
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
