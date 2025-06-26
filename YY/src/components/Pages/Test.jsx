import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const handleStartTest = () => {
    if (!domain) {
      setError('Please select your domain to proceed.');
      return;
    }
    // You can pass the domain to the test page via state or params if needed
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-rich-black">Final Test Instructions</h1>
        <ul className="list-disc pl-6 mb-4 text-gray-700 text-sm text-left space-y-2">
          <li>The test duration is <span className="font-bold">30 minutes</span>.</li>
          <li>You will be presented with <span className="font-bold">10 questions</span> based on your selected domain.</li>
          <li>Once you start, the timer cannot be paused.</li>
          <li>Make sure you have a stable internet connection before starting.</li>
        </ul>
        <div className="mb-4 text-left">
          <label htmlFor="domain" className="block text-sm font-semibold text-rich-black mb-1">
            Please select your domain again <span className="text-red-500">*</span>
          </label>
          <select
            id="domain"
            name="domain"
            value={domain}
            onChange={e => { setDomain(e.target.value); setError(''); }}
            required
            className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300"
          >
            <option value="">Select a domain</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="HR">HR</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Other">Other</option>
          </select>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button
          className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition mt-4"
          onClick={handleStartTest}
        >
          Start Test
        </button>
      </div>
    </div>
  );
} 