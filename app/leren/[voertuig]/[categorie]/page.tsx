"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import LessonContent, { InhoudBlok } from "@/components/LessonContent"
import { markeerCategorieGelezen } from "@/lib/session"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface LesData {
  titel: string
  inhoud: InhoudBlok[]
}

export default function LesPagina() {
  const { voertuig, categorie } = useParams()
  const [les, setLes] = useState<LesData | null>(null)

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
    <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb className="mb-4">
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
                    <BreadcrumbLink href={`/leren/${voertuig}`}>{voertuig}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">{categorie}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{les.titel}</h1>
        <LessonContent inhoud={les.inhoud} />
    </div>
  )
}