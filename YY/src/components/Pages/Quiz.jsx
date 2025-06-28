import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

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

const TEST_DURATION_MINUTES = 30; // Change this for different durations
const MAX_ATTEMPTS = 3;

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_MINUTES * 60); // in seconds
  const [attemptsInfo, setAttemptsInfo] = useState(null);
  const timerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if payment was successful
    const paymentSuccess = localStorage.getItem('paymentSuccess');
    const paymentOrderId = localStorage.getItem('paymentOrderId');
    
    if (paymentSuccess === 'true' && paymentOrderId) {
      setHasPayment(true);
      // Fetch attempts for the user's email
      fetchAttempts();
    }
    setIsLoading(false);
  }, []);

  const fetchAttempts = async () => {
    try {
      const studentEmail = localStorage.getItem('studentEmail') || 'test@yugayatra.com';
      const response = await fetch(`http://localhost:5000/api/attempts/${encodeURIComponent(studentEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setAttemptsInfo(data);
      } else {
        console.error('Failed to fetch attempts:', data.message);
        setAttemptsInfo({
          attemptsUsed: 0,
          totalAttempts: 5,
          remainingAttempts: 5
        });
      }
    } catch (error) {
      console.error('Error fetching attempts:', error);
      setAttemptsInfo({
        attemptsUsed: 0,
        totalAttempts: 5,
        remainingAttempts: 5
      });
    }
  };

  // Timer logic
  useEffect(() => {
    if (showScore || reviewMode) return; // Pause timer if test is submitted
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, showScore, reviewMode]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Attempts logic - now based on email tracking
  const getRemainingAttempts = () => {
    return attemptsInfo ? attemptsInfo.remainingAttempts : 0;
  };

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
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // Submission logic
  const handleManualSubmit = () => {
    const attempts = getRemainingAttempts();
    if (attempts <= 0) {
      alert('No attempts remaining.');
      return;
    }
    const score = selected.filter((ans, idx) => ans === questions[idx].answer).length;
    setAttemptsInfo({
      ...attemptsInfo,
      attemptsUsed: attemptsInfo.attemptsUsed + 1,
      remainingAttempts: attemptsInfo.remainingAttempts - 1
    });
    localStorage.setItem('lastScore', JSON.stringify(score));
    localStorage.setItem('lastTotal', JSON.stringify(questions.length));
    setShowScore(true);
    setReviewMode(true);
    
    // Save test result to backend
    saveTestResult(score, questions.length, attemptsInfo.attemptsUsed);
    
    // Redirect to result page after a short delay for UX
    setTimeout(() => {
      navigate('/result', { state: { score, total: questions.length, attempts: attemptsInfo.attemptsUsed } });
    }, 1000);
  };

  const handleAutoSubmit = () => {
    const attempts = getRemainingAttempts();
    if (attempts <= 0) {
      alert('No attempts remaining.');
      return;
    }
    const score = selected.filter((ans, idx) => ans === questions[idx].answer).length;
    setAttemptsInfo({
      ...attemptsInfo,
      attemptsUsed: attemptsInfo.attemptsUsed + 1,
      remainingAttempts: attemptsInfo.remainingAttempts - 1
    });
    localStorage.setItem('lastScore', JSON.stringify(score));
    localStorage.setItem('lastTotal', JSON.stringify(questions.length));
    setShowScore(true);
    setReviewMode(true);
    
    // Save test result to backend
    saveTestResult(score, questions.length, attemptsInfo.attemptsUsed);
    
    setTimeout(() => {
      navigate('/result', { state: { score, total: questions.length, attempts: attemptsInfo.attemptsUsed } });
    }, 1000);
  };

  // Save test result to backend
  const saveTestResult = async (score, totalQuestions, attemptsUsed) => {
    try {
      const paymentOrderId = localStorage.getItem('paymentOrderId');
      const paymentId = localStorage.getItem('paymentId');
      
      // Get student information (you might want to collect this during the test)
      const studentName = localStorage.getItem('studentName') || 'Test User';
      const studentEmail = localStorage.getItem('studentEmail') || 'test@yugayatra.com';
      
      // Calculate time taken
      const timeTaken = `${Math.floor((TEST_DURATION_MINUTES * 60 - timeLeft) / 60)} mins ${(TEST_DURATION_MINUTES * 60 - timeLeft) % 60} secs`;
      
      // Prepare questions data with answers
      const questionsData = questions.map((q, idx) => ({
        question: q.question,
        selectedAnswer: selected[idx] || 'Not answered',
        correctAnswer: q.answer,
        isCorrect: selected[idx] === q.answer
      }));
      
      // Get domain from localStorage
      const domain = localStorage.getItem('testDomain') || '';
      
      const response = await fetch('http://localhost:3000/save-test-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          email: studentEmail,
          score,
          totalQuestions,
          attemptsUsed: attemptsUsed + 1, // This is the attempt number (1-based)
          totalAttempts: 5, // Total attempts allowed
          paymentId,
          orderId: paymentOrderId,
          timeTaken,
          startedOn: new Date(Date.now() - (TEST_DURATION_MINUTES * 60 - timeLeft) * 1000).toISOString(),
          completedOn: new Date().toISOString(),
          questions: questionsData,
          domain
        })
      });

      const data = await response.json();
      if (data.success) {
        console.log('Test result saved successfully:', data.record);
      } else {
        console.error('Failed to save test result:', data.error);
      }
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  const handleGoToPayment = () => {
    navigate('/payment');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-lavish-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-rich-black mb-4">Payment Required</h2>
          <p className="text-gray-600 mb-6">
            You need to complete the payment of ₹500 before you can access the test.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleGoToPayment}
              className="w-full px-6 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
            >
              Proceed to Payment
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-gray-200 text-rich-black rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8 mt-24">
      {/* Timer Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <div />
        <div className="flex items-center gap-4">
          {attemptsInfo && (
            <div className="text-lg font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
              Attempts: {attemptsInfo.attemptsUsed}/{attemptsInfo.totalAttempts} (Remaining: {attemptsInfo.remainingAttempts})
            </div>
          )}
          <div className="text-2xl font-bold text-lavish-gold bg-white px-6 py-2 rounded-xl shadow">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
        <div />
      </div>
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
            {/* Navigation Buttons */}
            {!showScore && (
              <div className="flex flex-wrap gap-4 mt-8 justify-between items-center">
                <button
                  className="px-6 py-2 bg-gray-200 text-rich-black rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={handlePrevious}
                  disabled={current === 0}
                >
                  Previous
                </button>
                <button
                  className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
                  onClick={handleNext}
                  disabled={selected[current] === undefined}
                >
                  {current === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            )}
            {/* Show auto-submit message if time is up */}
            {showScore && timeLeft === 0 && (
              <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
                Time is up! Your test has been auto-submitted.
              </div>
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
          {/* Submit button in sidebar */}
          {!showScore && (
            <button
              className="w-full px-6 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition mt-4"
              onClick={handleManualSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 