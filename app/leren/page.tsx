"use client"

import Link from "next/link"
import { Car, Bike, BikeIcon as Scooter } from "lucide-react"

const voertuigtypes = [
  {
    id: "auto",
    label: "Auto",
    icon: Car,
    color: "text-blue-600",
    beschrijving: "Theorie leren voor automobilisten",
  },
  {
    id: "motor",
    label: "Motor",
    icon: Bike,
    color: "text-red-600",
    beschrijving: "Lessen voor motorrijders",
  },
  {
    id: "scooter",
    label: "Scooter",
    icon: Scooter,
    color: "text-green-600",
    beschrijving: "Voor bromfiets en scooter",
  },
]

export default function LerenStartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Kies je Voertuigtype</h1>
      <p className="text-center text-gray-600 mb-10">Start met leren door je voertuigtype te kiezen:</p>

      <div className="grid md:grid-cols-3 gap-6">
        {voertuigtypes.map(({ id, label, icon: Icon, color, beschrijving }) => (
          <Link
            key={id}
            href={`/leren/${id}`}
            className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full bg-gray-100 mb-4`}>
                <Icon className={`h-8 w-8 ${color}`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:underline">{label}</h2>
              <p className="text-sm text-gray-600 mt-2">{beschrijving}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}