import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Registration successful! Please sign in.');
        setTimeout(() => navigate('/signin'), 1500);
      } else {
        setError(data.message || 'Sign up failed');
      }
    } catch (err) {
      setError('Could not sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf4]">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Sign Up Form */}
        <div className="w-1/2 bg-rich-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
          <p className="mb-8 text-gray-300">Create your account</p>
          {error && <div className="text-red-400 mb-4">{error}</div>}
          {success && <div className="text-green-400 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input type="password" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full py-3 rounded bg-lavish-gold text-white font-semibold hover:bg-yellow-500 transition-colors duration-200" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
          <div className="mt-8 flex justify-between items-center text-sm text-gray-400">
            <span>Already have an account?</span>
            <button onClick={() => navigate('/signin')} className="ml-2 px-4 py-2 rounded bg-gray-800 text-white hover:bg-lavish-gold hover:text-white border border-gray-700 hover:border-lavish-gold transition-colors duration-200">Sign In</button>
          </div>
        </div>
        {/* Right: Welcome Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#fffbe6] to-[#e6c97a] flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-rich-black mb-2">Join the<br />student portal</h2>
          <p className="text-rich-black/80 mb-8">Sign up to get started</p>
          <img src="/signup.svg" alt="Sign Up Illustration" className="w-72 max-w-full" />
        </div>
      </div>
    </div>
  );
} 