"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Car, Bike, BikeIcon as Scooter } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const iconMap: Record<string, any> = {
  auto: Car,
  motor: Bike,
  scooter: Scooter,
}

type Vehicle = {
  name: string
  displayName: string
  icon?: string
}

export default function LerenStartPage() {
  const [voertuigen, setVoertuigen] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVoertuigen() {
      try {
        const res = await fetch("/api/voertuigen")
        const data = await res.json()
        setVoertuigen(data)
      } catch (error) {
        console.error("Fout bij ophalen voertuigen:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVoertuigen()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-slate-500 hover:text-blue-600"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-900 font-medium">
                Leren
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Kies je voertuig
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Selecteer het voertuig waarvoor je theorie wilt oefenen. We hebben
            complete cursussen voor auto, motor en scooter.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {voertuigen.map(({ name, displayName }) => {
              const Icon = iconMap[name] ?? Car
              const isDisabled = name === "motor" || name === "scooter"

              return (
                <Link
                  key={name}
                  href={isDisabled ? "#" : `/leren/${name}`}
                  className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 transition-all duration-300 ${
                    isDisabled
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 cursor-pointer"
                  }`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  {isDisabled && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Binnenkort
                      </span>
                    </div>
                  )}

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                      isDisabled
                        ? "bg-slate-100"
                        : "bg-blue-50 group-hover:bg-blue-100"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        isDisabled ? "text-slate-400" : "text-blue-600"
                      }`}
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {displayName}
                  </h2>
                  <p className="text-slate-600 mb-6">
                    {name === "auto" && "Volledige theoriecursus voor rijbewijs B."}
                    {name === "motor" && "Theorie voor motorrijbewijs A."}
                    {name === "scooter" && "Theorie voor bromfietsrijbewijs AM."}
                  </p>

                  <div
                    className={`flex items-center font-medium ${
                      isDisabled
                        ? "text-slate-400"
                        : "text-blue-600 group-hover:translate-x-1 transition-transform"
                    }`}
                  >
                    {isDisabled ? "Niet beschikbaar" : "Start cursus"}
                    {!isDisabled && (
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
