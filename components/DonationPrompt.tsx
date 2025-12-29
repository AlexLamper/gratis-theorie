"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { track } from "@vercel/analytics"

export default function DonationPrompt() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8 text-center max-w-3xl mx-auto my-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="text-gray-800 flex-1">
          <p className="text-lg sm:text-xl font-semibold mb-1">
            Heeft dit je geholpen?
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            Onze lessen zijn gratis en dat willen we zo houden. Overweeg een kleine bijdrage – al vanaf €1 – om dit platform te steunen.
          </p>
        </div>
        <div>
          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2"
          >
            <a
              href="https://donate.stripe.com/14A14m9Au14e8xNcBMffy00"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() => track("Donation Clicked", { location: "donation-prompt" })}
            >
              Steun ons
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
