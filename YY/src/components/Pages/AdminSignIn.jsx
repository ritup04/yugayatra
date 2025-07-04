import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function AdminSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 px-16 py-14 rounded-[2.5rem] shadow-2xl max-w-xl w-full border border-yellow-100 animate-fade-in-up"
        style={{
          animation: 'fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <h2 className="text-4xl font-extrabold mb-10 text-center text-yellow-700 tracking-tight flex items-center justify-center gap-3">
          <LockClosedIcon className="w-10 h-10 text-yellow-500" />
          Admin Sign In
        </h2>
        {error && <div className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4 text-center font-semibold text-lg">{error}</div>}
        <div className="mb-8">
          <label className="block mb-2 font-bold text-yellow-700 text-lg">Username</label>
          <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-300">
            <UserIcon className="w-6 h-6 text-yellow-400 mr-3" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-lg text-yellow-900 placeholder-gray-400"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="Enter your admin username"
            />
          </div>
        </div>
        <div className="mb-10">
          <label className="block mb-2 font-bold text-yellow-700 text-lg">Password</label>
          <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-300">
            <LockClosedIcon className="w-6 h-6 text-yellow-400 mr-3" />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-lg text-yellow-900 placeholder-gray-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-2xl font-bold text-2xl shadow-lg transition-colors duration-200 tracking-wide"
        >
          Sign In
        </button>
      </form>
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </div>
  );
} 