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
      count: 120,
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
      count: 85,
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
      count: 110,
      sections: ["Gebodsborden", "Verbodsborden", "Waarschuwingsborden", "Voorrangsborden", "Informatieborden"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nederlandse Verkeersborden</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leer alle verkeersborden die je moet kennen voor je theorie-examen. Georganiseerd per voertuigcategorie met
            duidelijke uitleg en betekenis.
          </p>
        </div>

        <div className="mb-12">
          <Card className="overflow-hidden shadow-md border-gray-300/70 hover:shadow-lg transition-all duration-500 border hover:border-gray-300 bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900 group">
            <Link href="/verkeersborden/alle">
              <div className="relative">
                {/* Subtle Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-white/20 to-gray-50/20 pointer-events-none"></div>

                <CardContent className="relative p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Left Content */}
                    <div className="text-center lg:text-left lg:flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <Shield className="h-12 w-12 mr-4 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                        <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">Alle Verkeersborden</h2>
                      <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                        Bekijk alle Nederlandse verkeersborden in één compleet overzicht. Perfect voor een
                        totaaloverzicht van alle borden die je moet kennen.
                      </p>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        <Badge className="bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 transition-colors">
                          300+ Borden
                        </Badge>
                        <Badge className="bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 transition-colors">
                          7 Categorieën
                        </Badge>
                        <Badge className="bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 transition-colors">
                          Alle Voertuigen
                        </Badge>
                        <Badge className="bg-yellow-300 text-gray-800 font-semibold">
                          Meest Compleet
                        </Badge>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:flex-shrink-0">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {/* Sample signs preview */}
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              STOP
                            </div>
                          </div>
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              P
                            </div>
                          </div>
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <div className="w-12 h-12 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs">
                              50
                            </div>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 font-semibold group-hover:scale-105 transition-all duration-300"
                        >
                          <Shield className="mr-2 h-5 w-5" />
                          Bekijk Alle Verkeersborden
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Link>
          </Card>
        </div>

        {/* Categories Grid - Completely Redesigned */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon

            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-0"
              >
                <Link href={`/verkeersborden/${category.id}`}>
                  {/* Modern Header Design */}
                  <div className="relative w-full" style={{ height: "12rem" }}>
                    {/* Gradient Background - now flush with top */}
                    <div
                      className={`absolute top-0 left-0 w-full h-full ${category.bgColor} opacity-90`}
                      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    ></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="mb-4 relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-md scale-110"></div>
                        <IconComponent
                          className={`relative h-16 w-16 ${category.color} group-hover:scale-125 transition-transform duration-500 drop-shadow-lg`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                        {category.name}
                      </h3>
                      <Badge variant="secondary" className="bg-white/80 text-gray-700 border-0 font-semibold px-3 py-1">
                        {category.count}+ borden
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{category.description}</p>

                    {/* Feature Tags */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-gray-900">Categorieën:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.sections.slice(0, 3).map((section, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {section}
                          </span>
                        ))}
                        {category.sections.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            +{category.sections.length - 3} meer
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 font-semibold py-3 group-hover:bg-blue-600 transition-all duration-300">
                      <span>Bekijk Alle Borden</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border border-gray-300/70 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Waarom Verkeersborden Leren?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>• Verkeersborden vormen een groot deel van het theorie-examen</p>
              <p>• Kennis van borden is essentieel voor veilig verkeer</p>
              <p>• Verschillende categorieën hebben specifieke borden</p>
              <p>• Regelmatige herhaling verbetert je slagingskans</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300/70 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg">Tips voor het Leren</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-600">
              <p>• Begin met de meest voorkomende borden</p>
              <p>• Let op de vorm en kleur van elk bord</p>
              <p>• Oefen regelmatig met verschillende categorieën</p>
              <p>• Begrijp de betekenis, niet alleen de vorm</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}