import { Suspense } from "react"
import StartExamPage from "@/app/exams/start/StartExamPage"

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Examen laden...</p>
        </div>
      </div>
    }>
      <StartExamPage />
    </Suspense>
  )
}
