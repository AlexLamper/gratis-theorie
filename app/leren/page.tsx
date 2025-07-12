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
  icon?: string // emoji of pad
}

export default function LerenStartPage() {
  const [voertuigen, setVoertuigen] = useState<Vehicle[]>([])

  useEffect(() => {
    async function fetchVoertuigen() {
      try {
        const res = await fetch("/api/voertuigen")
        const data = await res.json()
        setVoertuigen(data)
      } catch (error) {
        console.error("Fout bij ophalen voertuigen:", error)
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

      <div className="grid md:grid-cols-3 gap-6">
        {voertuigen.map(({ name, displayName }) => {
          const Icon = iconMap[name] ?? Car // fallback voor onbekend voertuigtype
          const colorClass =
            name === "auto"
              ? "text-blue-600"
              : name === "motor"
              ? "text-red-600"
              : "text-green-600"

          return (
            <Link
              key={name}
              href={`/leren/${name}`}
              className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full bg-gray-100 mb-4`}>
                  <Icon className={`h-8 w-8 ${colorClass}`} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:underline">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Theorie leren voor {displayName.toLowerCase()}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
