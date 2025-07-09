"use client"

import { useState, useEffect, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, Car, Bike, BikeIcon as Motorcycle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface TrafficSign {
  _id: string
  name: string
  description: string
  meaning: string
  category: string
  type: "gebod" | "verbod" | "waarschuwing" | "voorrang" | "informatie"
  shape: "rond" | "driehoek" | "vierkant" | "achthoek" | "ruit"
  color: string
  image: string
  applicableFor: string[]
  examples?: string[]
}

export default function CategoryTrafficSignsPage() {
  const params = useParams()
  const category = params.category as string

  const [signs, setSigns] = useState<TrafficSign[]>([])
  const [filteredSigns, setFilteredSigns] = useState<TrafficSign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const categoryInfo = {
    auto: {
      name: "Auto Verkeersborden",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Alle verkeersborden die relevant zijn voor autobestuurders",
    },
    bromfiets: {
      name: "Bromfiets Verkeersborden",
      icon: Bike,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Verkeersborden specifiek voor bromfiets- en scooterbestuurders",
    },
    motor: {
      name: "Motor Verkeersborden",
      icon: Motorcycle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Verkeersborden voor motorfietsbestuurders",
    },
  }

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo]
  const IconComponent = currentCategory?.icon || Car

  const signTypes = [
    { id: "all", name: "Alle Borden", count: 0 },
    { id: "gebod", name: "Gebodsborden", count: 0 },
    { id: "verbod", name: "Verbodsborden", count: 0 },
    { id: "waarschuwing", name: "Waarschuwingsborden", count: 0 },
    { id: "voorrang", name: "Voorrangsborden", count: 0 },
    { id: "informatie", name: "Informatieborden", count: 0 },
  ]

  // Fetch traffic signs
  useEffect(() => {
    const fetchSigns = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/traffic-signs?category=${category}`)
        const data = await response.json()
        setSigns(data.signs || [])
        setFilteredSigns(data.signs || [])
      } catch (error) {
        console.error("Error fetching traffic signs:", error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchSigns()
    }
  }, [category])

  // Filter signs based on search and type
  useEffect(() => {
    let filtered = signs

    if (searchTerm) {
      filtered = filtered.filter(
        (sign) =>
          sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sign.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((sign) => sign.type === selectedType)
    }

    setFilteredSigns(filtered)
  }, [signs, searchTerm, selectedType])

  // Update sign type counts
  const updatedSignTypes = signTypes.map((type) => ({
    ...type,
    count: type.id === "all" ? signs.length : signs.filter((sign) => sign.type === type.id).length,
  }))

  const getTypeColor = (type: string) => {
    const colors = {
      gebod: "bg-blue-100 text-blue-800",
      verbod: "bg-red-100 text-red-800",
      waarschuwing: "bg-yellow-100 text-yellow-800",
      voorrang: "bg-purple-100 text-purple-800",
      informatie: "bg-green-100 text-green-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getShapeIcon = (shape: string) => {
    const shapes = {
      rond: "⭕",
      driehoek: "🔺",
      vierkant: "⬜",
      achthoek: "🛑",
      ruit: "🔶",
    }
    return shapes[shape as keyof typeof shapes] || "⬜"
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Categorie niet gevonden</CardTitle>
            <CardDescription>De opgevraagde categorie bestaat niet.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/verkeersborden">Terug naar Overzicht</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/verkeersborden" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Terug naar Overzicht</span>
            </Link>
            <div className="flex items-center space-x-2">
              <IconComponent className={`h-5 w-5 ${currentCategory.color}`} />
              <h1 className="text-xl font-semibold text-gray-900">{currentCategory.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className={`${currentCategory.bgColor} rounded-lg p-6 mb-8`}>
          <div className="flex items-center space-x-4">
            <IconComponent className={`h-12 w-12 ${currentCategory.color}`} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h2>
              <p className="text-gray-600">{currentCategory.description}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Zoek verkeersborden..."
              value={searchTerm}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
        </div>

        {/* Type Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {updatedSignTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50 border"
              }`}
            >
              {type.name} ({type.count})
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verkeersborden laden...</p>
          </div>
        )}

        {/* Traffic Signs Grid */}
        {!loading && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {filteredSigns.length} van {signs.length} borden
            </div>

            {filteredSigns.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-600 mb-4">Geen verkeersborden gevonden voor je zoekopdracht.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                    }}
                  >
                    Filters Wissen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSigns.map((sign) => (
                  <Card key={sign._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{sign.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getTypeColor(sign.type)} variant="secondary">
                              {sign.type.charAt(0).toUpperCase() + sign.type.slice(1)}
                            </Badge>
                            <span className="text-lg" title={`Vorm: ${sign.shape}`}>
                              {getShapeIcon(sign.shape)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Sign Image */}
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          🚦
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Verkeersbord illustratie</p>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Beschrijving:</h4>
                        <p className="text-sm text-gray-600">{sign.description}</p>
                      </div>

                      {/* Meaning */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Betekenis:</h4>
                        <p className="text-sm text-gray-600">{sign.meaning}</p>
                      </div>

                      {/* Examples */}
                      {sign.examples && sign.examples.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Voorbeelden:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {sign.examples.map((example, index) => (
                              <li key={index} className="flex items-start space-x-1">
                                <span>•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Applicable For */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Van toepassing op:</h4>
                        <div className="flex flex-wrap gap-1">
                          {sign.applicableFor.map((vehicle, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {vehicle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Study Tips */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Studietips voor Verkeersborden</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Herkenning Tips:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Let op de vorm: rond (gebod), driehoek (waarschuwing), achthoek (stop)</li>
                <li>• Kleur is belangrijk: rood (verbod), blauw (gebod), geel (waarschuwing)</li>
                <li>• Symbolen zijn universeel en logisch ontworpen</li>
                <li>• Oefen regelmatig met verschillende combinaties</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Examen Tips:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Verkeersborden vormen 20-30% van het theorie-examen</li>
                <li>• Let goed op details in de vraagstelling</li>
                <li>• Sommige borden gelden alleen voor specifieke voertuigen</li>
                <li>• Begrijp de betekenis, niet alleen de vorm</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
