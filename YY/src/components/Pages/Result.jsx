import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [attemptsInfo, setAttemptsInfo] = useState(null);

  // Get score and attempts from location state or localStorage
  const score = location.state?.score ?? JSON.parse(localStorage.getItem('lastScore'));
  const total = location.state?.total ?? JSON.parse(localStorage.getItem('lastTotal'));
  const attemptsUsed = location.state?.attempts ?? 1;

  useEffect(() => {
    // Fetch current attempts info
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const studentEmail = localStorage.getItem('studentEmail') || 'test@yugayatra.com';
      const response = await fetch(`http://localhost:5000/api/attempts/${encodeURIComponent(studentEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setAttemptsInfo(data);
      }
    } catch (error) {
      console.error('Error fetching attempts:', error);
    }
  };

  // If no score, show a message
  if (score === undefined || total === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-rich-black mb-4">No Result Found</h2>
          <p className="text-gray-600 mb-6">Please take the test to see your result.</p>
          <button
            onClick={() => navigate('/test')}
            className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Go to Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-rich-black mb-4">Test Result</h2>
        <div className="mb-6">
          <div className="text-5xl font-extrabold text-lavish-gold mb-2">{score} / {total}</div>
          <div className="text-lg text-gray-700 mb-2">Correct Answers: <span className="font-bold text-rich-black">{score}</span></div>
          <div className="text-lg text-gray-700 mb-2">Total Questions: <span className="font-bold text-rich-black">{total}</span></div>
          <div className="text-lg text-gray-700 mb-2">Attempts Used: <span className="font-bold text-lavish-gold">{attemptsUsed}</span></div>
          {attemptsInfo && (
            <div className="text-lg text-gray-700 mb-2">
              Attempts Remaining: <span className={`font-bold ${attemptsInfo.remainingAttempts > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {attemptsInfo.remainingAttempts}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Go to Home
        </button>
        {attemptsInfo && attemptsInfo.remainingAttempts > 0 && (
          <button
            onClick={() => navigate('/test')}
            className="ml-4 px-6 py-2 bg-gray-200 text-rich-black rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Retake Test
          </button>
        )}
      </div>
    </div>
  );
} 