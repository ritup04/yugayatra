import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Test() {
  const navigate = useNavigate();
  const [hasPayment, setHasPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [attemptsInfo, setAttemptsInfo] = useState(null);
  const [attemptsLoading, setAttemptsLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
    setIsLoading(false);
  }, []);

  const fetchAttempts = async () => {
    try {
      const studentEmail = localStorage.getItem('studentEmail') || 'test@yugayatra.com';
      const response = await fetch(`http://localhost:5000/api/attempts/${encodeURIComponent(studentEmail)}`);
      const data = await response.json();
      if (data.success) {
        setAttemptsInfo(data);
        setHasPayment(data.paymentStatus === 'Paid');
      } else {
        setAttemptsInfo({
          attemptsUsed: 0,
          totalAttempts: 5,
          remainingAttempts: 5,
          paymentStatus: 'Not Paid'
        });
        setHasPayment(false);
      }
    } catch (error) {
      setAttemptsInfo({
        attemptsUsed: 0,
        totalAttempts: 5,
        remainingAttempts: 5,
        paymentStatus: 'Not Paid'
      });
      setHasPayment(false);
    } finally {
      setAttemptsLoading(false);
    }
  };

  const handleStartTest = () => {
    if (!domain) {
      setError('Please select your domain to proceed.');
      return;
    }
    
    if (attemptsInfo && attemptsInfo.remainingAttempts <= 0) {
      setError('You have used all your attempts. Please contact support for more attempts.');
      return;
    }
    
    localStorage.setItem('testDomain', domain);
    navigate('/quiz');
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-rich-black mb-6">YugaYatra Internship Test</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-rich-black mb-4">Test Instructions</h2>
          <ul className="text-left text-gray-700 space-y-2 mb-6">
            <li>• The test consists of 10 multiple-choice questions</li>
            <li>• You have unlimited time to complete the test</li>
            <li>• You can navigate between questions using the sidebar</li>
            <li>• Once you select an answer, it cannot be changed</li>
            <li>• Your score will be displayed after completion</li>
          </ul>
          
          {/* Attempts Information */}
          {!attemptsLoading && attemptsInfo && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-left">
                <h3 className="font-semibold text-blue-800 mb-2">Your Attempts</h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">
                    Attempts Used: <strong>{attemptsInfo.attemptsUsed}</strong> / {attemptsInfo.totalAttempts}
                  </span>
                  <span className={`font-bold ${attemptsInfo.remainingAttempts > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Remaining: {attemptsInfo.remainingAttempts}
                  </span>
                </div>
                {attemptsInfo.remainingAttempts <= 0 && (
                  <p className="text-red-600 text-sm mt-2">
                    You have used all your attempts. Please contact support for more attempts.
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Domain Selection */}
          <div className="mb-6">
            <label htmlFor="domain" className="block text-sm font-semibold text-gray-700 mb-2 text-left">Select your domain:</label>
            <select
              id="domain"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lavish-gold text-lg"
              value={domain}
              onChange={(e) => { setDomain(e.target.value); setError(''); }}
              disabled={attemptsInfo && attemptsInfo.remainingAttempts <= 0}
            >
              <option value="">-- Select Domain --</option>
              <option value="backend development">Backend Development</option>
              <option value="content writing">Content Writing</option>
              <option value="data analysis">Data Analysis</option>
              <option value="data science">Data Science</option>
              <option value="devops">DevOps</option>
              <option value="digital marketing">Digital Marketing</option>
              <option value="front end development">Front End Development</option>
              <option value="full stack development">Full Stack Development</option>
              <option value="hr">HR</option>
              <option value="machine learning">Machine Learning</option>
              <option value="mobile development">Mobile Development</option>
              <option value="ui/ux design">UI/UX Design</option>
            </select>
            {error && <div className="text-red-600 text-sm mt-2 text-left">{error}</div>}
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Payment Verified:</strong> Your payment of ₹500 has been confirmed. You can now proceed to take the test.
            </p>
          </div>
        </div>
        <button
          onClick={handleStartTest}
          className="px-8 py-3 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!domain || (attemptsInfo && attemptsInfo.remainingAttempts <= 0)}
        >
          Start Test
        </button>
      </div>
    </div>
  );
} 