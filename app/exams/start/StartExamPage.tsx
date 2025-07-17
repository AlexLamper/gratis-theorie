"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Question {
  _id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function StartExamPage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get("exam") || ""

  const [exam, setExam] = useState<{
    title: string
    category: string
    questions: Question[]
    timeLimit: number
    passRate: number
  } | null>(null)

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<{ score: number; passed: boolean; duration: number } | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [duration, setDuration] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
   const STRIPE_DONATE_LINK = "https://donate.stripe.com/14A14m9Au14e8xNcBMffy00"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const fetchExam = async () => {
      if (!slug) return
      const res = await fetch(`/api/exams/${slug}`)
      const data = await res.json()
      setExam(data.exam)
      setAnswers(Array(data.exam.questions.length).fill(-1))
      setTimeLeft(data.exam.timeLimit * 60)
    }
    fetchExam()
  }, [slug])

  useEffect(() => {
    if (!exam || result) return
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1)
      setDuration((d) => d + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [exam, result])

  useEffect(() => {
    if (timeLeft === 0 && exam && !result) {
      finishExam()
    }
  }, [timeLeft, exam, result])

  const selectAnswer = (idx: number) => {
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  const nextQuestion = () => {
    if (answers[current] === -1) return
    setCurrent((c) => Math.min(c + 1, exam!.questions.length - 1))
  }
  const prevQuestion = () => setCurrent((c) => Math.max(c - 1, 0))

  const finishExam = () => {
    if (!exam) return
    const correct = exam.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
      0
    )
    const score = (correct / exam.questions.length) * 100
    setResult({ score, passed: score >= exam.passRate, duration })
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">Laden...</div>
    )
  }

  const questions = exam.questions

  if (result) {
    const toggleExpand = (index: number) => {
      setExpandedIndex(prev => prev === index ? null : index)
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-5xl mx-auto">
            <CardHeader className="text-center border-b pb-4">
              <CardTitle className={`text-2xl font-bold ${result.passed ? "text-green-700" : "text-red-700"}`}>
                {result.passed ? "🎉 Geslaagd!" : "❌ Niet Geslaagd"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Result Overview */}
              <div className="text-center space-y-1 text-gray-800">
                <p className="text-lg font-semibold">{exam.title}</p>
                <p className="text-sm">Je score: <strong>{Math.round(result.score)}%</strong></p>
                <p className="text-sm">Benodigd: <strong>{exam.passRate}%</strong></p>
                <p className="text-sm">Tijd: <strong>{Math.floor(result.duration / 60)}:{String(result.duration % 60).padStart(2, "0")}</strong></p>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correctAnswer

                  return (
                    <DropdownMenu key={q._id}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`w-full aspect-square rounded-md font-medium text-sm flex items-center justify-center border transition-colors duration-200 shadow-sm text-gray-900 hover:shadow-md ${
                            isCorrect ? "bg-green-100 border-green-300 hover:bg-green-200" : "bg-red-100 border-red-300 hover:bg-red-200"
                          }`}
                        >
                          {i + 1}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 p-4 text-sm text-gray-700 z-50 bg-white">
                        <p className="font-semibold text-gray-900 mb-1">{q.question}</p>
                        <p>Jouw antwoord: <strong>{answers[i] !== -1 ? q.options[answers[i]] : "Geen"}</strong></p>
                        {!isCorrect && (
                          <>
                            <p>Correct: <strong>{q.options[q.correctAnswer]}</strong></p>
                            <p className="text-gray-500 italic mt-1">{q.explanation}</p>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                })}
              </div>

              {/* Donatie prompt */}
              <div className="text-center border-t pt-6 mt-6">
                <p className="text-lg font-semibold mb-4">
                  Je hebt de oefentest afgerond! 🙌
                </p>
                <p className="mb-4">
                  Wil je iets terugdoen? Vanaf €1 help je ons om de vragen en dit leerplatform gratis te houden voor iedereen.
                </p>
                <Button
                  asChild
                  className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-6 py-3 rounded-lg shadow"
                >
                  <a
                    href={STRIPE_DONATE_LINK}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                  >
                    Steun vanaf €1
                  </a>
                </Button>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 pt-6">
                <Button onClick={() => location.reload()} className="border border-blue-700/80 hover:cursor-pointer">
                  Opnieuw
                </Button>
                <Button asChild variant="outline">
                  <a href="/exams">Terug naar Overzicht</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const minutes = Math.floor(timeLeft / 60)
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" className="text-sm sm:text-base">
            <a href="/exams">← Terug</a>
          </Button>
          <h2 className="text-2xl font-bold text-center flex-1">{exam.title}</h2>
          <div className="w-[80px] hidden sm:block" />
        </div>
        {/* Voortgang & Timer */}
        <div className="mb-8 flex items-center gap-4">
          <Progress
            value={((current + 1) / questions.length) * 100}
            className="flex-1 h-3 rounded-full bg-gray-200"
          />
          <div className="text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1 rounded-md shadow-sm">
            ⏱ {minutes}:{seconds}
          </div>
        </div>

        {/* Vraag */}
        <Card className="mb-8 shadow-md border border-gray-200 rounded-xl">
          <CardHeader className="rounded-t-xl px-6 py-2 border-b">
            <CardTitle className="text-lg sm:text-xl font-semibold text-blue-900">
              Vraag {current + 1} van {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 py-6">
            <p className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed">
              {q.question}
            </p>

            {/* Antwoorden */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  variant={answers[current] === idx ? "default" : "outline"}
                  className={`w-full text-left py-3 px-4 hover:cursor-pointer rounded-lg transition-all duration-150 ${
                    answers[current] === idx
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white hover:bg-gray-50 border-gray-300 text-gray-800"
                  }`}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigatieknoppen */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <Button
            onClick={prevQuestion}
            disabled={current === 0}
            variant="outline"
            className="px-6 py-2 text-sm sm:text-base disabled:opacity-50 hover:cursor-pointer"
          >
            ← Vorige
          </Button>

          {current === questions.length - 1 ? (
            <Button
              onClick={finishExam}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 text-sm sm:text-base shadow-md hover:cursor-pointer"
            >
              Exam Inleveren
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={answers[current] === -1}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 text-sm sm:text-base shadow-md hover:cursor-pointer"
            >
              Volgende →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}