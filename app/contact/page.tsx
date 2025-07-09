import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Gratis Theorie",
  description: "Neem contact op met Gratis Theorie. Vragen, suggesties of feedback? Wij helpen je graag verder.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heb je vragen, suggesties of feedback? We horen graag van je! Ons team staat klaar om je te helpen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Stuur ons een Bericht</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Voornaam
                    </label>
                    <Input id="firstName" placeholder="Je voornaam" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Achternaam
                    </label>
                    <Input id="lastName" placeholder="Je achternaam" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres
                  </label>
                  <Input id="email" type="email" placeholder="je@email.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Onderwerp
                  </label>
                  <Input id="subject" placeholder="Waar gaat je bericht over?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Bericht
                  </label>
                  <Textarea id="message" placeholder="Vertel ons wat je op je hart hebt..." rows={6} />
                </div>

                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Verstuur Bericht
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-gray-600">info@gratis-theorie.nl</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Telefoon</p>
                    <p className="text-gray-600">+31 (0)20 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-gray-600">Amsterdam, Nederland</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Reactietijd</p>
                    <p className="text-gray-600">Binnen 24 uur</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <span>Veelgestelde Vragen</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Is Gratis Theorie echt gratis?</h4>
                  <p className="text-sm text-gray-600">
                    Ja, absoluut! Alle functies zijn 100% gratis zonder verborgen kosten of abonnementen.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Moet ik een account aanmaken?</h4>
                  <p className="text-sm text-gray-600">
                    Nee, je kunt direct beginnen met oefenen zonder registratie. Je voortgang wordt lokaal opgeslagen.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Zijn de vragen up-to-date?</h4>
                  <p className="text-sm text-gray-600">
                    Ja, onze vragen zijn gebaseerd op de nieuwste CBR richtlijnen en worden regelmatig bijgewerkt.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Voor welke categorieën kan ik oefenen?</h4>
                  <p className="text-sm text-gray-600">
                    Je kunt oefenen voor auto (B), scooter (AM) en motor (A) theorie-examens.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
