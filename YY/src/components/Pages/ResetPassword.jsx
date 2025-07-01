import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    if (password !== confirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      // Replace with your backend endpoint
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Password reset successful!');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Could not reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffbe6] via-[#fcfaf4] to-[#f7e9c2] py-10 px-2">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-yellow-100">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <img src="/Reset password-cuate.svg" alt="Reset Password" className="w-40 mb-6" />
          <h2 className="text-2xl font-bold text-rich-black mb-2">Reset Password</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4"
              placeholder="Confirm new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full px-5 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow mb-2"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            {message && <div className="text-green-600 font-semibold text-center mt-2">{message}</div>}
            {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
} 