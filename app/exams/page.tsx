"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

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

interface ExamResult {
  score: number
  total: number
  passed: boolean
  timeSpent: number
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[]
}

export default function ExamsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [examStarted, setExamStarted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(false)

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0 && !examResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && examStarted && !examResult) {
      handleSubmitExam()
    }
  }, [examStarted, timeLeft, examResult])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startExam = async (category: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/questions?category=${category}&limit=40`)
      const data = await response.json()
      setQuestions(data.questions || [])
      setSelectedCategory(category)
      setExamStarted(true)
      setTimeLeft(30 * 60)
    } catch (error) {
      console.error("Error starting exam:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleSubmitExam = () => {
    const timeSpent = 30 * 60 - timeLeft
    const results = questions.map((question, index) => ({
      questionId: question._id,
      selectedAnswer: answers[index] ?? -1,
      correct: answers[index] === question.correctAnswer,
    }))

    const correctAnswers = results.filter((r) => r.correct).length
    const passed = correctAnswers >= Math.ceil(questions.length * 0.7) // 70% to pass

    setExamResult({
      score: correctAnswers,
      total: questions.length,
      passed,
      timeSpent,
      answers: results,
    })
  }

  const resetExam = () => {
    setSelectedCategory(null)
    setExamStarted(false)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTimeLeft(30 * 60)
    setExamResult(null)
  }

  // Category selection screen
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Terug naar Home</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Proefexamens</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test je kennis met een volledig proefexamen. 40 vragen, 30 minuten tijd. Je hebt 70% nodig om te slagen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { id: "auto", name: "Auto (B)", icon: "🚗", questions: 40 },
              { id: "scooter", name: "Scooter (AM)", icon: "🛵", questions: 40 },
              { id: "motor", name: "Motor (A)", icon: "🏍️", questions: 40 },
            ].map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.questions} vragen • 30 minuten</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>30 minuten tijd</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>70% om te slagen</span>
                    </div>
                  </div>
                  <Button onClick={() => startExam(category.id)} disabled={loading} className="w-full hover:cursor-pointer bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-colors">
                    {loading ? "Laden..." : "Start Examen"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Exam result screen
  if (examResult) {
    const percentage = Math.round((examResult.score / examResult.total) * 100)

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Examen Resultaat</h1>
              <Badge variant={examResult.passed ? "default" : "destructive"}>
                {examResult.passed ? "GESLAAGD" : "GEZAKT"}
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mb-4">
                {examResult.passed ? (
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                )}
              </div>
              <CardTitle className="text-3xl">{examResult.passed ? "Gefeliciteerd!" : "Helaas..."}</CardTitle>
              <CardDescription className="text-lg">
                {examResult.passed
                  ? "Je bent geslaagd voor het proefexamen!"
                  : "Je bent gezakt. Oefen nog wat meer en probeer het opnieuw."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
                <p className="text-lg text-gray-600">
                  {examResult.score} van de {examResult.total} vragen correct
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(examResult.timeSpent / 60)}:{(examResult.timeSpent % 60).toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-600">Tijd gebruikt</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{examResult.passed ? "70%+" : "<70%"}</div>
                  <div className="text-sm text-gray-600">Vereist om te slagen</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={resetExam}>Nieuw Examen</Button>
                <Button asChild variant="outline">
                  <Link href="/practice">Meer Oefenen</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Exam in progress
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Exam Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {selectedCategory} Examen
              </Badge>
              <div className="text-sm text-gray-600">
                Vraag {currentQuestionIndex + 1} van {questions.length}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={`font-mono ${timeLeft < 300 ? "text-red-600" : "text-gray-700"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button onClick={handleSubmitExam} variant="outline" size="sm">
                Inleveren
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress and Status */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Voortgang</span>
            <span className="text-sm text-gray-500">
              {answeredQuestions} van {questions.length} beantwoord
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Time Warning */}
        {timeLeft < 300 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">Nog minder dan 5 minuten!</span>
            </div>
          </div>
        )}

        {/* Question */}
        {currentQuestion && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {currentQuestion.image && (
                <div className="mb-6">
                  <img
                    src={currentQuestion.image || "/placeholder.svg"}
                    alt="Vraag illustratie"
                    className="max-w-full h-auto rounded-lg border"
                  />
                </div>
              )}

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all hover:border-blue-300 ${
                      answers[currentQuestionIndex] === index ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Vorige
                </Button>

                <div className="text-sm text-gray-500">
                  {answers[currentQuestionIndex] !== undefined ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <span>Selecteer een antwoord</span>
                  )}
                </div>

                <Button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Volgende
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Navigator */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Vraag Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all ${
                    index === currentQuestionIndex
                      ? "border-blue-500 bg-blue-500 text-white"
                      : answers[index] !== undefined
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
