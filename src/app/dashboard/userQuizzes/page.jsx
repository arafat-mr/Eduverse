"use client";

import WithRole from "@/app/components/WithRole";
import React, { useEffect, useState } from "react";

function UserQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch quizzes on mount
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

  // Handle answer selection
  const handleAnswer = (option) => {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    if (option === currentQuestion.answer) setScore(score + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  // Quiz selection view
  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center  px-5 py-12">
        <div className="w-full max-w-4xl  rounded-2xl shadow-2xl p-8 text-white">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Choose a Quiz
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <button
                key={quiz._id}
                onClick={() => setCurrentQuiz(quiz)}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-600 transition"
              >
                <h2 className="font-bold text-blue-300">{quiz.title}</h2>
                <p className="text-gray-200 text-sm">{quiz.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quiz question view
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1B54] px-5 py-12">
      <div className="w-full max-w-4xl bg-[#031043] rounded-2xl shadow-lg p-8 text-white">
        {!isFinished ? (
          <>
            <h2 className="text-lg font-semibold text-gray-400 mb-1">
              {currentQuiz.category}
            </h2>
            <h1 className="text-xl font-bold text-blue-400 mb-4">{currentQuiz.title}</h1>
            <p className="text-gray-200 font-medium mb-6">
              Q{currentQuestionIndex + 1}. {currentQuestion.question}
            </p>
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="text-gray-200 px-4 py-2 rounded-lg border border-gray-300 hover:bg-blue-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-gray-200">
              Your Score: <span className="font-bold">{score}</span> / {currentQuiz.questions.length}
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

// Only allow "user" role
export default WithRole(UserQuizzesPage, ["user"]);
