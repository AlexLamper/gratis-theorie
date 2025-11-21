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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 mb-6">
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Theorie Proefexamens</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Test je kennis met volledige proefexamens die identiek zijn aan het echte CBR theorie-examen. 
            40 vragen, 30 minuten tijd, en je hebt 70% nodig om te slagen.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Vragen", value: "40", icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Tijd", value: "30 min", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Slagen", value: "70%", icon: Target, color: "text-green-600", bg: "bg-green-50" },
              { label: "Kosten", value: "€0", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Categories */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => {
            const exams = examsByCategory[category.id] || []
            const Icon = category.icon

            return (
              <Card key={category.id} className="border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden rounded-2xl group">
                <div className={`h-2 w-full ${category.bgColor.replace('bg-', 'bg-gradient-to-r from-').replace('50', '500').replace('to-', 'to-white').split(' ')[0]}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${category.bgColor}`}>
                      <Icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {exams.length} Examens
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{category.name}</CardTitle>
                  <CardDescription className="text-slate-600 text-base mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-8 flex-1">
                    {category.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {exams.length > 0 ? (
                      exams.map((exam: any) => (
                        <Button
                          key={exam._id}
                          asChild
                          className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-colors h-12 text-base"
                        >
                          <Link href={`/exams/start?examId=${exam._id}`}>
                            Start {exam.title}
                          </Link>
                        </Button>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                        <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500 font-medium">Binnenkort beschikbaar</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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
