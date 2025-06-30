import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const PASS_PERCENTAGE = 65;

export default function Result() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!resultId) {
      setError('No result ID found.');
      setIsLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/test-results/${resultId}`);
        const data = await response.json();
        if (data.success) {
          setResult(data.record);
        } else {
          setError(data.message || 'Failed to fetch result.');
        }
      } catch (err) {
        setError('Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-lavish-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-lavish-gold text-white rounded-lg">Go Home</button>
        </div>
      </div>
    );
  }

  if (!result) {
    return null; // Or a more specific 'not found' component
  }

  const isPass = result.percentage >= PASS_PERCENTAGE;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className={`text-center bg-white rounded-2xl shadow-xl p-8 mb-8`}>
          {isPass ? (
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
          )}
          <h1 className="text-4xl font-extrabold text-rich-black mb-2">
            Test {isPass ? 'Passed' : 'Failed'}
          </h1>
          <p className={`text-xl font-semibold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
            You needed {PASS_PERCENTAGE}% to pass.
          </p>
          <div className="mt-6 flex justify-center items-center space-x-8 text-rich-black">
            <div className="text-center">
              <div className="text-4xl font-bold">{result.percentage}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{result.score}/{result.totalQuestions}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>
           <div className="mt-8">
              <Link to="/" className="px-8 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition">
                Go to Homepage
              </Link>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-rich-black mb-6">Question Review</h2>
          <div className="space-y-6">
            {result.questions.map((q, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${q.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <p className="font-semibold text-rich-black mb-2">{index + 1}. {q.question}</p>
                <div className="space-y-1 text-sm">
                  {Object.entries(q.options).map(([key, value]) => (
                    <p key={key} className={`
                      ${q.selectedOption === key && !q.isCorrect ? 'text-red-700 font-semibold' : ''}
                      ${key === q.correctAnswer ? 'text-green-700 font-semibold' : ''}
                    `}>
                      {key.toUpperCase()}: {value}
                      {key === q.correctAnswer && <span className="ml-2 text-green-700">(Correct Answer)</span>}
                      {q.selectedOption === key && !q.isCorrect && <span className="ml-2 text-red-700">(Your Answer)</span>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 