import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Bike,
  BikeIcon as Motorcycle,
  BookOpen,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

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
      popular: true,
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
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kies je Rijbewijscategorie</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elke categorie heeft zijn eigen theorie-examen met specifieke vragen en regels. Kies de categorie die bij
            jouw gewenste rijbewijs hoort.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon

            return (
              <Card
                key={category.id}
                className={`group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-0
                  ${category.popular ? "scale-[1.03] z-10 md:row-start-1 md:col-start-2" : ""}
                `}
              >
                {/* Header block with background flush to top */}
                <div className="relative w-full" style={{ height: "12rem" }}>
                  {/* Colored full background span */}
                  <div
                    className={`absolute top-0 left-0 w-full h-full ${category.bgColor} opacity-90`}
                    style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  ></div>

                  {/* Decorative blurry elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

                  {/* Icon + title in foreground */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="mb-4 relative">
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-md scale-110"></div>
                      <IconComponent
                        className={`relative h-14 w-14 ${category.color} group-hover:scale-125 transition-transform duration-500 drop-shadow-lg`}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-700">{category.description}</p>
                  </div>
                </div>

                {/* Body content below */}
                <CardContent className="p-6 space-y-4">
                  <ul className="space-y-1">
                    {category.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <span className="font-semibold">{category.stats.questions}+</span>
                      <div className="text-gray-600">Vragen</div>
                    </div>
                    <div>
                      <span className="font-semibold">{category.stats.topics}</span>
                      <div className="text-gray-600">Onderwerpen</div>
                    </div>
                    <div>
                      <span className="font-semibold">{category.stats.difficulty}</span>
                      <div className="text-gray-600">Niveau</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      asChild
                      className="w-full border border-blue-700/80 transition-colors duration-200 hover:bg-blue-700/90 hover:text-white"
                    >
                      <Link href={`/leren/${category.id}`} className="flex items-center justify-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start met Leren
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-transparent border border-gray-300/80 transition-colors duration-200 hover:bg-gray-100"
                    >
                      <Link href={`/exams`} className="flex items-center justify-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        Doe Proefexamen
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <Card className="group relative overflow-hidden mt-12 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-0">
          {/* Header - flush background to top */}
          <div className="relative w-full" style={{ height: "8rem" }}>
            {/* Full colored background */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-90"
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            ></div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

            {/* Title content */}
            <div className="relative h-full flex items-center justify-center text-center px-6">
              <h2 className="text-2xl font-bold text-blue-900 group-hover:text-blue-800 transition-colors">
                Belangrijk om te Weten
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <CardContent className="pb-12 pt-6">
            <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-sm">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-gray-900">Over de Theorie-examens</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Alle examens worden afgenomen door het CBR</li>
                  <li>Je hebt minimaal 70% nodig om te slagen</li>
                  <li>Vragen gebaseerd op de officiële lesstof</li>
                  <li>Regelmatig oefenen verhoogt je slagingskans</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-gray-900">Tips voor Succes</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Oefen regelmatig met verschillende vraagtypen</li>
                  <li>Doe meerdere proefexamens voor het echte examen</li>
                  <li>Bestudeer de uitleg bij verkeerde antwoorden</li>
                  <li>Zorg dat je alle onderwerpen beheerst</li>
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
