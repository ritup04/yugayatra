import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const TEST_DURATION_MINUTES = 30; // Change this for different durations
const MAX_ATTEMPTS = 5;

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_MINUTES * 60); // in seconds
  const [attemptsInfo, setAttemptsInfo] = useState(null);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeQuiz = async () => {
      // 1. Check for payment
      const paymentSuccess = localStorage.getItem('paymentSuccess');
      if (!paymentSuccess) {
        setError('Payment has not been completed.');
        setIsLoading(false);
        return;
      }
      setHasPayment(true);

      // 2. Fetch user's attempt history
      const studentEmail = localStorage.getItem('studentEmail') || 'test@yugayatra.com';
      try {
        const attemptsRes = await fetch(`http://localhost:5000/api/attempts/${encodeURIComponent(studentEmail)}`);
        const attemptsData = await attemptsRes.json();
        if (attemptsData.success) {
          if (attemptsData.remainingAttempts <= 0) {
            setError('You have no remaining attempts.');
            setIsLoading(false);
            return;
          }
          setAttemptsInfo(attemptsData);
        } else {
          throw new Error(attemptsData.message || 'Failed to fetch attempts.');
        }
      } catch (err) {
        setError('Could not verify your test attempts. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // 3. Fetch questions
      const domain = localStorage.getItem('testDomain');
      console.log('Selected domain for quiz:', domain);
      if (!domain) {
        setError('No domain selected. Please go back and select a domain.');
        setIsLoading(false);
        return;
      }

      try {
        const questionsRes = await fetch(`http://localhost:5000/api/test/questions?domain=${encodeURIComponent(domain)}`);
        const questionsData = await questionsRes.json();
        console.log('Questions API response:', questionsData);
        if (questionsData.success && questionsData.questions.length > 0) {
          setQuestions(questionsData.questions);
          setSelected(new Array(questionsData.questions.length).fill(null));
          setStartTime(new Date());
        } else {
          setError(questionsData.error || 'No questions available for this domain.');
        }
      } catch (err) {
        setError(err.message || 'Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, [navigate]);

  // Timer logic
  useEffect(() => {
    if (isLoading || showScore || reviewMode) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, showScore, reviewMode, isLoading]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Attempts logic - now based on email tracking
  const getRemainingAttempts = () => {
    return attemptsInfo ? attemptsInfo.remainingAttempts : 0;
  };

  const handleOptionClick = (option, idx) => {
    if (!reviewMode) {
      const newSelected = [...selected];
      newSelected[idx] = option;
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

  const submitTest = async () => {
    if (showScore) return; // Prevent double submission

    const endTime = new Date();
    const timeTaken = Math.round((endTime - startTime) / 1000); // in seconds

    const submissionData = {
      studentName: localStorage.getItem('studentName') || 'Test User',
      email: localStorage.getItem('studentEmail') || 'test@example.com',
      domain: localStorage.getItem('testDomain'),
      questions: questions.map((q, idx) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        category: q.category,
        difficulty: q.difficulty,
        selectedOption: selected[idx] || null
      })),
      timeTaken,
      startedOn: startTime,
      completedOn: endTime,
    };

    try {
      const response = await fetch('http://localhost:5000/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const data = await response.json();

      if (data.success) {
        navigate(`/result/${data.resultId}`);
      } else {
        setError(data.error || 'Failed to submit test results.');
        setShowScore(false); // Allow retry
      }
    } catch (err) {
      setError('Could not connect to the server to submit results.');
      setShowScore(false); // Allow retry
    }
  };

  const handleManualSubmit = () => {
    setShowScore(true); // Show a submitting state
    submitTest();
  };

  const handleAutoSubmit = () => {
    setShowScore(true);
    submitTest();
  };

  const handleGoToPayment = () => {
    navigate('/payment');
  };

  if (isLoading) {
    console.log('Quiz loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-lavish-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing Test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Quiz error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-rich-black mb-4">Could Not Start Test</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/test-terms')}
            className="w-full px-6 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    console.warn('No questions loaded:', questions);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-rich-black mb-4">No Questions Available</h2>
          <p className="text-gray-600 mb-6">There are no questions available for this test. Please contact support or try again later.</p>
          <button
            onClick={() => navigate('/test-terms')}
            className="w-full px-6 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Go Back
          </button>
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
      {/* Progress Bar and Timer */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <div className="flex-1 mr-4">
          <div className="text-xs font-semibold text-gray-500 mb-1">Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-lavish-gold h-2 rounded-full transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold text-gray-500 mb-1">Time Left</div>
          <div className="text-lg font-bold text-lavish-gold">{formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-gray-400 text-sm mb-2">Question {current + 1} of {questions.length}</div>
        <div className="text-lg font-semibold text-rich-black mb-6">{questions[current].question}</div>
        <div className="space-y-4">
          {Object.entries(questions[current].options).map(([key, value]) => (
            <label
              key={key}
              className={`flex items-center w-full px-4 py-3 rounded-lg border cursor-pointer transition-all
                ${selected[current] === key
                  ? 'bg-lavish-gold/10 border-lavish-gold ring-2 ring-lavish-gold'
                  : 'bg-gray-50 border-gray-300 hover:bg-yellow-50 hover:border-lavish-gold'}
              `}
            >
              <input
                type="radio"
                name={`q${current}`}
                value={key}
                checked={selected[current] === key}
                onChange={() => handleOptionClick(key, current)}
                className="form-radio h-5 w-5 text-lavish-gold focus:ring-lavish-gold mr-4"
              />
              <span className="text-gray-800 text-base">{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={current === 0}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors text-lg
            ${current === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-lavish-gold text-white hover:bg-yellow-600'}`}
        >
          Previous
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-lavish-gold text-white rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleManualSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}