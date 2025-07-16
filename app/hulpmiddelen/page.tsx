// app/hulpmiddelen/page.tsx
import Image from "next/image"
import { Metadata } from "next"
import { scrapeBolProduct } from "@/lib/scrapeBol"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Star } from "lucide-react"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Hulpmiddelen – Gratis Theorie",
  description: "Maak gebruik van bol affiliate producten (zonder API)",
}

const SITE_ID = process.env.NEXT_PUBLIC_BOL_SITE_ID!

interface ProductConfig { url: string; subid: string }

const productConfigs: ProductConfig[] = [
  {
    url: "https://www.bol.com/nl/nl/p/auto-theorieboek-rijbewijs-b-auto-vekabest/9300000143665827/",
    subid: "auto_vekabest_2025",
  },
  {
    url: "https://www.bol.com/nl/nl/p/scooter-theorieboek-en/9300000129130487/",
    subid: "scooter_vekabest_2025",
  },
  {
    url: "https://www.bol.com/nl/nl/p/compact-auto-theorieboek-rijbewijs-b-vekabest/9300000148098642/",
    subid: "auto_compact_2025",
  },
  {
    url: "https://www.bol.com/nl/nl/p/auto-theorieboek-en-theorieboek-rijbewijs-b-examens-cbr-en/9300000173965977/",
    subid: "auto_fullpakket_2025",
  },
  {
    url: "https://www.bol.com/nl/nl/p/scooter-theorieboek-compact-2024-2025-rijbewijs-am-brommer-en-bromfiets-vekabest-verkeersleermiddelen/9300000170244672/",
    subid: "scooter_compact_2025",
  },
]

export default async function HulpmiddelenPage() {
  console.log("🔧 Start loading hulpmiddelen page")
  const fetched = await Promise.all(
    productConfigs.map(async (p) => {
      const md = await scrapeBolProduct(p.url)
      console.log(`Scraped ${p.subid}:`, md.title, md.imageUrl ? "✅ img" : "❌ no img")
      return { ...md, url: p.url, subid: p.subid }
    })
  )

  return (
    <div className="min-h-screen container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Hulpmiddelen</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fetched.map((p) => {
          const params = new URLSearchParams({
            t: "url",
            s: SITE_ID,
            url: p.url,
            f: "txl",
            subid: p.subid,
            name: p.title,
          })
          const trackingUrl = `https://partner.bol.com/click/click?&${params.toString()}`

          return (
            <Card key={p.subid} className="border shadow-sm hover:shadow-md">
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-t"
                />
              )}
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>
                  {p.description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                  >
                    <BookOpen className="inline-block mr-2 align-middle" />
                    Bekijk op bol.com
                  </a>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <p className="mt-12 text-gray-600">
        We ontvangen een kleine commissie als je via onze link koopt. Jij betaalt
        hetzelfde – en ons zou je er enorm mee helpen!{" "}
        <Star className="inline-block align-text-bottom text-yellow-500" />
      </p>
      <Footer />
    </div>
  )
}
