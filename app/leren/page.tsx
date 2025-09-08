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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Leren</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Voor welk voertuigtype wil je leren?
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Kies een van de onderstaande voertuigen:
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {voertuigen.map(({ name, displayName }) => {
            const Icon = iconMap[name] ?? Car
            const colorClass =
              name === "auto"
                ? "text-blue-600"
                : name === "motor"
                ? "text-red-600"
                : "text-green-600"

            const isDisabled = name === "motor" || name === "scooter"

            const cardContent = (
              <div
                className={`flex flex-col items-center text-center ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="p-4 rounded-full bg-gray-100 mb-4">
                  <Icon className={`h-8 w-8 ${colorClass}`} />
                </div>
                <h2
                  className={`text-xl font-semibold text-gray-800 ${
                    isDisabled ? "" : "group-hover:underline"
                  }`}
                >
                  {displayName}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Theorie leren voor {displayName.toLowerCase()}
                </p>
              </div>
            )

            return isDisabled ? (
              <div
                key={name}
                className="border border-gray-200 rounded-xl p-6 bg-gray-50"
              >
                {cardContent}
              </div>
            ) : (
              <Link
                key={name}
                href={`/leren/${name}`}
                className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
