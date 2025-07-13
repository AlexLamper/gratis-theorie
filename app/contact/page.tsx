"use client"

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  MessageCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heb je vragen, feedback of suggesties? We helpen je graag verder!
          </p>
        </div>

        {/* Informatie + FAQ */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contactgegevens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-600">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">E-mail</p>
                  <p>devlamper06@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Locatie</p>
                  <p>Zuid-Holland, Nederland</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Reactietijd</p>
                  <p>Kan even duren sorry ;d</p>
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
            <CardContent className="space-y-6 text-gray-600 text-sm">
              <div>
                <h4 className="font-medium mb-1">Is Gratis Theorie écht gratis?</h4>
                <p>Ja! Alles is 100% gratis — zonder verborgen kosten of advertenties.</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Moet ik een account aanmaken?</h4>
                <p>
                  Nee, je kunt meteen beginnen met oefenen. Je voortgang wordt lokaal opgeslagen in je browser.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Zijn de vragen actueel?</h4>
                <p>
                  Ja. De vragen zijn gebaseerd op de meest recente CBR-richtlijnen en worden regelmatig bijgewerkt.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Welke categorieën kan ik oefenen?</h4>
                <p>Auto (B), scooter (AM) en motor (A).</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
