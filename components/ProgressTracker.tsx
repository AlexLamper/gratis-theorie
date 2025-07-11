"use client"

import { getVoortgang } from "@/lib/session"

interface Props {
  voertuig: string
  categorieen: string[]
}

export default function ProgressTracker({ voertuig, categorieen }: Props) {
  const voortgang = getVoortgang()
  const gelezen = voortgang?.gelezen || {}
  const totaal = categorieen.length
  const voltooid = categorieen.filter(cat => gelezen[cat]).length
  const percentage = Math.round((voltooid / totaal) * 100)

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm text-gray-600">
        <span>Voortgang</span>
        <span>{percentage}% voltooid</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}