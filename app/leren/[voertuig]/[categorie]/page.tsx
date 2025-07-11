"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import LessonContent, { InhoudBlok } from "@/components/LessonContent"
import { markeerCategorieGelezen } from "@/lib/session"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import clsx from "clsx"

interface LesData {
  titel: string
  inhoud: InhoudBlok[]
}

interface CategorieGroep {
  categorie: string
  titel: string
  sublessen: { titel: string; volgorde: number }[]
}

export default function LesPagina() {
  const { voertuig, categorie } = useParams()
  const router = useRouter()

  const [les, setLes] = useState<LesData | null>(null)
  const [groepen, setGroepen] = useState<CategorieGroep[]>([])
  const [actieveGroep, setActieveGroep] = useState<string | null>(categorie as string)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/leerstof?voertuig=${voertuig}`)
      if (res.ok) {
        const data = await res.json()
        const gegroepeerd: CategorieGroep[] = []

        data.forEach((les: any) => {
        const bestaandeGroep = gegroepeerd.find((g) => g.categorie === les.categorie)
        const subles = { titel: les.titel, volgorde: les.volgorde ?? 0 }

        if (bestaandeGroep) {
            bestaandeGroep.sublessen.push(subles)
        } else {
            gegroepeerd.push({
                categorie: les.categorie,
                titel: les.titel, // je mag dit aanpassen als je een andere categorietitel wil
                sublessen: [subles],
            })
        }
        })

        // sorteer sublessen op volgorde
        gegroepeerd.forEach((groep) => {
            groep.sublessen.sort((a, b) => a.volgorde - b.volgorde)
        })

        setGroepen(gegroepeerd)

      }
    }
    fetchData()
  }, [voertuig])

  useEffect(() => {
    async function fetchLes() {
      const res = await fetch(`/api/leerstof?voertuig=${voertuig}&categorie=${categorie}`)
      if (res.ok) {
        const data = await res.json()
        setLes(data)
        markeerCategorieGelezen(voertuig as string, categorie as string)
      }
    }
    fetchLes()
  }, [voertuig, categorie])

  if (!les) return <p className="text-center py-8">Laden...</p>

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Sidebar */}
        <aside className="w-[300px] bg-white rounded-2xl border border-gray-200 p-4">
          {groepen.map((groep) => {
            const actief = groep.categorie === actieveGroep
            return (
              <div key={groep.categorie} className="mb-4">
                <button
                  onClick={() =>
                    setActieveGroep(actief ? null : groep.categorie)
                  }
                  className={clsx(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium",
                    actief ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"
                  )}
                >
                  {groep.titel}
                  {actief ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {actief && (
                  <ul className="pl-3 mt-2 text-sm space-y-1">
                    {groep.sublessen.map((les, index) => (
                      <li key={index}>
                        <Link
                          href={`/leren/${voertuig}/${groep.categorie}?les=${index + 1}`}
                          className={clsx(
                            "block px-2 py-1 rounded-md",
                            groep.categorie === categorie
                              ? "bg-blue-100 text-blue-900 font-medium"
                              : "hover:bg-gray-100"
                          )}
                        >
                          {index + 1}. {les.titel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </aside>

        {/* Lesinhoud */}
        <main className="flex-1">
          <Card className="rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {les.titel}
              </h1>

              {les.inhoud[0]?.type === "afbeelding" && (
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src={les.inhoud[0].bron}
                    alt={les.inhoud[0].bijschrift || "Inleidende afbeelding"}
                    className="w-full object-cover max-h-[360px] mx-auto rounded-xl"
                  />
                </div>
              )}

              <div className="prose max-w-none">
                <LessonContent inhoud={les.inhoud} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
