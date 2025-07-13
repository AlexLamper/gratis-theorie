"use client"

import { JSX, useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import ProgressTracker from "@/components/ProgressTracker"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Bike,
  BikeIcon as Scooter,
  ParkingCircle,
  TrafficCone,
  User,
  BookOpen,
  Car,
  Leaf,
  Shield,
  HelpCircle,
  Users,
  Route,
  TrafficConeIcon,
} from "lucide-react"
import { getVoortgang } from "@/lib/session"
import { Input } from "@/components/ui/input"

const categorieIconen: Record<string, JSX.Element> = {
  "milieu": <Leaf className="h-6 w-6 text-green-600" />,
  "verkeersborden": <ParkingCircle className="h-6 w-6 text-red-600" />,
  "verkeersregels": <Route className="h-6 w-6 text-blue-500" />,
  "veiligheid": <Shield className="h-6 w-6 text-yellow-500" />,
  "voorrang": <User className="h-6 w-6 text-pink-600" />,
  "weggebruikers": <Users className="h-6 w-6 text-indigo-600" />,
  "voertuig": <Car className="h-6 w-6 text-orange-600" />,
  "verkeerswetten": <BookOpen className="h-6 w-6 text-gray-600" />,
  "verkeersregelaar": <TrafficCone className="h-6 w-6 text-red-500" />,
  "kruispunten": <TrafficConeIcon className="h-6 w-6 text-teal-600" />,
  "default": <HelpCircle className="h-6 w-6 text-gray-500" />,
}

interface CategorieInfo {
  slug: string
  title: string
  order: number
}

export default function CategorieOverzichtPage() {
  const { voertuig } = useParams()
  const [categorieen, setCategorieen] = useState<CategorieInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [zoek, setZoek] = useState("")

  const voertuigInfo = {
    auto: {
      label: "Auto",
      icon: Car,
      color: "text-blue-600",
      beschrijving: "Theorie leren voor automobilisten",
    },
    motor: {
      label: "Motor",
      icon: Bike,
      color: "text-red-600",
      beschrijving: "Lessen voor motorrijders",
    },
    scooter: {
      label: "Scooter",
      icon: Scooter,
      color: "text-green-600",
      beschrijving: "Voor bromfiets en scooter",
    },
  } as const

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/leren?voertuig=${voertuig}`)
        if (res.ok) {
          const data = await res.json()
          const categorieen = data.map((cat: any) => ({
            slug: cat.slug,
            title: cat.title,
            order: cat.order || 0,
          }))
          setCategorieen(categorieen)
        } else {
          console.error("Fout bij laden van categorieën", await res.text())
        }
      } catch (err) {
        console.error("Fout tijdens ophalen:", err)
      } finally {
        setLoading(false)
      }
    }

    if (voertuig) {
      fetchData()
    }
  }, [voertuig])

  const categorieSlugs = categorieen.map((c) => c.slug)
  const voortgang = getVoortgang()
  const gelezen = voortgang?.gelezen || {}

  const filtered = useMemo(
    () =>
      categorieen.filter((c) =>
        c.title.toLowerCase().includes(zoek.toLowerCase())
      ),
    [categorieen, zoek]
  )

  const info = voertuigInfo[voertuig as keyof typeof voertuigInfo]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/leren">Leren</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {info.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-6">
          {info && (
            <info.icon className={`h-12 w-12 mx-auto mb-4 ${info.color}`} />
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
            {info.label} Theorie
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{info.beschrijving}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <ProgressTracker voertuig={voertuig as string} categorieen={categorieSlugs} />

            <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
              <Input
                placeholder="Zoek een categorie..."
                value={zoek}
                onChange={(e) => setZoek(e.target.value)}
                className="max-w-xs"
              />
              <span className="text-sm text-gray-600">
                {filtered.length} van {categorieen.length} categorieën
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {info.label} theorie hoofdstukken
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Alles wat je moet weten voor je{" "}
                {info.label.toLowerCase()} theorie examen opgesplitst in
                hoofdstukken en gratis te lezen
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/leren/${voertuig}/${cat.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">
                        {categorieIconen[cat.slug] || categorieIconen["default"]}
                      </div>
                      <h3 className="text-sm font-medium text-gray-800 leading-snug">
                        {cat.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
