import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Gratis Theorie - Gratis Nederlandse Theorie-examens Oefenen",
    template: "%s | Gratis Theorie",
  },
  description:
    "Het beste gratis platform om te oefenen voor je Nederlandse theorie-examen. Auto, scooter en motor theorie-examens. Geen registratie vereist, 100% gratis, actuele vragen en proefexamens.",
  keywords: [
    "theorie examen",
    "gratis theorie",
    "auto theorie",
    "scooter theorie",
    "motor theorie",
    "CBR theorie",
    "rijbewijs theorie",
    "theorie oefenen",
    "proefexamen",
    "verkeersborden",
    "Nederlandse theorie",
    "theorie vragen",
    "rijschool",
    "theorie toppers alternatief",
  ],
  authors: [{ name: "Gratis Theorie Team" }],
  creator: "Gratis Theorie",
  publisher: "Gratis Theorie",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://gratis-theorie.com",
    siteName: "Gratis Theorie",
    title: "Gratis Theorie - Gratis Nederlandse Theorie-examens Oefenen",
    description:
      "Het beste gratis platform om te oefenen voor je Nederlandse theorie-examen. Auto, scooter en motor theorie-examens. Geen registratie vereist, 100% gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gratis Theorie - Gratis Nederlandse Theorie-examens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis Theorie - Gratis Nederlandse Theorie-examens Oefenen",
    description:
      "Het beste gratis platform om te oefenen voor je Nederlandse theorie-examen. 100% gratis, geen registratie vereist.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gratis-theorie.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="canonical" href="https://gratis-theorie.com" />
        <meta name="geo.region" content="NL" />
        <meta name="geo.country" content="Netherlands" />
        <meta name="language" content="Dutch" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Gratis Theorie",
              url: "https://gratis-theorie.com",
              description:
                "Het beste gratis platform om te oefenen voor je Nederlandse theorie-examen. Auto, scooter en motor theorie-examens.",
              inLanguage: "nl-NL",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gratis-theorie.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
