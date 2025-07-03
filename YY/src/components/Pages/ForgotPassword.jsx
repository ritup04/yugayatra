import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      // Replace with your backend endpoint
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Password reset link sent to your email.');
        setTimeout(() => navigate('/reset-password'), 1000);
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('Could not send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffbe6] via-[#fcfaf4] to-[#f7e9c2] py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-yellow-100">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <img src="/forgotpwd.svg" alt="Forgot Password" className="w-40 mb-6" />
          <h2 className="text-2xl font-bold text-rich-black mb-2">Forgot Password?</h2>
          <p className="text-gray-600 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full px-5 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow mb-2"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Proceed to Reset Password'}
            </button>
            {message && <div className="text-green-600 font-semibold text-center mt-2">{message}</div>}
            {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
          </form>
          <button className="mt-4 text-lavish-gold font-semibold hover:underline" onClick={() => navigate('/signin')}>Back to Sign In</button>
        </div>
      </div>
    </div>
  );
} 