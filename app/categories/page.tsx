import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  Bike,
  BikeIcon as Motorcycle,
  BookOpen,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import LearningUnavailableAlert from "@/components/LearningUnavailableAlert"

export default function CategoriesPage() {
  const categories = [
    {
      id: "auto",
      name: "Auto (Categorie B)",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description:
        "Theorie-examen voor personenauto's en lichte bedrijfsvoertuigen",
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
    <div className="min-h-screen bg-slate-50 py-12">
      <LearningUnavailableAlert />
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Kies je Rijbewijscategorie
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Elke categorie heeft zijn eigen theorie-examen met specifieke
            vragen en regels. Kies de categorie die bij jouw gewenste rijbewijs
            hoort.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => {
            const IconComponent = category.icon
            const isDisabled =
              category.id === "motor" || category.id === "scooter"

            return (
              <div
                key={category.id}
                className={`group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${
                  isDisabled ? "opacity-75" : "hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {category.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                    POPULAIR
                  </div>
                )}
                
                {isDisabled && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Binnenkort
                    </span>
                  </div>
                )}

                <div className={`h-2 w-full ${category.bgColor.replace('bg-', 'bg-gradient-to-r from-').replace('50', '500').replace('to-', 'to-white').split(' ')[0]}`} />
                
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 ${category.color}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 mb-6 min-h-[3rem]">
                    {category.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {category.details.map((detail, index) => (
                      <div key={index} className="flex items-start text-sm text-slate-600">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${category.color.replace('text-', 'bg-')}`} />
                        {detail}
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{category.stats.questions}</div>
                        <div className="text-xs text-slate-500">Vragen</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{category.stats.topics}</div>
                        <div className="text-xs text-slate-500">Onderwerpen</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{category.stats.difficulty}</div>
                        <div className="text-xs text-slate-500">Niveau</div>
                      </div>
                    </div>

                    {isDisabled ? (
                      <Button disabled className="w-full bg-slate-100 text-slate-400 cursor-not-allowed">
                        Niet beschikbaar
                      </Button>
                    ) : (
                      <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-colors" asChild>
                        <Link href={`/leren/${category.id}`}>
                          Start met Leren
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
