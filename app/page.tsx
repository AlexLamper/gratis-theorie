import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Car,
  Bike,
  BikeIcon as Motorcycle,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  Shield,
  Star,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gratis Theorie - Het Beste Gratis Platform voor Nederlandse Theorie-examens",
  description:
    "Oefen gratis voor je Nederlandse theorie-examen. Auto, scooter en motor theorie met actuele vragen, proefexamens en verkeersborden. Geen registratie, 100% gratis.",
  openGraph: {
    title: "Gratis Theorie - Het Beste Gratis Platform voor Nederlandse Theorie-examens",
    description:
      "Oefen gratis voor je Nederlandse theorie-examen. Auto, scooter en motor theorie met actuele vragen, proefexamens en verkeersborden.",
    url: "https://gratis-theorie.com",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm px-3 sm:px-4 py-2 max-w-full text-center break-words">
            ✨ 100% Gratis • Geen Registratie Vereist • Altijd Up-to-date
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Slaag voor je{" "}
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              theorie-examen
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Het beste gratis platform om te oefenen voor je auto, scooter of motor theorie-examen. Geen kosten, geen
            registratie - gewoon beginnen met leren!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto border border-blue-700/80"
            >
              <Link href="/practice">
                <BookOpen className="mr-2 h-6 w-6" />
                Start met Oefenen
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2 bg-transparent border-gray-300/80"
            >
              <Link href="/exams">
                <Trophy className="mr-2 h-6 w-6" />
                Doe een Proefexamen
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">Oefenvragen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">300+</div>
              <div className="text-sm text-gray-600">Verkeersborden</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Categorieën</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0€</div>
              <div className="text-sm text-gray-600">Kosten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kies je Categorie</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elke categorie heeft zijn eigen theorie-examen met specifieke vragen en regels
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="rounded-xl overflow-hidden border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1 p-0">
              <Link href="/practice?category=auto" className="block h-full">
                <div className="bg-gradient-to-b from-blue-50 to-blue-100">
                  <CardHeader className="text-center pb-4 pt-0 m-0">
                    <div className="flex flex-col items-center justify-center min-h-0 mt-6">
                      <Car className="h-16 w-16 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-2xl text-gray-900">Auto (B)</CardTitle>
                      <CardDescription className="text-gray-600">Theorie-examen voor personenauto's</CardDescription>
                    </div>
                  </CardHeader>
                </div>
                <CardContent className="text-center pt-6">
                  <div className="space-y-3 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      500+ Vragen
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <div>• Vanaf 17 jaar</div>
                      <div>• Max 3.500 kg</div>
                      <div>• 8 passagiers</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 text-white group-hover:bg-blue-700 border border-blue-700/80 mb-6">
                    Begin Oefenen
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="rounded-xl overflow-hidden border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1 p-0">
              <Link href="/practice?category=scooter" className="block h-full">
                <div className="bg-gradient-to-b from-green-50 to-green-100">
                  <CardHeader className="text-center pb-4 pt-0 m-0">
                    <div className="flex flex-col items-center justify-center min-h-0 mt-6">
                      <Bike className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-2xl text-gray-900">Scooter (AM)</CardTitle>
                      <CardDescription className="text-gray-600">Theorie-examen voor bromfietsen</CardDescription>
                    </div>
                  </CardHeader>
                </div>
                <CardContent className="text-center pt-6">
                  <div className="space-y-3 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      300+ Vragen
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <div>• Vanaf 16 jaar</div>
                      <div>• Max 45 km/h</div>
                      <div>• Max 50cc</div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 border border-green-700/80 mb-6">
                    Begin Oefenen
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="rounded-xl overflow-hidden border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1 p-0">
              <Link href="/practice?category=motor" className="block h-full">
                <div className="bg-gradient-to-b from-red-50 to-red-100">
                  <CardHeader className="text-center pb-4 pt-0 m-0">
                    <div className="flex flex-col items-center justify-center min-h-0 mt-6">
                      <Motorcycle className="h-16 w-16 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-2xl text-gray-900">Motor (A)</CardTitle>
                      <CardDescription className="text-gray-600">Theorie-examen voor motorfietsen</CardDescription>
                    </div>
                  </CardHeader>
                </div>
                <CardContent className="text-center pt-6">
                  <div className="space-y-3 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      400+ Vragen
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <div>• Vanaf 18 jaar</div>
                      <div>• A1, A2, A</div>
                      <div>• Progressief</div>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 border border-red-700/80 mb-6">
                    Begin Oefenen
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leer Alle Verkeersborden</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beheers alle Nederlandse verkeersborden die essentieel zijn voor je theorie-examen
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">300+ Verkeersborden</h3>
                      <p className="text-gray-600">Alle officiële Nederlandse verkeersborden</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">5 Categorieën</h3>
                      <p className="text-gray-600">Georganiseerd per type en betekenis</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Interactief Leren</h3>
                      <p className="text-gray-600">Met uitleg en praktijkvoorbeelden</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border border-blue-700/80 text-white hover:text-white"
                  >
                    <Link href="/verkeersborden">
                      <Shield className="mr-2 h-5 w-5" />
                      Bekijk Alle Verkeersborden
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-500">Verkeersborden vormen 20-30% van je theorie-examen</p>
                </div>
              </div>

              {/* Right side - Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Sample traffic signs */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-base">
                        STOP
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Stopbord</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-2xl ">
                        P
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Parkeren</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs lg:text-base">
                        50
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Max 50</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-yellow-400 transform rotate-45 flex items-center justify-center text-xs lg:text-base">
                        <div className="transform -rotate-45 w-8 h-1 bg-white"></div>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Voorrang</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-white border-4 border-red-500 rounded-full flex items-center justify-center text-xs lg:text-base">
                        <div className="w-4 lg:w-8 h-1 bg-red-500"></div>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Verboden</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 lg:w-16 lg:h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-xs lg:text-base">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">Richting</p>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Badge className="bg-white text-blue-600 border border-blue-200">
                      En nog 294+ meer verkeersborden
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Waarom Gratis Theorie?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Het meest complete en gebruiksvriendelijke platform voor theorie-examens
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-gray-600/30 hover:border-green-200 hover:shadow-lg transition-all bg-white">
              <CardContent className="pt-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">100% Gratis</h3>
                <p className="text-gray-600">Geen verborgen kosten, abonnementen of premium features</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-600/30 hover:border-blue-200 hover:shadow-lg transition-all bg-white">
              <CardContent className="pt-8">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Geen Registratie</h3>
                <p className="text-gray-600">Direct beginnen zonder account aanmaken of persoonlijke gegevens</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-600/30 hover:border-purple-200 hover:shadow-lg transition-all bg-white">
              <CardContent className="pt-8">
                <Clock className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Altijd Beschikbaar</h3>
                <p className="text-gray-600">24/7 toegang vanaf elk apparaat, overal waar je bent</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-600/30 hover:border-yellow-200 hover:shadow-lg transition-all bg-white">
              <CardContent className="pt-8">
                <Star className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Actuele Vragen</h3>
                <p className="text-gray-600">Up-to-date examenvragen gebaseerd op de nieuwste CBR richtlijnen</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Klaar om te Beginnen?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto text-gray-600">
            Sluit je aan bij duizenden mensen die al succesvol hun theorie-examen hebben gehaald met ons platform!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto border border-blue-700/80"
            >
              <Link href="/practice">
                <Zap className="mr-2 h-5 w-5" />
                Begin Nu Gratis
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2 bg-white border-gray-300/80"
            >
              <Link href="/verkeersborden">
                <Shield className="mr-2 h-5 w-5" />
                Bekijk Verkeersborden
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
