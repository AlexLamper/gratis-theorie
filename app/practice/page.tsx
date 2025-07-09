"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Question {
  _id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  image?: string
}

export default function PracticePage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "auto"

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/questions?category=${category}&limit=20`)
        const data = await response.json()
        setQuestions(data.questions || [])
      } catch (error) {
        console.error("Error fetching questions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [category])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetPractice = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Vragen laden...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Geen vragen beschikbaar</CardTitle>
            <CardDescription>Er zijn momenteel geen vragen beschikbaar voor deze categorie.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/">Terug naar Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Terug naar Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {category}
              </Badge>
              <div className="text-sm text-gray-600">
                Vraag {currentQuestionIndex + 1} van {questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Voortgang</span>
            <span className="text-sm text-gray-500">
              {score.total > 0 && `${Math.round((score.correct / score.total) * 100)}% correct`}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  currentQuestion.difficulty === "easy"
                    ? "secondary"
                    : currentQuestion.difficulty === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {currentQuestion.difficulty === "easy"
                  ? "Makkelijk"
                  : currentQuestion.difficulty === "medium"
                    ? "Gemiddeld"
                    : "Moeilijk"}
              </Badge>
              <div className="text-sm text-gray-500">
                Score: {score.correct}/{score.total}
              </div>
            </div>
            <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Question Image (if available) */}
            {currentQuestion.image && (
              <div className="mb-6">
                <img
                  src={currentQuestion.image || "/placeholder.svg"}
                  alt="Vraag illustratie"
                  className="max-w-full h-auto rounded-lg border"
                />
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 border-2 rounded-lg transition-all hover:border-blue-300"

                if (showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += " border-green-500 bg-green-50 text-green-800"
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass += " border-red-500 bg-red-50 text-red-800"
                  } else {
                    buttonClass += " border-gray-200 text-gray-500"
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += " border-blue-500 bg-blue-50"
                } else {
                  buttonClass += " border-gray-200 hover:border-blue-300"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showResult}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Uitleg:</h4>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Vorige
              </Button>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetPractice}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Opnieuw
                </Button>

                {!showResult ? (
                  <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                    Controleer Antwoord
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                    Volgende
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Score */}
        {currentQuestionIndex === questions.length - 1 && showResult && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Oefensessie Voltooid!</CardTitle>
              <CardDescription>Je hebt alle vragen beantwoord</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-blue-600">{Math.round((score.correct / score.total) * 100)}%</div>
              <p className="text-lg">
                {score.correct} van de {score.total} vragen correct
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={resetPractice}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Opnieuw Oefenen
                </Button>
                <Button asChild variant="outline">
                  <Link href="/exams">Doe een Proefexamen</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
