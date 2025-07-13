"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeftCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl text-center">

        <div className="flex flex-col items-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Oeps... Verkeerde afslag!</h1>
          <p className="text-gray-600 mb-6">
            Deze pagina bestaat niet (meer), of je hebt misschien een <span className="italic">verkeersbord</span> gemist.
          </p>

          <Button asChild>
            <Link href="/">
              <ArrowLeftCircle className="w-5 h-5 mr-2" />
              Terug naar de hoofdpagina
            </Link>
          </Button>

          <p className="text-xs text-gray-400 mt-4">
            Foutcode: <span className="font-mono">HTTP 404 - Bord Niet Gevonden</span>
          </p>
        </div>
      </div>
    </div>
  )
}
