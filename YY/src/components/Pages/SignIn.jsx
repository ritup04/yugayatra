import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiLogIn, FiKey } from 'react-icons/fi';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentEmail', data.user.email);
        localStorage.setItem('studentName', data.user.name);
        navigate('/profile');
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (err) {
      setError('Could not sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf4]">
      <div className="w-full max-w-7xl flex rounded-2xl shadow-2xl overflow-hidden animate-fadeinup">
        {/* Left: Login Form */}
        <div className="w-1/2 bg-rich-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="mb-8 text-gray-300">Enter your account details</p>
          {error && <div className="text-red-400 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute left-0 top-0 h-full flex items-center">
                <span className="flex items-center justify-center h-12 w-12 rounded-l-xl bg-lavish-gold/20 text-lavish-gold">
                  <FiUser size={22} />
                </span>
              </div>
              <input
                type="email"
                id="login-email"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-700 bg-rich-black text-white text-lg placeholder-transparent focus:border-lavish-gold focus:ring-2 focus:ring-lavish-gold/20 focus:outline-none transition-all duration-300 peer shadow-lg"
              />
              <label
                htmlFor="login-email"
                className={`absolute left-14 top-1/2 -translate-y-1/2 text-lg text-white pointer-events-none transition-all duration-300 bg-rich-black px-1
                  peer-focus:-top-2 peer-focus:text-base peer-focus:text-lavish-gold peer-focus:bg-rich-black
                  ${email ? '-top-2 text-base text-lavish-gold bg-rich-black' : ''}`}
                style={{fontWeight: 700, letterSpacing: '0.01em'}}
              >
                Email
              </label>
            </div>
            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-0 top-0 h-full flex items-center">
                <span className="flex items-center justify-center h-12 w-12 rounded-l-xl bg-lavish-gold/20 text-lavish-gold">
                  <FiLock size={22} />
                </span>
              </div>
              <input
                type="password"
                id="login-password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-700 bg-rich-black text-white text-lg placeholder-transparent focus:border-lavish-gold focus:ring-2 focus:ring-lavish-gold/20 focus:outline-none transition-all duration-300 peer shadow-lg"
              />
              <label
                htmlFor="login-password"
                className={`absolute left-14 top-1/2 -translate-y-1/2 text-lg text-white pointer-events-none transition-all duration-300 bg-rich-black px-1
                  peer-focus:-top-2 peer-focus:text-base peer-focus:text-lavish-gold peer-focus:bg-rich-black
                  ${password ? '-top-2 text-base text-lavish-gold bg-rich-black' : ''}`}
                style={{fontWeight: 700, letterSpacing: '0.01em'}}
              >
                Password
              </label>
            </div>
            <div className="flex justify-between items-center text-sm">
              <button type="button" className="flex items-center gap-1 text-lavish-gold hover:underline" onClick={() => navigate('/forgot-password')}>
                <FiKey className="inline-block mb-0.5" /> Forgot Password?
              </button>
            </div>
            <button type="submit" className="w-full py-3 rounded bg-lavish-gold text-white font-semibold hover:bg-yellow-500 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <FiLogIn className="animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  <FiLogIn /> Login
                </>
              )}
            </button>
          </form>
          <div className="mt-8 flex justify-between items-center text-sm text-gray-400">
            <span>Don't have an account?</span>
            <button onClick={() => navigate('/signup')} className="ml-2 px-4 py-2 rounded bg-gray-800 text-white hover:bg-lavish-gold hover:text-white border border-gray-700 hover:border-lavish-gold transition-colors duration-200">Sign up</button>
          </div>
        </div>
        {/* Right: Welcome Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#fffbe6] to-[#e6c97a] flex flex-col justify-center items-center p-10">
          <h2 className="text-5xl font-extrabold text-rich-black mb-4 leading-tight text-center drop-shadow-sm">Welcome Back!</h2>
          <p className="text-lg text-rich-black/80 font-medium mb-10 text-center">Login to access your account</p>
          <img src="/login.svg" alt="Login Illustration" className="w-96 max-w-full" />
        </div>
      </div>
    </div>
  );
} 