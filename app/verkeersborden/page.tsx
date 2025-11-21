import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Bike, BikeIcon as Motorcycle, Shield, AlertTriangle, Info, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default function VerkeersbordensPage() {
  const categories = [
    {
      id: "auto",
      name: "Auto Verkeersborden",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300",
      description: "Alle verkeersborden die relevant zijn voor autobestuurders",
      count: 90,
      sections: ["Gebodsborden", "Verbodsborden", "Waarschuwingsborden", "Voorrangsborden", "Informatieborden"],
    },
    {
      id: "bromfiets",
      name: "Bromfiets Verkeersborden",
      icon: Bike,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-300",
      description: "Verkeersborden specifiek voor bromfiets- en scooterbestuurders",
      count: 30,
      sections: ["Verbodsborden", "Gebodsborden", "Waarschuwingsborden", "Informatieborden"],
    },
    {
      id: "motor",
      name: "Motor Verkeersborden",
      icon: Motorcycle,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-red-200",
      hoverColor: "hover:border-red-300",
      description: "Verkeersborden voor motorfietsbestuurders en alle categorieën",
      count: 45,
      sections: ["Gebodsborden", "Verbodsborden", "Waarschuwingsborden", "Voorrangsborden", "Informatieborden"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Nederlandse Verkeersborden</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Leer alle verkeersborden die je moet kennen voor je theorie-examen. Georganiseerd per voertuigcategorie met
            duidelijke uitleg en betekenis.
          </p>
        </div>

        <div className="mb-16 max-w-6xl mx-auto">
          <Link href="/verkeersborden/alle" className="block group">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-50" />
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Meest compleet</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Alle Verkeersborden</h2>
                  <p className="text-lg text-slate-600 mb-8 max-w-xl">
                    Bekijk alle Nederlandse verkeersborden in één compleet overzicht. Perfect voor een
                    totaaloverzicht van alle borden die je moet kennen.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    { [
                      "90+ Borden",
                      "7 Categorieën",
                      "Alle Voertuigen"
                    ].map((badge, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">
                        {badge}
                      </span>
                    )) }
                  </div>
                </div>

                <div className="relative w-full md:w-auto">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <div className="grid grid-cols-3 gap-4 w-64">
                      <div className="aspect-square bg-red-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full" />
                      </div>
                      <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-md" />
                      </div>
                      <div className="aspect-square bg-yellow-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-yellow-400 transform rotate-45 rounded-sm" />
                      </div>
                      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-red-500 rounded-full" />
                      </div>
                      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full" />
                      </div>
                      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-white border-4 border-red-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/verkeersborden/${category.id}`} className="group">
                <Card className="h-full border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                  <div className={`h-2 w-full ${category.bgColor.replace('bg-gradient-to-br', 'bg-gradient-to-r').replace('50', '500').replace('to-', 'to-white').split(' ')[0]}`} />
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${category.bgColor.split(' ')[0]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-6 min-h-[3rem]">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Aantal borden</span>
                        <span className="font-semibold text-slate-900">{category.count}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color.replace('text-', 'bg-')}`} 
                          style={{ width: `${(category.count / 90) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                      Bekijk borden
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
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