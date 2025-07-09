import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Car, Bike, BikeIcon as Motorcycle, Trophy, Users, Clock, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gratis Theorie</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">
                Oefenen
              </Link>
              <Link href="/exams" className="text-gray-600 hover:text-blue-600 transition-colors">
                Examens
              </Link>
              <Link href="/verkeersborden" className="text-gray-600 hover:text-blue-600 transition-colors">
                Verkeersborden
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                Categorieën
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            100% Gratis • Geen Registratie Vereist
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Slaag voor je <span className="text-blue-600">theorie-examen</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Het beste gratis platform om te oefenen voor je auto, scooter of motor theorie-examen. Geen kosten, geen
            registratie - gewoon beginnen met leren!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/practice">
                <BookOpen className="mr-2 h-5 w-5" />
                Start met Oefenen
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/exams">
                <Trophy className="mr-2 h-5 w-5" />
                Doe een Proefexamen
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Kies je Categorie</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/practice?category=auto">
                <CardHeader className="text-center">
                  <Car className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">Auto (B)</CardTitle>
                  <CardDescription>Theorie-examen voor personenauto's</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary">500+ Vragen</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/practice?category=scooter">
                <CardHeader className="text-center">
                  <Bike className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">Scooter (AM)</CardTitle>
                  <CardDescription>Theorie-examen voor bromfietsen</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary">300+ Vragen</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/practice?category=motor">
                <CardHeader className="text-center">
                  <Motorcycle className="h-12 w-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">Motor (A)</CardTitle>
                  <CardDescription>Theorie-examen voor motorfietsen</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary">400+ Vragen</Badge>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Verkeersborden Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Leer Alle Verkeersborden</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <Link href="/verkeersborden">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Nederlandse Verkeersborden</CardTitle>
                  <CardDescription className="text-lg">
                    Ontdek alle verkeersborden die je moet kennen voor je theorie-examen
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">300+</div>
                      <div className="text-sm text-gray-600">Verkeersborden</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">5</div>
                      <div className="text-sm text-gray-600">Categorieën</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-gray-600">Voertuigtypen</div>
                    </div>
                  </div>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Bekijk Alle Verkeersborden
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Waarom Gratis Theorie?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">100% Gratis</h4>
              <p className="text-gray-600">Geen verborgen kosten of abonnementen</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Geen Registratie</h4>
              <p className="text-gray-600">Direct beginnen zonder account</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Altijd Beschikbaar</h4>
              <p className="text-gray-600">24/7 toegang vanaf elk apparaat</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Actuele Vragen</h4>
              <p className="text-gray-600">Up-to-date examenvragen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Klaar om te Beginnen?</h3>
          <p className="text-xl mb-8 opacity-90">Duizenden mensen gingen je al voor. Start vandaag nog met oefenen!</p>
          <Button asChild size="lg" variant="secondary" className="border-white border-1 hover:bg-[#1566fb]">
            <Link href="/practice">Begin Nu Gratis</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-lg font-semibold">Gratis Theorie</span>
              </div>
              <p className="text-gray-400">Het beste gratis platform voor theorie-examens in Nederland.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorieën</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/practice?category=auto" className="hover:text-white">
                    Auto (B)
                  </Link>
                </li>
                <li>
                  <Link href="/practice?category=scooter" className="hover:text-white">
                    Scooter (AM)
                  </Link>
                </li>
                <li>
                  <Link href="/practice?category=motor" className="hover:text-white">
                    Motor (A)
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/practice" className="hover:text-white">
                    Oefenen
                  </Link>
                </li>
                <li>
                  <Link href="/exams" className="hover:text-white">
                    Examens
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Alle Categorieën
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Over Ons</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Voorwaarden
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Gratis Theorie. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
