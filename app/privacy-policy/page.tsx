import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, UserCheck, Database, Mail } from "lucide-react"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Beleid - Gratis Theorie",
  description: "Lees ons privacy beleid en ontdek hoe wij omgaan met je persoonlijke gegevens op Gratis Theorie.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Beleid</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij respecteren je privacy en zijn transparant over hoe we omgaan met je gegevens.
          </p>
          <p className="text-sm text-gray-500 mt-4">Laatst bijgewerkt: 1 januari 2024</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>Inleiding</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Gratis Theorie ("wij", "ons", "onze") respecteert je privacy en is toegewijd aan het beschermen van je
                persoonlijke gegevens. Dit privacy beleid legt uit hoe wij informatie verzamelen, gebruiken en
                beschermen wanneer je onze website en diensten gebruikt.
              </p>
              <p>
                Door gebruik te maken van onze diensten, stem je in met de verzameling en het gebruik van informatie in
                overeenstemming met dit beleid.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-600" />
                <span>Welke Gegevens Verzamelen Wij?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatisch Verzamelde Gegevens</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• IP-adres en locatiegegevens</li>
                  <li>• Browser type en versie</li>
                  <li>• Besturingssysteem</li>
                  <li>• Bezochte pagina's en tijdstip van bezoek</li>
                  <li>• Referrer URL (de pagina van waaruit je kwam)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gebruiksgegevens</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Oefenresultaten en voortgang (lokaal opgeslagen)</li>
                  <li>• Gekozen categorieën en onderwerpen</li>
                  <li>• Tijd besteed aan oefenen</li>
                  <li>• Foutieve antwoorden voor verbetering</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vrijwillig Verstrekte Gegevens</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• E-mailadres (alleen bij contact of nieuwsbrief)</li>
                  <li>• Feedback en suggesties</li>
                  <li>• Correspondentie met onze klantenservice</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                <span>Hoe Gebruiken Wij Je Gegevens?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dienstverlening</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Het leveren van onze gratis theorie-oefendiensten</li>
                    <li>• Personaliseren van je leerervaring</li>
                    <li>• Bijhouden van je voortgang (lokaal op je apparaat)</li>
                    <li>• Verbeteren van onze content en functionaliteit</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Communicatie</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Reageren op je vragen en verzoeken</li>
                    <li>• Versturen van belangrijke updates (indien je hiervoor hebt gekozen)</li>
                    <li>• Nieuwsbrief met tips en nieuwe content (opt-in)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analyse en Verbetering</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Analyseren van websitegebruik (geanonimiseerd)</li>
                    <li>• Identificeren van populaire content</li>
                    <li>• Technische problemen oplossen</li>
                    <li>• Beveiliging en fraudepreventie</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-red-600" />
                <span>Gegevensopslag en Beveiliging</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lokale Opslag</h3>
                <p className="text-gray-600">
                  Je oefenresultaten en voortgang worden lokaal op je apparaat opgeslagen in je browser. Deze gegevens
                  verlaten je apparaat niet en worden niet naar onze servers verzonden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Server Gegevens</h3>
                <p className="text-gray-600">
                  Wij slaan minimale server logs op voor technische doeleinden en beveiliging. Deze bevatten geen
                  persoonlijk identificeerbare informatie en worden na 30 dagen automatisch verwijderd.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Beveiliging</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• SSL/TLS encryptie voor alle communicatie</li>
                  <li>• Regelmatige beveiligingsupdates</li>
                  <li>• Beperkte toegang tot systemen</li>
                  <li>• Monitoring voor verdachte activiteiten</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-orange-600" />
                <span>Cookies en Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Essentiële Cookies</h3>
                <p className="text-gray-600">
                  Wij gebruiken alleen essentiële cookies die nodig zijn voor de basisfunctionaliteit van onze website.
                  Deze cookies slaan geen persoonlijke informatie op.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Geen Tracking</h3>
                <p className="text-gray-600">
                  Wij gebruiken geen tracking cookies, advertentiecookies of cookies van derden. Je privacy is
                  belangrijk voor ons.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lokale Opslag</h3>
                <p className="text-gray-600">
                  Je browser's lokale opslag wordt gebruikt om je oefenvoortgang bij te houden. Je kunt deze gegevens
                  altijd verwijderen via je browserinstellingen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-indigo-600" />
                <span>Je Rechten</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Onder de AVG (Algemene Verordening Gegevensbescherming) heb je de volgende rechten:
              </p>

              <ul className="space-y-2 text-gray-600">
                <li>
                  • <strong>Recht op informatie:</strong> Je hebt het recht te weten welke gegevens we verzamelen
                </li>
                <li>
                  • <strong>Recht op inzage:</strong> Je kunt een kopie opvragen van je persoonlijke gegevens
                </li>
                <li>
                  • <strong>Recht op rectificatie:</strong> Je kunt onjuiste gegevens laten corrigeren
                </li>
                <li>
                  • <strong>Recht op verwijdering:</strong> Je kunt verzoeken om verwijdering van je gegevens
                </li>
                <li>
                  • <strong>Recht op beperking:</strong> Je kunt de verwerking van je gegevens beperken
                </li>
                <li>
                  • <strong>Recht op overdraagbaarheid:</strong> Je kunt je gegevens in een leesbaar formaat opvragen
                </li>
                <li>
                  • <strong>Recht van bezwaar:</strong> Je kunt bezwaar maken tegen bepaalde verwerkingen
                </li>
              </ul>

              <p className="text-gray-600 mt-4">
                Om gebruik te maken van deze rechten, neem contact met ons op via{" "}
                <a href="mailto:privacy@gratis-theorie.nl" className="text-blue-600 hover:underline">
                  privacy@gratis-theorie.nl
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <span>Delen met Derden</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Wij verkopen, verhuren of delen je persoonlijke gegevens niet met derden, behalve in de volgende
                gevallen:
              </p>

              <ul className="space-y-2 text-gray-600">
                <li>
                  • <strong>Wettelijke verplichting:</strong> Wanneer dit wettelijk verplicht is
                </li>
                <li>
                  • <strong>Beveiliging:</strong> Om fraude te voorkomen of onze diensten te beschermen
                </li>
                <li>
                  • <strong>Technische dienstverleners:</strong> Hosting en technische ondersteuning (onder strikte
                  contracten)
                </li>
              </ul>

              <p className="text-gray-600 mt-4">
                Alle derde partijen die toegang hebben tot je gegevens zijn contractueel verplicht om deze te beschermen
                en alleen te gebruiken voor de overeengekomen doeleinden.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Heb je vragen over dit privacy beleid of over hoe wij omgaan met je gegevens? Neem dan contact met ons
                op:
              </p>

              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>E-mail:</strong> privacy@gratis-theorie.nl
                </p>
                <p>
                  <strong>Adres:</strong> Gratis Theorie, Postbus 12345, 1000 AB Amsterdam
                </p>
                <p>
                  <strong>Telefoon:</strong> +31 (0)20 123 4567
                </p>
              </div>

              <p className="text-gray-600 mt-4">
                Wij streven ernaar om binnen 30 dagen te reageren op alle privacy-gerelateerde verzoeken.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Wijzigingen in dit Beleid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wij kunnen dit privacy beleid van tijd tot tijd bijwerken. Belangrijke wijzigingen zullen we
                communiceren via onze website. We raden je aan om dit beleid regelmatig te controleren voor updates.
              </p>
              <p className="text-gray-600 mt-4">
                De datum van de laatste wijziging staat bovenaan dit document vermeld.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
