import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Car, Bike, BikeIcon as Motorcycle, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const categories = [
    {
      id: "auto",
      name: "Auto (Categorie B)",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Theorie-examen voor personenauto's en lichte bedrijfsvoertuigen",
      details: [
        "Minimumleeftijd: 17 jaar",
        "Maximaal gewicht: 3.500 kg",
        "Maximaal 8 passagiers",
        "Aanhanger tot 750 kg",
      ],
      stats: {
        questions: 500,
        topics: 12,
        difficulty: "Gemiddeld",
      },
    },
    {
      id: "scooter",
      name: "Scooter (Categorie AM)",
      icon: Bike,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Theorie-examen voor bromfietsen en lichte quadricycles",
      details: [
        "Minimumleeftijd: 16 jaar",
        "Maximale snelheid: 45 km/h",
        "Cilinderinhoud: max 50cc",
        "Vermogen: max 4 kW",
      ],
      stats: {
        questions: 300,
        topics: 8,
        difficulty: "Makkelijk",
      },
    },
    {
      id: "motor",
      name: "Motor (Categorie A)",
      icon: Motorcycle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Theorie-examen voor motorfietsen en zware quadricycles",
      details: [
        "Minimumleeftijd: 18-24 jaar (afhankelijk van subcategorie)",
        "Verschillende vermogensklassen",
        "A1, A2, A subcategorieën",
        "Progressieve toegang mogelijk",
      ],
      stats: {
        questions: 400,
        topics: 10,
        difficulty: "Moeilijk",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Terug naar Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Alle Categorieën</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kies je Rijbewijscategorie</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elke categorie heeft zijn eigen theorie-examen met specifieke vragen en regels. Kies de categorie die bij
            jouw gewenste rijbewijs hoort.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {categories.map((category) => {
            const IconComponent = category.icon

            return (
              <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {/* Left side - Icon and basic info */}
                  <div
                    className={`${category.bgColor} p-8 md:w-1/3 flex flex-col items-center justify-center text-center`}
                  >
                    <IconComponent className={`h-16 w-16 ${category.color} mb-4`} />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{category.stats.questions}+ vragen</Badge>
                      <Badge variant="outline">{category.stats.difficulty}</Badge>
                    </div>
                  </div>

                  {/* Right side - Details and actions */}
                  <div className="p-8 md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Vereisten & Kenmerken</h4>
                        <ul className="space-y-2">
                          {category.details.map((detail, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stats and Actions */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Oefenmateriaal</h4>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Totaal vragen:</span>
                            <span className="font-medium">{category.stats.questions}+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Onderwerpen:</span>
                            <span className="font-medium">{category.stats.topics}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Moeilijkheidsgraad:</span>
                            <span className="font-medium">{category.stats.difficulty}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button asChild className="w-full">
                            <Link href={`/practice?category=${category.id}`}>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Start Oefenen
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full bg-transparent">
                            <Link href={`/exams?category=${category.id}`}>
                              <Trophy className="h-4 w-4 mr-2" />
                              Doe Proefexamen
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Belangrijk om te Weten</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Over de Theorie-examens</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Alle examens worden afgenomen door het CBR</li>
                  <li>• Je hebt minimaal 70% nodig om te slagen</li>
                  <li>• De vragen zijn gebaseerd op de officiële lesstof</li>
                  <li>• Regelmatig oefenen verhoogt je slagingskans aanzienlijk</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Tips voor Succes</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Oefen regelmatig met verschillende vraagtypen</li>
                  <li>• Doe meerdere proefexamens voordat je het echte examen doet</li>
                  <li>• Bestudeer de uitleg bij verkeerde antwoorden</li>
                  <li>• Zorg dat je alle onderwerpen beheerst</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
