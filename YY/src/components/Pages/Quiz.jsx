import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is the capital of India?',
    options: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'],
    answer: 'Delhi',
  },
  {
    question: 'Which language is used for web apps?',
    options: ['PHP', 'Python', 'JavaScript', 'All of the above'],
    answer: 'All of the above',
  },
  {
    question: 'What does HTML stand for?',
    options: [
      'Hyper Trainer Marking Language',
      'Hyper Text Marketing Language',
      'Hyper Text Markup Language',
      'Hyper Text Markup Leveler',
    ],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
    answer: 'Facebook',
  },
  {
    question: 'What is the currency of Japan?',
    options: ['Yen', 'Won', 'Dollar', 'Euro'],
    answer: 'Yen',
  },
  {
    question: 'Which is not a programming language?',
    options: ['Python', 'HTML', 'Java', 'C++'],
    answer: 'HTML',
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    question: 'What color do you get when you mix red and white?',
    options: ['Pink', 'Purple', 'Orange', 'Brown'],
    answer: 'Pink',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 'Pacific',
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const navigate = useNavigate();

  // Dummy summary data
  const startedOn = 'Monday, 31 March 2025, 3:35 PM';
  const completedOn = showScore ? 'Monday, 31 March 2025, 3:44 PM' : '-';
  const timeTaken = showScore ? '8 mins 26 secs' : '-';
  const marks = showScore ? `${selected.filter((ans, idx) => ans === questions[idx].answer).length}.00/${questions.length}.00` : `0.00/${questions.length}.00`;
  const grade = showScore ? `${(selected.filter((ans, idx) => ans === questions[idx].answer).length / questions.length * 10).toFixed(2)} out of 10.00 (${Math.round(selected.filter((ans, idx) => ans === questions[idx].answer).length / questions.length * 100)}%)` : '-';

  const handleOptionClick = (option) => {
    if (selected[current] === undefined && !reviewMode) {
      const newSelected = [...selected];
      newSelected[current] = option;
      setSelected(newSelected);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
      setReviewMode(true);
    }
  };

  const handleFinishReview = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8 mt-24">
      <h1 className="text-3xl font-extrabold text-rich-black mb-6 text-center">YugaYatra Internship Test</h1>
      <div className="flex w-full max-w-6xl gap-8">
        {/* Main Question Area (80%) */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-xl p-10 w-full text-left mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-700">Question {current + 1}</span>
                {showScore && (
                  <span className={`text-xs font-bold ml-2 ${selected[current] === questions[current].answer ? 'text-green-600' : 'text-red-600'}`}>
                    {selected[current] === questions[current].answer ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>
              <div className="text-gray-800 mb-4 text-lg">{questions[current].question}</div>
              <div className="space-y-2">
                {questions[current].options.map((option, idx) => (
                  <div key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`q${current}_opt${idx}`}
                      name={`q${current}`}
                      value={option}
                      checked={selected[current] === option}
                      disabled={selected[current] !== undefined || reviewMode}
                      onChange={() => handleOptionClick(option)}
                      className="accent-lavish-gold"
                    />
                    <label htmlFor={`q${current}_opt${idx}`} className="text-base cursor-pointer">
                      {option}
                      {showScore && selected[current] === option && (
                        selected[current] === questions[current].answer ? (
                          <span className="ml-2 text-green-600 font-bold">&#10003;</span>
                        ) : (
                          <span className="ml-2 text-red-600 font-bold">&#10007;</span>
                        )
                      )}
                      {showScore && option === questions[current].answer && selected[current] !== questions[current].answer && (
                        <span className="ml-2 text-green-600 font-bold">(Correct)</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {!showScore && (
              <button
                className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition mt-4"
                onClick={handleNext}
                disabled={selected[current] === undefined}
              >
                {current === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </div>
        {/* Right Sidebar Navigation (20%) */}
        <div className="w-64 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4 text-rich-black">Quiz navigation</h2>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {questions.map((_, idx) => (
              <button
                key={idx}
                className={`w-8 h-8 rounded border text-sm font-bold transition-all
                  ${current === idx ? 'bg-lavish-gold text-white border-lavish-gold' : ''}
                  ${selected[idx] !== undefined && current !== idx ? 'bg-green-100 border-green-400 text-green-700' : ''}
                  ${selected[idx] === undefined && current !== idx ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                `}
                onClick={() => setCurrent(idx)}
                disabled={reviewMode}
                title={`Go to question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mb-2 text-sm">
            <span className="font-semibold">Total:</span> {questions.length}
          </div>
          <div className="mb-4 text-sm">
            <span className="font-semibold">Attempted:</span> {selected.filter(ans => ans !== undefined).length}
          </div>
          {showScore && (
            <button
              className="text-blue-600 underline text-xs"
              onClick={handleFinishReview}
            >
              Finish review
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 