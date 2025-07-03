import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestTerms() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-rich-black">YugaYatra Test Terms & Conditions</h1>
        <ul className="list-disc pl-6 mb-4 text-gray-700 text-sm space-y-2">
          <li>The YugaYatra test is designed to assess your skills and suitability for our internship program.</li>
          <li>The test is mandatory for further consideration in the selection process.</li>
          <li>There is a non-refundable charge of <span className="font-bold text-lavish-gold">₹500</span> to take the test.</li>
          <li>By proceeding, you agree to pay the test fee and abide by all test rules and guidelines.</li>
          <li>Any form of malpractice or dishonesty will result in immediate disqualification.</li>
          <li>Test results will be communicated to you via email within 7 working days.</li>
        </ul>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-6 py-2 bg-gray-200 text-rich-black rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
            onClick={() => navigate('/payment')}
          >
            Proceed to Test & Pay ₹500
          </button>
        </div>
      </div>
    </div>
  );
} 