import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Car, Bike, BikeIcon as Motorcycle, Shield, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

export default function VerkeersbordensPage() {
  const categories = [
    {
      id: "auto",
      name: "Auto Verkeersborden",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Alle verkeersborden die relevant zijn voor autobestuurders",
      count: 120,
      sections: ["Gebodsborden", "Verbodsborden", "Waarschuwingsborden", "Voorrangsborden", "Informatieborden"],
    },
    {
      id: "bromfiets",
      name: "Bromfiets Verkeersborden",
      icon: Bike,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Verkeersborden specifiek voor bromfiets- en scooterbestuurders",
      count: 85,
      sections: ["Verbodsborden", "Gebodsborden", "Waarschuwingsborden", "Informatieborden"],
    },
    {
      id: "motor",
      name: "Motor Verkeersborden",
      icon: Motorcycle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Verkeersborden voor motorfietsbestuurders en alle categorieën",
      count: 110,
      sections: ["Gebodsborden", "Verbodsborden", "Waarschuwingsborden", "Voorrangsborden", "Informatieborden"],
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
            <h1 className="text-xl font-semibold text-gray-900">Verkeersborden</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nederlandse Verkeersborden</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leer alle verkeersborden die je moet kennen voor je theorie-examen. Georganiseerd per voertuigcategorie met
            duidelijke uitleg en betekenis.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon

            return (
              <Card
                key={category.id}
                className={`hover:shadow-lg transition-all duration-300 ${category.borderColor} border-2 group cursor-pointer`}
              >
                <Link href={`/verkeersborden/${category.id}`}>
                  <CardHeader className={`${category.bgColor} text-center`}>
                    <IconComponent
                      className={`h-12 w-12 ${category.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    />
                    <CardTitle className="text-xl text-gray-900">{category.name}</CardTitle>
                    <CardDescription className="text-gray-600">{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Totaal borden:</span>
                        <Badge variant="secondary">{category.count}+</Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Categorieën:</h4>
                        <div className="flex flex-wrap gap-1">
                          {category.sections.map((section, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full mt-4 group-hover:bg-blue-700">Bekijk Alle Borden</Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
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

          <Card>
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

        {/* Quick Stats */}
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Platform Statistieken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-600">300+</div>
                <div className="text-sm text-gray-600">Verkeersborden</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">Categorieën</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Voertuigtypen</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Gratis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
