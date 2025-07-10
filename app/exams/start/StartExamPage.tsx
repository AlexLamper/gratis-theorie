"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/progress"

interface Question {
  _id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function StartExamPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "auto"

  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null)
  const [timeLeft, setTimeLeft] = useState(30 * 60)

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/exam-questions?category=${category}`)
      const data = await res.json()
      setQuestions(data.questions)
      setAnswers(Array(data.questions.length).fill(-1))
    }
    fetchQuestions()
  }, [category])

  useEffect(() => {
    if (!questions.length || result) return
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [questions, result])

  useEffect(() => {
    if (timeLeft === 0 && !result) {
      finishExam()
    }
  }, [timeLeft, result])

  const selectAnswer = (idx: number) => {
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  const nextQuestion = () => setCurrent((c) => Math.min(c + 1, questions.length - 1))
  const prevQuestion = () => setCurrent((c) => Math.max(c - 1, 0))

  const finishExam = () => {
    const correct = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
      0
    )
    const score = (correct / questions.length) * 100
    setResult({ score, passed: score >= 70 })
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">Laden...</div>
    )
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-xl mx-auto text-center">
            <CardHeader>
              <CardTitle>{result.passed ? "Geslaagd!" : "Niet Geslaagd"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Je score: {Math.round(result.score)}%</p>
              <Button onClick={() => location.reload()} className="border border-blue-700/80">
                Opnieuw
              </Button>
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
          <CardHeader className="bg-blue-50/60 rounded-t-xl px-6 py-4 border-b">
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
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-150 ${
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
            className="px-6 py-2 text-sm sm:text-base disabled:opacity-50"
          >
            ← Vorige
          </Button>

          {current === questions.length - 1 ? (
            <Button
              onClick={finishExam}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 text-sm sm:text-base shadow-md"
            >
              Exam Inleveren
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 text-sm sm:text-base shadow-md"
            >
              Volgende →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
