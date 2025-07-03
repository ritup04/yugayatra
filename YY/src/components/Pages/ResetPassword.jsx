import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

const API_BASE = 'http://localhost:5000';

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: email+password, 2: code, 3: success
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 1) {
      setPassword('');
      setConfirm('');
    }
  }, [step]);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setUserNotFound(false);
    if (!email || !password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // Check if user exists
      const userRes = await fetch(`${API_BASE}/api/user/${encodeURIComponent(email)}`);
      if (!userRes.ok) {
        setUserNotFound(true);
        setError('User does not exist. Please sign up to get started.');
        setMessage('');
        setLoading(false);
        return;
      }
      const userData = await userRes.json();
      if (!userData.success || !userData.user) {
        setUserNotFound(true);
        setError('User does not exist. Please sign up to get started.');
        setMessage('');
        setLoading(false);
        return;
      }
      // Proceed to send reset code
      const res = await fetch(`${API_BASE}/api/auth/request-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('A verification code has been sent to your email.');
        setError('');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send reset code.');
        setMessage('');
      }
    } catch (err) {
      setError('Could not send reset code. Please check your connection or try again later.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }
    setLoading(true);
    try {
      // Verify code first
      const verifyRes = await fetch(`${API_BASE}/api/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setError(verifyData.message || 'Invalid or expired code.');
        setLoading(false);
        return;
      }
      // Update password
      const updateRes = await fetch(`${API_BASE}/api/auth/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });
      const updateData = await updateRes.json();
      if (updateData.success) {
        setMessage('Password reset successful! Redirecting to login...');
        setStep(3);
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(updateData.message || 'Failed to reset password.');
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
          {step === 1 && (
            <form className="w-full" onSubmit={handleRequestCode}>
              <input
                type="email"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg"
                  placeholder="New password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <HiEyeSlash size={22} /> : <HiEye size={22} />}
                </button>
              </div>
              <div className="relative mb-4">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <HiEyeSlash size={22} /> : <HiEye size={22} />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow mb-2"
                disabled={loading}
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </button>
              {message && <div className="text-green-600 font-semibold text-center mt-2">{message}</div>}
              {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
              {userNotFound && error === 'User does not exist. Please sign up to get started.' && (
                <div className="text-center mt-2">
                  <span className="text-gray-700">Don't have an account?</span>
                  <button className="ml-2 text-lavish-gold font-semibold hover:underline" onClick={() => navigate('/signup')}>Sign up</button>
                </div>
              )}
            </form>
          )}
          {step === 2 && (
            <form className="w-full" onSubmit={handleVerifyAndReset}>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg mb-4 tracking-widest text-center"
                placeholder="Enter verification code"
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
                {loading ? 'Verifying...' : 'Verify & Reset Password'}
              </button>
              {message && <div className="text-green-600 font-semibold text-center mt-2">{message}</div>}
              {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
            </form>
          )}
          {step === 3 && (
            <div className="text-green-600 font-semibold text-center mt-4">{message}</div>
          )}
          <button className="mt-4 text-lavish-gold font-semibold hover:underline" onClick={() => navigate('/signin')}>Back to Sign In</button>
        </div>
      </div>
    </div>
  );
} 