"use client"

import { BookOpen, ArrowLeft, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = pathname === "/"
  const showBackButton = !isHomePage

  const getPageTitle = () => {
    if (pathname.startsWith("/practice")) return "Oefenen"
    if (pathname.startsWith("/exams")) return "Examens"
    if (pathname.startsWith("/verkeersborden")) {
      const category = pathname.split("/")[2]
      const categoryNames = {
        auto: "Auto Verkeersborden",
        bromfiets: "Bromfiets Verkeersborden",
        motor: "Motor Verkeersborden",
      }
      return categoryNames[category as keyof typeof categoryNames] || "Verkeersborden"
    }
    if (pathname.startsWith("/categories")) return "Categorieën"
    return null
  }


  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/leren", label: "Leren" },
    { href: "/exams", label: "Proefexamens" },
    { href: "/verkeersborden", label: "Verkeersborden" },
    { href: "/categories", label: "Categorieën" },
    // { href: "/hulpmiddelen", label: "Hulpmiddelen" },
  ]

  return (
    <header className="border-b-gray-700/30 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Page title */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-800">Gratis Theorie</h1>
            </Link>

            {/* Page title for non-home pages */}
            {getPageTitle() && (
              <>
                <div className="hidden sm:block w-px h-6 bg-gray-300" />
                <h2 className="hidden sm:block text-xl font-semibold text-gray-800">
                  {getPageTitle()}
                </h2>
              </>
            )}
          </div>

          {/* Right side - Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-3 pt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
