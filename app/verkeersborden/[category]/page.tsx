"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Car, Bike, BikeIcon as Motorcycle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Footer from "@/components/footer"

interface TrafficSign {
  _id: string
  name: string
  description: string
  meaning: string
  category: string
  type: "gebod" | "verbod" | "waarschuwing" | "voorrang" | "informatie" | "snelheid" | "rijrichting" | "parkeren"
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
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

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
    alle: {
      name: "Alle Verkeersborden",
      icon: Car,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Alle Nederlandse verkeersborden in één overzicht",
    },
  }

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo]
  const IconComponent = currentCategory?.icon || Car

  const signTypes = [
    { id: "all", name: "Alle Borden", count: 0 },
    { id: "waarschuwing", name: "Waarschuwingsborden", count: 0 },
    { id: "snelheid", name: "Snelheidsborden", count: 0 },
    { id: "voorrang", name: "Voorrangsborden", count: 0 },
    { id: "informatie", name: "Informatieborden", count: 0 },
    { id: "verbod", name: "Verbodsborden", count: 0 },
    { id: "rijrichting", name: "Rijrichtingen", count: 0 },
    { id: "parkeren", name: "Parkeren", count: 0 },
  ]

  // Fetch traffic signs
  useEffect(() => {
    const fetchSigns = async () => {
      if (!mounted) return

      try {
        setLoading(true)
        console.log(`Fetching signs for category: ${category}`)

        const response = await fetch(`/api/traffic-signs?category=${category}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text()
          console.error("Non-JSON response:", text.substring(0, 200))
          throw new Error("Server returned non-JSON response")
        }

        const data = await response.json()
        console.log(`Received ${data.signs?.length || 0} signs from ${data.source || "unknown"}`)

        setSigns(data.signs || [])
        setFilteredSigns(data.signs || [])
      } catch (error) {
        console.error("Error fetching traffic signs:", error)

        // Set empty state on error
        setSigns([])
        setFilteredSigns([])
      } finally {
        setLoading(false)
      }
    }

    if (category && mounted) {
      fetchSigns()
    }
  }, [category, mounted])

  // Filter signs based on search and type
  useEffect(() => {
    if (!mounted) return

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
  }, [signs, searchTerm, selectedType, mounted])

  // Update sign type counts
  const updatedSignTypes = signTypes.map((type) => ({
    ...type,
    count: type.id === "all" ? signs.length : signs.filter((sign) => sign.type === type.id).length,
  }))

  const getTypeColor = (type: string) => {
    const colors = {
      gebod: "bg-blue-50 text-blue-700 border-blue-200",
      verbod: "bg-red-50 text-red-700 border-red-200",
      waarschuwing: "bg-yellow-50 text-yellow-700 border-yellow-200",
      voorrang: "bg-purple-50 text-purple-700 border-purple-200",
      informatie: "bg-green-50 text-green-700 border-green-200",
      snelheid: "bg-orange-50 text-orange-700 border-orange-200",
      rijrichting: "bg-indigo-50 text-indigo-700 border-indigo-200",
      parkeren: "bg-gray-50 text-gray-700 border-gray-200",
    }
    return colors[type as keyof typeof colors] || "bg-gray-50 text-gray-700 border-gray-200"
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

  // Fix scroll to top on page load
  useEffect(() => {
    if (mounted) {
      window.scrollTo(0, 0)
    }
  }, [mounted, category])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Laden...</p>
          </div>
        </div>
      </div>
    )
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
            <Button asChild className="border border-blue-700/80">
              <Link href="/verkeersborden">Terug naar Overzicht</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className={`${currentCategory.bgColor} rounded-lg p-6 mb-8`}>
          <div className="flex items-center space-x-4">
            <IconComponent className={`h-12 w-12 ${currentCategory.color}`} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h1>
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                selectedType === type.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
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

        {/* Traffic Signs Grid - Professional Design */}
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
                    className="border border-blue-700/80"
                  >
                    Filters Wissen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSigns.map((sign) => (
                  <Card
                    key={sign._id}
                    className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-6">
                      {/* Sign Image */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4 text-center group-hover:bg-gray-100 transition-colors">
                        <img
                          src={sign.image || "/placeholder.svg?height=160&width=160"}
                          alt={sign.name}
                          className="w-32 h-32 mx-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=160&width=160"
                          }}
                        />
                      </div>

                      {/* Sign Info */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
                            {sign.name}
                          </h3>
                          <span className="text-lg ml-2 flex-shrink-0" title={`Vorm: ${sign.shape}`}>
                            {getShapeIcon(sign.shape)}
                          </span>
                        </div>

                        <Badge className={`${getTypeColor(sign.type)} text-xs font-medium border`} variant="outline">
                          {sign.type.charAt(0).toUpperCase() + sign.type.slice(1)}
                        </Badge>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{sign.description}</p>

                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-900 mb-1">Betekenis:</p>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{sign.meaning}</p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {sign.applicableFor.slice(0, 2).map((vehicle, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                            >
                              {vehicle}
                            </Badge>
                          ))}
                          {sign.applicableFor.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                              +{sign.applicableFor.length - 2}
                            </Badge>
                          )}
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
        <Card className="mt-12 border border-gray-300/70">
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
      <Footer />
    </div>
  )
}
