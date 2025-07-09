import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Target, Heart, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Over Ons - Gratis Theorie",
  description:
    "Leer meer over Gratis Theorie en ons team. Ons doel is om iedereen gratis toegang te geven tot kwalitatieve theorie-examen voorbereiding.",
}

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Over Gratis Theorie</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij geloven dat iedereen toegang moet hebben tot kwalitatieve theorie-examen voorbereiding, zonder kosten of
            barrières.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Onze Missie</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Gratis Theorie is ontstaan uit de overtuiging dat het behalen van je rijbewijs niet duurder hoeft te zijn
              dan nodig. Wij bieden een volledig gratis platform waar je kunt oefenen voor je theorie-examen, zonder
              verborgen kosten, abonnementen of premium features.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="pt-8">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">100% Gratis</h3>
              <p className="text-gray-600">
                Geen verborgen kosten, geen abonnementen. Alles wat je nodig hebt om te slagen is gratis beschikbaar.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Toegankelijk</h3>
              <p className="text-gray-600">
                Geen registratie vereist. Open je browser en begin direct met oefenen, wanneer het jou uitkomt.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Kwaliteit</h3>
              <p className="text-gray-600">
                Actuele vragen gebaseerd op CBR richtlijnen en een gebruiksvriendelijke interface voor optimaal leren.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Wat Wij Bieden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Voor Leerlingen</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">1000+ actuele oefenvragen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Volledige proefexamens met tijdslimiet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">300+ verkeersborden met uitleg</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Voortgangsregistratie (lokaal opgeslagen)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Voor Alle Categorieën</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Auto (Categorie B) theorie</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Scooter (Categorie AM) theorie</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Motor (Categorie A) theorie</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Regelmatige updates en nieuwe content</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ons Team</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Gratis Theorie wordt ontwikkeld en onderhouden door een toegewijd team van ontwikkelaars en
              verkeerseducatie specialisten die geloven in toegankelijk onderwijs voor iedereen.
            </p>
            <p className="text-gray-600">
              Ons team werkt continu aan het verbeteren van het platform, het toevoegen van nieuwe vragen en het
              up-to-date houden van alle content volgens de laatste CBR richtlijnen.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Klaar om te Beginnen?</h3>
            <p className="text-lg mb-6 opacity-90">
              Sluit je aan bij duizenden mensen die al succesvol hun theorie-examen hebben gehaald!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/practice">Begin Nu Gratis</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
