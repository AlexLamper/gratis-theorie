import { Suspense } from "react"
import StartExamPage from "@/app/exams/start/StartExamPage"

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <StartExamPage />
    </Suspense>
  )
}
