"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/progress"
import { TextToSpeechButton } from "@/components/TextToSpeechButton"
import { HighlightableText } from "@/components/HighlightableText"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sendGAEvent } from "@next/third-parties/google"

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
      sendGAEvent("event", "exam_started", { slug, category: data.exam.category })
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
    const passed = score >= exam.passRate
    setResult({ score, passed, duration })
    sendGAEvent("event", "exam_completed", { 
      slug, 
      category: exam.category, 
      score: Math.round(score), 
      passed 
    })
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
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardHeader className="text-center border-b border-slate-100 pb-8 pt-8 bg-slate-50/50">
              <CardTitle className={`text-3xl font-extrabold mb-2 ${result.passed ? "text-green-600" : "text-red-600"}`}>
                {result.passed ? "🎉 Geslaagd!" : "❌ Niet Geslaagd"}
              </CardTitle>
              <p className="text-slate-600 font-medium">{exam.title}</p>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Result Overview */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Jouw score</div>
                  <div className={`text-2xl font-bold ${result.passed ? "text-green-600" : "text-red-600"}`}>
                    {Math.round(result.score)}%
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Benodigd</div>
                  <div className="text-2xl font-bold text-slate-900">{exam.passRate}%</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Tijd</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {Math.floor(result.duration / 60)}:{String(result.duration % 60).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Question Grid */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Overzicht antwoorden</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
                  {questions.map((q, i) => {
                    const isCorrect = answers[i] === q.correctAnswer

                    return (
                      <DropdownMenu key={q._id}>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={`w-full aspect-square rounded-xl font-bold text-sm flex items-center justify-center border transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                              isCorrect 
                                ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" 
                                : "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                            }`}
                          >
                            {i + 1}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-4 text-sm z-50 bg-white rounded-xl border-slate-100 shadow-xl">
                          <p className="font-bold text-slate-900 mb-2">{q.question}</p>
                          <div className="space-y-1 text-slate-600">
                            <p>Jouw antwoord: <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                              {answers[i] !== -1 ? q.options[answers[i]] : "Geen"}
                            </span></p>
                            {!isCorrect && (
                              <>
                                <p>Correct: <span className="text-green-600 font-medium">{q.options[q.correctAnswer]}</span></p>
                                <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100">
                                  <strong>Uitleg:</strong><br/>
                                  {q.explanation}
                                </div>
                              </>
                            )}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                  })}
                </div>
              </div>

              {/* Donatie prompt */}
              <div className="text-center border-t border-slate-100 pt-8 mt-8">
                <div className="bg-blue-50 rounded-2xl p-6 max-w-2xl mx-auto border border-blue-100">
                  <p className="text-lg font-bold text-blue-900 mb-2">
                    Je hebt de oefentest afgerond! 🙌
                  </p>
                  <p className="text-blue-700 mb-6">
                    Wil je iets terugdoen? Vanaf €1 help je ons om de vragen en dit leerplatform gratis te houden voor iedereen.
                  </p>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-blue-200/50 transition-all"
                  >
                    <a
                      href={STRIPE_DONATE_LINK}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      onClick={() => sendGAEvent("event", "donation_clicked", { location: "exam-result" })}
                    >
                      Steun ons met €1
                    </a>
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 pt-4">
                <Button onClick={() => location.reload()} variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 h-12 px-6">
                  Opnieuw proberen
                </Button>
                <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-6">
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
    <div className="min-h-screen bg-slate-50">
      <div className="container max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100">
            <a href="/exams">← Stoppen</a>
          </Button>
          <h2 className="text-xl font-bold text-slate-900 text-center flex-1 truncate px-4">{exam.title}</h2>
          <div className="w-[80px] hidden sm:block" />
        </div>
        
        {/* Voortgang & Timer */}
        <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Vraag {current + 1} van {questions.length}</span>
              <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
            </div>
            <Progress
              value={((current + 1) / questions.length) * 100}
              className="h-2 rounded-full bg-slate-100"
            />
          </div>
          <div className={`text-sm font-bold px-4 py-2 rounded-xl border shadow-sm transition-colors ${
            timeLeft < 60 ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-slate-50 text-slate-700 border-slate-100"
          }`}>
            ⏱ {minutes}:{seconds}
          </div>
        </div>

        {/* Vraag */}
        <Card className="mb-8 shadow-sm border-slate-100 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                  Vraag {current + 1}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  <HighlightableText text={q.question} />
                </CardTitle>
              </div>
              <TextToSpeechButton text={`${q.question}. ${q.options.join(". ")}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-6 py-8">
            {/* Antwoorden */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
                    answers[current] === idx
                      ? "bg-blue-50 border-blue-600 shadow-sm"
                      : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                    answers[current] === idx
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300 group-hover:border-blue-400"
                  }`}>
                    {answers[current] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-base sm:text-lg font-medium ${
                    answers[current] === idx ? "text-blue-900" : "text-slate-700"
                  }`}>
                    <HighlightableText text={opt} />
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigatieknoppen */}
        <div className="flex justify-between items-center mt-8 gap-4">
          <Button
            onClick={prevQuestion}
            disabled={current === 0}
            variant="outline"
            className="px-6 h-12 text-base border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            ← Vorige
          </Button>

          {current === questions.length - 1 ? (
            <Button
              onClick={finishExam}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 h-12 text-base shadow-lg hover:shadow-green-200/50 transition-all"
            >
              Examen Inleveren
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={answers[current] === -1}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 text-base shadow-lg hover:shadow-blue-200/50 transition-all"
            >
              Volgende →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}