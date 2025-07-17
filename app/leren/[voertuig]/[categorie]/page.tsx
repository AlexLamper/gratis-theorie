"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import LessonContent, { InhoudBlok } from "@/components/LessonContent"
import { markeerCategorieGelezen } from "@/lib/session"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import clsx from "clsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import parse from "html-react-parser"
import Footer from "@/components/footer"
import DonationPrompt from "@/components/DonationPrompt"

interface LesData {
  titel: string
  inhoud: InhoudBlok[] | string
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

interface VehicleData {
  name: string
  displayName: string
  icon?: string
}

export default function LesPagina() {
  const { voertuig, categorie } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [groepen, setGroepen] = useState<CategorieGroep[]>([])
  const [actieveGroep, setActieveGroep] = useState<string | null>(categorie as string)
  const [actieveLes, setActieveLes] = useState<LesData | null>(null)
  const [voertuigData, setVoertuigData] = useState<VehicleData | null>(null)
  const [loading, setLoading] = useState(true)

  const lesIndexParam = searchParams.get("les")
  const lesVolgorde = parseInt(lesIndexParam || "1", 10)

  useEffect(() => {
    async function fetchAllData() {
      try {
        const voertuigRes = await fetch("/api/voertuigen")
        const voertuigen: VehicleData[] = await voertuigRes.json()
        const voertuigInfo = voertuigen.find((v) => v.name === voertuig)
        setVoertuigData(voertuigInfo || null)

        const catRes = await fetch(`/api/leren?voertuig=${voertuig}`)
        const categorieen = await catRes.json()
        const groepen: CategorieGroep[] = []

        for (const cat of categorieen) {
          const slug = cat.slug
          const lesRes = await fetch(`/api/leren?voertuig=${voertuig}&categorie=${slug}`)
          if (!lesRes.ok) continue

          const lessen = await lesRes.json()

          groepen.push({
            categorie: slug,
            titel: cat.title,
            sublessen: lessen.map((l: any) => ({
              titel: l.title,
              volgorde: typeof l.order === "number" ? l.order : parseInt(l.order ?? "1", 10),
            })),
          })
        }

        groepen.forEach((groep) => groep.sublessen.sort((a, b) => a.volgorde - b.volgorde))
        setGroepen(groepen)
      } catch (err) {
        console.error("Fout bij laden van data:", err)
      }
    }

    if (voertuig) {
      fetchAllData()
    }
  }, [voertuig])

  useEffect(() => {
    async function fetchLes() {
      if (!categorie || !lesVolgorde) return

      try {
        const res = await fetch(`/api/leren?voertuig=${voertuig}&categorie=${categorie}`)
        if (!res.ok) return

        const lessen = await res.json()
        const juisteLes = lessen.find((l: any) => {
          const order = typeof l.order === "number" ? l.order : parseInt(l.order ?? "1", 10)
          return order === lesVolgorde
        })

        if (juisteLes) {
          setActieveLes({
            titel: juisteLes.title,
            inhoud: Array.isArray(juisteLes.content) ? juisteLes.content : juisteLes.content,
            volgorde: juisteLes.order,
          })
          markeerCategorieGelezen(voertuig as string, categorie as string)
        }
      } catch (err) {
        console.error("Fout bij laden van les:", err)
      } finally {
        setLoading(false)
      }
    }

    if (voertuig && categorie && lesVolgorde) {
      fetchLes()
    }
  }, [voertuig, categorie, lesVolgorde])

  if (loading || !actieveLes) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="max-w-6xl mx-auto">
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
                <BreadcrumbLink href={`/leren/${voertuig}`}>{voertuigData?.displayName || voertuig}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize text-blue-600 font-semibold">
                  {groepen.find((g) => g.categorie === categorie)?.titel || categorie}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-6">
            <aside className="w-[300px] bg-white rounded-2xl border border-gray-200 p-4">
              {groepen.sort((a, b) => a.titel.localeCompare(b.titel)).map((groep) => {
                const isActiveGroup = groep.categorie === categorie
                return (
                  <div key={groep.categorie} className="mb-4">
                    <Link
                      href={`/leren/${voertuig}/${groep.categorie}?les=1`}
                      className={clsx(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm text-left cursor-pointer",
                        isActiveGroup ? "bg-gray-100" : "hover:bg-gray-50"
                      )}
                      onClick={() => setActieveGroep(groep.categorie)}
                    >
                      <span>{groep.titel}</span>
                      {isActiveGroup ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Link>
                    {isActiveGroup && (
                      <ul className="pl-3 mt-2 text-sm space-y-1 transition-all duration-300">
                        {groep.sublessen.map((les, index) => {
                          const isActiefLes = groep.categorie === categorie && les.volgorde === lesVolgorde
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

            <main className="flex-1 bg-white rounded-xl p-6 border border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{actieveLes.titel}</h1>

              {Array.isArray(actieveLes.inhoud) && actieveLes.inhoud[0]?.type === "afbeelding" && (
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src={actieveLes.inhoud[0].bron}
                    alt={actieveLes.inhoud[0].bijschrift || "Inleidende afbeelding"}
                    className="w-full object-cover max-h-[360px] mx-auto rounded-xl"
                  />
                </div>
              )}

              <div className="prose prose-blue prose-base max-w-none">
                <style jsx>{`
                  h3 {
                    font-weight: bold;
                  }
                `}</style>
                {Array.isArray(actieveLes.inhoud) ? (
                  <LessonContent inhoud={actieveLes.inhoud} />
                ) : (
                  <div className="space-y-6 leading-relaxed text-gray-800 text-base">
                    {parse(actieveLes.inhoud)}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        <DonationPrompt />
      </div>
      <Footer />
    </>
  )
}
