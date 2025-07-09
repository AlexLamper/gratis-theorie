import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, AlertTriangle, Scale } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden - Gratis Theorie",
  description: "Lees onze algemene voorwaarden voor het gebruik van Gratis Theorie platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Algemene Voorwaarden</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deze voorwaarden zijn van toepassing op het gebruik van Gratis Theorie.
          </p>
          <p className="text-sm text-gray-500 mt-4">Laatst bijgewerkt: 1 januari 2024</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>1. Inleiding en Toepasselijkheid</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Welkom bij Gratis Theorie. Deze algemene voorwaarden ("Voorwaarden") zijn van toepassing op je gebruik
                van onze website, diensten en alle gerelateerde functionaliteiten (samen "Diensten").
              </p>
              <p className="text-gray-600">
                Door gebruik te maken van onze Diensten, ga je akkoord met deze Voorwaarden. Als je niet akkoord gaat
                met deze voorwaarden, mag je onze Diensten niet gebruiken.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Let op:</strong> Deze voorwaarden kunnen van tijd tot tijd worden gewijzigd. Controleer
                  regelmatig voor updates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>2. Beschrijving van de Dienst</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Gratis Theorie biedt een gratis online platform voor het oefenen van Nederlandse theorie-examens voor
                auto, scooter en motor. Onze diensten omvatten:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Oefenvragen voor verschillende voertuigcategorieën</li>
                <li>• Proefexamens met tijdslimiet</li>
                <li>• Verkeersborden database met uitleg</li>
                <li>• Voortgangsregistratie (lokaal opgeslagen)</li>
                <li>• Educatieve content en tips</li>
              </ul>
              <p className="text-gray-600">
                Onze diensten zijn bedoeld als aanvulling op officiële rijlessen en vervangen geen professionele
                rijinstructie of officiële CBR examens.
              </p>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>3. Gebruikersverplichtingen</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Toegestaan Gebruik</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Je mag onze Diensten alleen gebruiken voor persoonlijke, niet-commerciële doeleinden</li>
                  <li>• Je bent verantwoordelijk voor het veilig houden van je apparaat en browsergegevens</li>
                  <li>• Je mag geen valse of misleidende informatie verstrekken</li>
                  <li>• Je respecteert de intellectuele eigendomsrechten van Gratis Theorie</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Verboden Gebruik</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Het kopiëren, distribueren of verkopen van onze content</li>
                  <li>• Het gebruik van geautomatiseerde systemen (bots, scrapers)</li>
                  <li>• Pogingen om onze systemen te hacken of te verstoren</li>
                  <li>• Het uploaden van virussen of schadelijke code</li>
                  <li>• Misbruik van onze contactformulieren of communicatiekanalen</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                <span>4. Intellectueel Eigendom</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Alle content op Gratis Theorie, inclusief maar niet beperkt tot teksten, afbeeldingen, logo's, software
                en databases, is eigendom van Gratis Theorie of haar licentiegevers en wordt beschermd door
                auteursrecht en andere intellectuele eigendomswetten.
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Jouw Rechten</h3>
                <p className="text-gray-600">
                  Wij verlenen je een beperkte, niet-exclusieve, niet-overdraagbare licentie om onze Diensten te
                  gebruiken voor persoonlijke, educatieve doeleinden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Beperkingen</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Je mag onze content niet commercieel gebruiken</li>
                  <li>• Je mag geen afgeleide werken maken van onze content</li>
                  <li>• Je mag onze merknamen niet gebruiken zonder toestemming</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>5. Disclaimers en Beperkingen</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Educatief Doel</h3>
                <p className="text-gray-600">
                  Onze Diensten zijn bedoeld voor educatieve doeleinden en ter ondersteuning van je voorbereiding op
                  het officiële CBR theorie-examen. Wij garanderen niet dat het gebruik van onze Diensten zal leiden
                  tot het slagen voor je officiële examen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Beschikbaarheid</h3>
                <p className="text-gray-600">
                  Wij streven ernaar om onze Diensten 24/7 beschikbaar te houden, maar kunnen geen 100% uptime
                  garanderen. Onderhoud, updates en technische problemen kunnen tijdelijke onderbrekingen veroorzaken.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Accuratesse van Content</h3>
                <p className="text-gray-600">
                  Hoewel wij ons best doen om accurate en up-to-date informatie te verstrekken, kunnen wij niet
                  garanderen dat alle content volledig correct of actueel is. Controleer altijd officiële CBR bronnen
                  voor de meest recente informatie.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>6. Aansprakelijkheid</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Beperking van Aansprakelijkheid</h3>
                <p className="text-gray-600">
                  Gratis Theorie is niet aansprakelijk voor enige directe, indirecte, incidentele of gevolgschade die
                  voortvloeit uit het gebruik van onze Diensten, inclusief maar niet beperkt tot:
                </p>
                <ul className="space-y-1 text-gray-600 mt-2">
                  <li>• Verlies van gegevens of voortgang</li>
                  <li>• Zakken voor het officiële CBR examen</li>
                  <li>• Technische problemen of onderbrekingen</li>
                  <li>• Onjuiste of verouderde informatie</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximale Aansprakelijkheid</h3>
                <p className="text-gray-600">
                  Onze totale aansprakelijkheid jegens jou voor alle claims samen zal in geen geval meer bedragen dan
                  €50, of het bedrag dat je hebt betaald voor onze Diensten in de 12 maanden voorafgaand aan de claim
                  (aangezien onze diensten gratis zijn, is dit €0).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>7. Privacy en Gegevensbescherming</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Je privacy is belangrijk voor ons. Ons gebruik van je persoonlijke gegevens wordt geregeld door ons
                Privacy Beleid, dat onderdeel uitmaakt van deze Voorwaarden.
              </p>
              <p className="text-gray-600">
                Door onze Diensten te gebruiken, stem je in met de verzameling en het gebruik van informatie zoals
                beschreven in ons Privacy Beleid.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Geen registratie vereist:</strong> Onze diensten vereisen geen account aanmaken. Je
                  oefengegevens worden lokaal op je apparaat opgeslagen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>8. Beëindiging</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Door Jou</h3>
                <p className="text-gray-600">
                  Je kunt het gebruik van onze Diensten op elk moment beëindigen door simpelweg te stoppen met het
                  bezoeken van onze website.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Door Ons</h3>
                <p className="text-gray-600">
                  Wij behouden ons het recht voor om je toegang tot onze Diensten te beëindigen of te beperken als je
                  deze Voorwaarden schendt of misbruik maakt van onze Diensten.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gevolgen van Beëindiging</h3>
                <p className="text-gray-600">
                  Bij beëindiging vervallen alle rechten en licenties die aan jou zijn verleend. Bepalingen die naar
                  hun aard moeten voortbestaan, blijven van kracht na beëindiging.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Applicable Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-purple-600" />
                <span>9. Toepasselijk Recht en Geschillen</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nederlands Recht</h3>
                <p className="text-gray-600">
                  Deze Voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met het Nederlandse recht.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Geschillenbeslechting</h3>
                <p className="text-gray-600">
                  Alle geschillen die voortvloeien uit of verband houden met deze Voorwaarden zullen worden voorgelegd
                  aan de bevoegde Nederlandse rechtbanken.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Alternatieve Geschillenbeslechting</h3>
                <p className="text-gray-600">
                  Voordat je juridische stappen onderneemt, moedigen wij je aan om contact met ons op te nemen om het
                  geschil op een vriendelijke manier op te lossen.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>10. Wijzigingen in de Voorwaarden</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Wij behouden ons het recht voor om deze Voorwaarden op elk moment te wijzigen. Belangrijke wijzigingen
                zullen we communiceren via onze website.
              </p>
              <p className="text-gray-600">
                Je voortgezette gebruik van onze Diensten na wijzigingen betekent dat je akkoord gaat met de nieuwe
                voorwaarden.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> Controleer deze pagina regelmatig voor updates. De datum van de laatste
                  wijziging staat bovenaan dit document.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
