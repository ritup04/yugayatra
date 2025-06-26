import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestTerms() {
  const navigate = useNavigate();
  const [showDummyPayment, setShowDummyPayment] = useState(false);
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
            onClick={() => setShowDummyPayment(true)}
          >
            Proceed to Test & Pay ₹500
          </button>
        </div>
      </div>
      {showDummyPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-rich-black">Dummy Payment Gateway</h2>
            <p className="mb-6 text-gray-700">This is a dummy payment gateway.<br/>Payment successful!</p>
            <button
              className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
              onClick={() => navigate('/test')}
            >
              Proceed to Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 