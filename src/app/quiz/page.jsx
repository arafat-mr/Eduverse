// app/api/quiz/page.jsx

"use client";

import { useEffect, useState } from "react";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.quizzes.length > 0) {
          setQuizzes(data.quizzes);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Quiz selection page
  if (!currentQuiz) {
    const mid = Math.ceil(quizzes.length / 2);
    const leftQuizzes = quizzes.slice(0, mid);
    const rightQuizzes = quizzes.slice(mid);

    // Make columns equal height by padding shorter one
    const maxLength = Math.max(leftQuizzes.length, rightQuizzes.length);
    while (leftQuizzes.length < maxLength) leftQuizzes.push({ _id: `empty-left-${leftQuizzes.length}` });
    while (rightQuizzes.length < maxLength) rightQuizzes.push({ _id: `empty-right-${rightQuizzes.length}` });

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C1B54] px-5 py-12">
        <div className="w-full max-w-7xl bg-[#031043] rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Choose a Quiz</h1>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-4">
              {leftQuizzes.map((quiz) =>
                quiz.title ? (
                  <button
                    key={quiz._id}
                    onClick={() => setCurrentQuiz(quiz)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100 transition text-left"
                  >
                    <h2 className="font-bold text-blue-600">{quiz.title}</h2>
                    <p className="text-sm text-gray-600">{quiz.category}</p>
                  </button>
                ) : (
                  <div key={quiz._id} className="flex-1 py-3"></div>
                )
              )}
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-4">
              {rightQuizzes.map((quiz) =>
                quiz.title ? (
                  <button
                    key={quiz._id}
                    onClick={() => setCurrentQuiz(quiz)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100 transition text-left"
                  >
                    <h2 className="font-bold text-blue-600">{quiz.title}</h2>
                    <p className="text-sm text-gray-600">{quiz.category}</p>
                  </button>
                ) : (
                  <div key={quiz._id} className="flex-1 py-3"></div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question page
  const questions = currentQuiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    if (option === currentQuestion.answer) setScore(score + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1B54] px-5 py-12">
      <div className="w-full max-w-7xl bg-[#031043] rounded-2xl shadow-lg p-8">
        {!isFinished ? (
          <>
            <h2 className="text-lg font-semibold text-gray-600 mb-1">{currentQuiz.category}</h2>
            <h1 className="text-xl font-bold text-blue-600 mb-4">{currentQuiz.title}</h1>
            <p className="text-gray-50 font-medium mb-6">
              Q{currentQuestionIndex + 1}. {currentQuestion.question}
            </p>
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="text-gray-50 px-4 py-2 rounded-lg border border-gray-300 hover:bg-blue-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-gray-50">
              Your Score: <span className="font-bold">{score}</span> / {questions.length}
            </p>
            <button
              onClick={() => {
                setScore(0);
                setCurrentQuestionIndex(0);
                setIsFinished(false);
                setCurrentQuiz(null);
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Quiz List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
