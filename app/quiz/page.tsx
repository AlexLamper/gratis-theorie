"use client";

import { useEffect, useState } from 'react';

interface Question {
  _id: string;
  question: string;
  options: string[];
  answer: number;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (questions.length === 0) {
    return <p>Vragen worden geladen...</p>;
  }

  const current = questions[index];

  const next = () => {
    setShowAnswer(false);
    setIndex((index + 1) % questions.length);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Oefenexamen</h1>
      <p className="mb-4">{current.question}</p>
      <ul className="space-y-1 mb-4">
        {current.options.map((opt, idx) => (
          <li key={idx} className="flex gap-2">
            <input type="radio" disabled />
            {opt}
          </li>
        ))}
      </ul>
      {showAnswer && (
        <p className="mb-4">Antwoord: {current.options[current.answer]}</p>
      )}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mr-2 rounded bg-blue-600 px-3 py-1 text-white"
      >
        {showAnswer ? 'Verberg antwoord' : 'Toon antwoord'}
      </button>
      <button
        onClick={next}
        className="rounded bg-green-600 px-3 py-1 text-white"
      >
        Volgende vraag
      </button>
    </div>
  );
}
