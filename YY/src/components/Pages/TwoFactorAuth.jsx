import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      // Replace with your backend endpoint
      const res = await fetch('http://localhost:5000/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Verification successful!');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setError(data.message || 'Invalid code.');
      }
    } catch (err) {
      setError('Could not verify code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setMessage('');
    try {
      // Replace with your backend endpoint
      const res = await fetch('http://localhost:5000/api/auth/resend-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Code resent to your email.');
      } else {
        setError(data.message || 'Failed to resend code.');
      }
    } catch (err) {
      setError('Could not resend code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffbe6] via-[#fcfaf4] to-[#f7e9c2] py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-yellow-100">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <img src="/Two factor authentication-pana.svg" alt="2FA" className="w-40 mb-6" />
          <h2 className="text-2xl font-bold text-rich-black mb-2">Two Factor Authentication</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4 tracking-widest text-center"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
            />
            <button
              type="submit"
              className="w-full px-5 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow mb-2"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            {message && <div className="text-green-600 font-semibold text-center mt-2">{message}</div>}
            {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
          </form>
          <button
            className="mt-4 text-lavish-gold font-semibold hover:underline"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Resending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
} 