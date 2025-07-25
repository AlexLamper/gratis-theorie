"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Car, Bike, BikeIcon as Motorcycle, AlertTriangle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import Footer from "@/components/footer"
import DonationPrompt from "@/components/DonationPrompt"

interface TrafficSign {
  _id: string
  name: string
  description: string
  meaning: string
  category: string
  type: string
  shape: string
  color: string
  image: string
  applicableFor: string[]
  createdAt: string
  updatedAt: string
}

// Simple SVG fallback placeholder
const createPlaceholderSVG = (width = 160, height = 160) => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 3}" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2"/>
      <text x="${width / 2}" y="${height / 2 + 5}" textAnchor="middle" fill="#6b7280" fontFamily="Arial, sans-serif" fontSize="14">?</text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export default function CategoryTrafficSignsPage() {
  const params = useParams()
  const category = params.category as string
  const pathname = usePathname()
  const router = useRouter()

  const [signs, setSigns] = useState<TrafficSign[]>([])
  const [filteredSigns, setFilteredSigns] = useState<TrafficSign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [mounted, setMounted] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
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
    "waarschuwing", "snelheid", "voorrang", "informatie", "verbod", "rijrichting", "parkeren",
  ]

  // Image fallback
  const handleImageError = (signId: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageErrors.has(signId)) {
      setImageErrors((prev) => new Set(prev).add(signId))
      event.currentTarget.src = createPlaceholderSVG(160, 160)
    }
  }

  const fetchSigns = async () => {
    if (!mounted) {
      console.log("[Fetch] Skipping fetch: component not mounted yet.")
      return
    }

    console.log(`[Fetch] Starting request to /api/traffic-signs for category: '${category}'`)

    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/traffic-signs")

      console.log(`[Fetch] Response status: ${res.status}`)

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
      }

      const data = await res.json()
      console.log("[Fetch] Raw response data:", data)

      const trafficSigns = data?.trafficSigns

      if (!Array.isArray(trafficSigns)) {
        throw new Error("Invalid response format: 'trafficSigns' is not an array")
      }

      console.log(`[Fetch] Received ${trafficSigns.length} total traffic signs.`)

      const filtered = category === "alle"
        ? trafficSigns
        : trafficSigns.filter((sign: TrafficSign) =>
            Array.isArray(sign.category) &&
            sign.category.map((c) => c.toLowerCase()).includes(category.toLowerCase())
          )


      console.log(`[Filter] After filtering for category '${category}': ${filtered.length} signs.`)

      setSigns(filtered)
      setFilteredSigns(filtered)
      console.log("[State] Signs and filteredSigns updated successfully.")
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Onbekende fout tijdens het ophalen van verkeersborden."
      console.error("[Error] Verkeersborden ophalen mislukt:", errorMsg)

      setError("Er is een fout opgetreden bij het laden van de verkeersborden.")
      setSigns([])
      setFilteredSigns([])
    } finally {
      setLoading(false)
      console.log("[Fetch] Done.")
    }
  }


  useEffect(() => {
    if (category && mounted) {
      fetchSigns()
    }
  }, [category, mounted])

  useEffect(() => {
    let filtered = signs

    if (searchTerm) {
      filtered = filtered.filter((sign) =>
        sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sign.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((sign) => sign.type === selectedType)
    }

    setFilteredSigns(filtered)
  }, [signs, searchTerm, selectedType])

  const typeCounts = ["all", ...signTypes].map((type) => ({
    id: type,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    count: type === "all" ? signs.length : signs.filter((s) => s.type === type).length,
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
      <div className="container mx-auto px-4 pt-8">

        {/* Page Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Icon + Title */}
            <div className="flex items-center space-x-6">
              <div className={`${currentCategory.bgColor} p-4 rounded-full`}>
                <IconComponent className={`h-8 w-8 ${currentCategory.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h1>
                <p className="text-gray-600 text-sm">{currentCategory.description}</p>
              </div>
            </div>

            {/* Right: Back Link */}
            <Link
              href="/verkeersborden"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar overzicht
            </Link>
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
          {typeCounts.map((type) => (
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

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900">Er is een probleem opgetreden</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                <Button
                  onClick={fetchSigns}
                  variant="outline"
                  size="sm"
                  className="ml-auto border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Opnieuw proberen
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {signs.length === 0
                      ? "Er zijn momenteel geen verkeersborden beschikbaar."
                      : "Geen verkeersborden gevonden voor je zoekopdracht."}
                  </p>
                  {signs.length > 0 && (
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedType("all")
                      }}
                      className="border border-blue-700/80"
                    >
                      Filters Wissen
                    </Button>
                  )}
                  {signs.length === 0 && (
                    <Button onClick={fetchSigns} className="border border-blue-700/80">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Opnieuw laden
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSigns.map((sign) => (
                  <Card
                    key={sign._id}
                    className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      {/* Sign Image */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-center group-hover:bg-gray-100 transition-colors">
                        <img
                          src={imageErrors.has(sign._id) ? createPlaceholderSVG(160, 160) : sign.image}
                          alt={sign.name}
                          className="w-60 h-60 mx-auto object-contain"
                          onError={(e) => handleImageError(sign._id, e)}
                          loading="lazy"
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
      <DonationPrompt />
      <Footer />
    </div>
  )
}
