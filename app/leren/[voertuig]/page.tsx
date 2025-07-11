"use client"

import { useEffect, useState } from "react"
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

interface CategorieInfo {
  categorie: string
  titel: string
}

export default function CategorieOverzichtPage() {
  const { voertuig } = useParams()
  const [categorieen, setCategorieen] = useState<CategorieInfo[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/leerstof?voertuig=${voertuig}`)
      if (res.ok) {
        const data = await res.json()
        const uniek = data.map((item: any) => ({ categorie: item.categorie, titel: item.titel }))
        setCategorieen(uniek)
      }
    }
    fetchData()
  }, [voertuig])

  const categorieNamen = categorieen.map((c) => c.categorie)

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
                    <BreadcrumbPage className="capitalize">{voertuig}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 capitalize">{voertuig} - Categorieën</h1>
        <ProgressTracker voertuig={voertuig as string} categorieen={categorieNamen} />
        <ul className="space-y-4">
            {categorieen.map((cat) => (
            <li key={cat.categorie} className="border p-4 rounded-md hover:shadow">
                <Link href={`/leren/${voertuig}/${cat.categorie}`} className="text-blue-600 hover:underline font-medium">
                {cat.titel}
                </Link>
            </li>
            ))}
        </ul>
    </div>
  )
}