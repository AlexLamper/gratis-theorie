import { BookOpen, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-semibold">Gratis Theorie</span>
            </div>
            <p className="text-gray-400 mb-4">Het beste gratis platform voor theorie-examens in Nederland.</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>devlamper06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Zuid-Holland, Nederland</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Categorieën</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/leren/auto" className="hover:text-white transition-colors">
                  Auto (B) Theorie
                </Link>
              </li>
              <li>
                <Link href="/leren/scooter" className="hover:text-white transition-colors">
                  Scooter (AM) Theorie
                </Link>
              </li>
              <li>
                <Link href="/leren/motor" className="hover:text-white transition-colors">
                  Motor (A) Theorie
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Platform</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Beleid
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Gratis Theorie. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
