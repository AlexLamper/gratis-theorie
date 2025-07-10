import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Trophy, Car, Bike, BikeIcon as Motorcycle, CheckCircle, AlertCircle, Target, Users } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default function ExamsPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CBR Proefexamens</h1>
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

        {/* Important Info Banner */}
        <Card className="mb-12 border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Belangrijk voor je Proefexamen</h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Zorg voor een rustige omgeving zonder afleiding</li>
                  <li>• Neem de tijd om elke vraag goed te lezen</li>
                  <li>• Je kunt teruggaan naar eerdere vragen</li>
                  <li>• Het examen wordt automatisch ingeleverd na 30 minuten</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const IconComponent = category.icon

            return (
              <Card
                key={category.id}
                className={`overflow-hidden hover:shadow-xl transition-all border-2 ${category.borderColor}`}
              >
                <div className="lg:flex">
                  {/* Left side - Category info */}
                  <div className={`${category.bgColor} p-8 lg:w-1/3`}>
                    <div className="text-center">
                      <IconComponent className={`h-16 w-16 ${category.color} mx-auto mb-4`} />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                      <p className="text-gray-600 mb-6">{category.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{category.timeLimit} minuten tijd</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{category.questions} vragen</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Trophy className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{category.passRate}% om te slagen</span>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="lg"
                        className={`w-full ${
                          category.color === "text-blue-600"
                            ? "bg-blue-600 hover:bg-blue-700 border border-blue-700/80"
                            : category.color === "text-green-600"
                              ? "bg-green-600 hover:bg-green-700 border border-green-700/80"
                              : "bg-red-600 hover:bg-red-700 border border-red-700/80"
                        }`}
                      >
                        <Link href={`/exams/start?category=${category.id}`}>
                          <Trophy className="h-4 w-4 mr-2" />
                          Start Proefexamen
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right side - Features and info */}
                  <div className="p-8 lg:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Wat kun je verwachten?</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Examen Voorbereiding Tips:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Oefen eerst voldoende met losse vragen</li>
                        <li>• Zorg dat je alle onderwerpen beheerst</li>
                        <li>• Doe het examen in één keer, zonder pauzes</li>
                        <li>• Lees elke vraag zorgvuldig door</li>
                        <li>• Gebruik de vraag navigator om je voortgang te volgen</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Success Statistics */}
        <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Slagingspercentages</CardTitle>
            <CardDescription>Resultaten van gebruikers die ons platform hebben gebruikt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                <div className="text-gray-600">Slaagt na voorbereiding met ons platform</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-gray-600">Voelt zich goed voorbereid</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">15k+</div>
                <div className="text-gray-600">Geslaagde gebruikers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
    </div>
  )
}
