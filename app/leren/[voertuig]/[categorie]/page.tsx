"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import LessonContent, { InhoudBlok } from "@/components/LessonContent"
import { markeerCategorieGelezen } from "@/lib/session"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import clsx from "clsx"

interface LesData {
  titel: string
  inhoud: InhoudBlok[]
  volgorde?: number
}

interface Subles {
  titel: string
  volgorde: number
}

interface CategorieGroep {
  categorie: string
  titel: string
  sublessen: Subles[]
}

export default function LesPagina() {
  const { voertuig, categorie } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [groepen, setGroepen] = useState<CategorieGroep[]>([])
  const [actieveGroep, setActieveGroep] = useState<string | null>(categorie as string)
  const [actieveLes, setActieveLes] = useState<LesData | null>(null)

  const lesIndexParam = searchParams.get("les")
  const lesVolgorde = parseInt(lesIndexParam || "1", 10)

  // ✅ DEBUG helper
  function log(...args: any[]) {
    console.debug("[LesPagina]", ...args)
  }

  useEffect(() => {
    async function fetchCategorieenEnSublessen() {
      log("Fetching categorieën en sublessen voor voertuig:", voertuig)
      const res = await fetch(`/api/leren?voertuig=${voertuig}`)
      if (!res.ok) {
        console.error("FOUT: Kon categorieën niet ophalen:", res.status)
        return
      }

      const categorieen = await res.json()
      const gegroepeerd: CategorieGroep[] = []

      await Promise.all(
        categorieen.map(async (cat: any) => {
          const slug = cat.slug
          const lesRes = await fetch(`/api/leren?voertuig=${voertuig}&categorie=${slug}`)
          if (!lesRes.ok) {
            console.warn(`Lesgroep "${slug}" kon niet geladen worden.`)
            return
          }

          const lessen = await lesRes.json()

          gegroepeerd.push({
            categorie: slug,
            titel: cat.title,
            sublessen: lessen.map((l: any) => ({
              titel: l.title,
              volgorde: typeof l.order === "number" ? l.order : parseInt(l.order ?? "1", 10),
            })),
          })

          log(`✅ Categorie '${slug}' → ${lessen.length} lessen geladen`)
        })
      )

      gegroepeerd.forEach((groep) =>
        groep.sublessen.sort((a, b) => a.volgorde - b.volgorde)
      )

      setGroepen(gegroepeerd)
    }

    fetchCategorieenEnSublessen()
  }, [voertuig])

  useEffect(() => {
    async function fetchLes() {
      if (!categorie || !lesVolgorde) return

      log(`Fetching les voor voertuig=${voertuig}, categorie=${categorie}, volgorde=${lesVolgorde}`)

      const res = await fetch(`/api/leren?voertuig=${voertuig}&categorie=${categorie}`)
      if (!res.ok) {
        console.error("FOUT: Kan lessen niet ophalen voor categorie:", categorie)
        return
      }

      const lessen = await res.json()

      log("Gevonden lessen in categorie:", lessen.length)
      log("Alle lessen:", lessen.map((l: any) => ({ title: l.title, order: l.order })))

      const juisteLes = lessen.find((l: any) => {
        const order = typeof l.order === "number" ? l.order : parseInt(l.order ?? "1", 10)
        return order === lesVolgorde
      })

      if (juisteLes) {
        log("✅ Juiste les gevonden:", juisteLes.title)
        setActieveLes({
          titel: juisteLes.title,
          inhoud: Array.isArray(juisteLes.content)
            ? juisteLes.content
            : [{ type: "paragraaf", tekst: juisteLes.content }],
          volgorde: juisteLes.order,
        })

        markeerCategorieGelezen(voertuig as string, categorie as string)
      } else {
        log("❌ Geen overeenkomende les gevonden voor volgorde =", lesVolgorde)
      }
    }

    fetchLes()
  }, [voertuig, categorie, lesVolgorde])

  if (!actieveLes) return <p className="text-center py-8">Laden...</p>

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
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm text-left",
                    actief ? "bg-gray-100" : "hover:bg-gray-50"
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
                    {groep.sublessen.map((les, index) => {
                      const isActiefLes =
                        groep.categorie === categorie &&
                        les.volgorde === lesVolgorde
                      return (
                        <li key={index}>
                          <Link
                            href={`/leren/${voertuig}/${groep.categorie}?les=${les.volgorde}`}
                            className={clsx(
                              "block px-2 py-1 rounded-md transition",
                              isActiefLes
                                ? "text-gray-900 font-medium border-l-4 border-blue-500 bg-gray-100"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            {index + 1}. {les.titel}
                          </Link>
                        </li>
                      )
                    })}
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
                {actieveLes.titel}
              </h1>

              {actieveLes.inhoud[0]?.type === "afbeelding" && (
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src={actieveLes.inhoud[0].bron}
                    alt={actieveLes.inhoud[0].bijschrift || "Inleidende afbeelding"}
                    className="w-full object-cover max-h-[360px] mx-auto rounded-xl"
                  />
                </div>
              )}

              <div className="prose max-w-none">
                <LessonContent inhoud={actieveLes.inhoud} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
