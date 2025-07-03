import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer]);

  useEffect(() => {
    setTimer(60);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Verification successful! Redirecting...');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(data.message || 'Invalid code.');
      }
    } catch (err) {
      setError('Could not verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('A new verification code has been sent to your email.');
        setTimer(60); // Start 1-minute timer
      } else {
        setError(data.message || 'Failed to resend code.');
      }
    } catch (err) {
      setError('Could not resend code. Please try again.');
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
          {timer > 0 ? (
            <div className="mt-4 text-gray-400 font-semibold">Resend Code available in {timer}s</div>
          ) : (
            <button
              className="mt-4 text-lavish-gold font-semibold hover:underline"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 