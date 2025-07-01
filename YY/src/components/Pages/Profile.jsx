import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', education: '', experience: '', skills: '', message: '', domain: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [avatar, setAvatar] = useState(null); // for preview
  const [avatarFile, setAvatarFile] = useState(null); // for upload
  const fileInputRef = useRef();
  const email = localStorage.getItem('studentEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setForm({
            name: data.user.name || '',
            phone: data.user.phone || '',
            education: data.user.education || '',
            experience: data.user.experience || '',
            skills: data.user.skills || '',
            message: data.user.message || '',
            domain: data.user.domain || ''
          });
          if (data.user.avatarUrl) setAvatar(data.user.avatarUrl);
        } else {
          setError(data.message || 'User not found');
        }
      } catch (err) {
        setError('Could not fetch user profile.');
      } finally {
        setLoading(false);
      }
    };
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(email)}/results`);
        const data = await res.json();
        if (data.success) setTestResults(data.results);
      } catch {}
    };
    if (email) {
      fetchUser();
      fetchResults();
      setPaymentSuccess(localStorage.getItem('paymentSuccess') === 'true');
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentName');
    localStorage.removeItem('token');
    localStorage.removeItem('paymentSuccess');
    navigate('/');
  };

  const attemptsRemaining = user ? (user.totalAttempts - user.attemptsUsed) : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      let body;
      let headers;
      if (avatarFile) {
        body = new FormData();
        body.append('avatar', avatarFile);
        Object.entries(form).forEach(([k, v]) => body.append(k, v));
        body.append('email', email);
        headers = undefined; // Let browser set multipart
      } else {
        body = JSON.stringify({ ...form, email });
        headers = { 'Content-Type': 'application/json' };
      }
      const res = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers,
        body,
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setSuccess('Profile updated successfully!');
        setEditMode(false);
        setAvatarFile(null);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Could not update profile.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">No user found.</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#fffbe6] via-[#fcfaf4] to-[#f7e9c2] py-10 px-2 mt-24">
      <div className="w-full max-w-6xl min-h-[400px] flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-100">
        {/* Sidebar */}
        <div className="w-96 bg-gradient-to-b from-[#fffbe6] to-[#e6c97a]/40 flex flex-col items-center py-10 px-8 border-r border-yellow-200 relative">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-lavish-gold shadow-lg bg-white flex items-center justify-center overflow-hidden cursor-pointer group" onClick={() => fileInputRef.current.click()}>
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-lavish-gold">{user.name ? user.name.charAt(0).toUpperCase() : <span className="material-icons">person</span>}</span>
              )}
              {/* Camera Icon Overlay */}
              <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-lavish-gold pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5h-15a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 014.5 7.5h2.086a1.5 1.5 0 001.06-.44l1.414-1.414A1.5 1.5 0 0110.086 5.5h3.828a1.5 1.5 0 011.06.44l1.414 1.414a1.5 1.5 0 001.06.44H19.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5z" />
                </svg>
              </div>
            </div>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
          </div>
          <div className="text-2xl font-bold text-rich-black mb-1 font-serif tracking-wide">{user.name}</div>
          <div className="text-gray-700 mb-6">{user.email}</div>
          <div className="w-full bg-white rounded-xl shadow p-5 mb-6 border border-yellow-100">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-base">
                <span className="font-semibold text-rich-black">Attempts Left</span>
                <span className="font-bold text-lavish-gold">{attemptsRemaining}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-rich-black">Payment</span>
                {paymentSuccess ? (
                  <span className="text-green-600 font-bold">Paid</span>
                ) : (
                  <button onClick={() => navigate('/payment')} className="px-3 py-1 bg-lavish-gold text-white rounded font-semibold text-xs hover:bg-yellow-500 transition">Pay Now</button>
                )}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-8 px-10 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition w-full shadow">Logout</button>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-12 min-h-[600px]">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-10">
            <button className={`pb-2 px-2 font-semibold text-xl border-b-2 transition-all duration-200 ${activeTab === 'account' ? 'border-lavish-gold text-rich-black' : 'border-transparent text-gray-400 hover:text-lavish-gold'}`} onClick={() => setActiveTab('account')}>Account Settings</button>
            <button className={`pb-2 px-2 font-semibold text-xl border-b-2 transition-all duration-200 ${activeTab === 'history' ? 'border-lavish-gold text-rich-black' : 'border-transparent text-gray-400 hover:text-lavish-gold'}`} onClick={() => setActiveTab('history')}>Test History</button>
          </div>
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSave}>
              <div>
                <label className="block text-base font-semibold mb-2">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Education</label>
                <input name="education" value={form.education} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Skills</label>
                <input name="skills" value={form.skills} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Domain</label>
                <input name="domain" value={form.domain} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-semibold mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-lavish-gold focus:outline-none text-lg" rows={2} />
              </div>
              <div className="md:col-span-2 flex gap-4 items-center mt-2">
                <button type="submit" className="px-10 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow">Update</button>
                {success && <span className="text-green-600 font-semibold">{success}</span>}
                {error && <span className="text-red-600 font-semibold">{error}</span>}
              </div>
            </form>
          )}
          {/* Test History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow p-8 border border-yellow-100">
              <h3 className="text-2xl font-bold mb-6 text-rich-black">Test History</h3>
              {/* Appear for Test Button */}
              {paymentSuccess && attemptsRemaining > 0 && (
                <button
                  className="mb-6 px-8 py-3 bg-gradient-to-r from-lavish-gold to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow"
                  onClick={() => navigate('/test')}
                >
                  Appear for Test
                </button>
              )}
              {testResults.length === 0 ? (
                <div className="text-gray-500">No test attempts yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 border-b">Date</th>
                      <th className="py-3 px-4 border-b">Domain</th>
                      <th className="py-3 px-4 border-b">Score</th>
                      <th className="py-3 px-4 border-b">Result</th>
                      <th className="py-3 px-4 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.map(r => (
                      <tr key={r._id}>
                        <td className="py-3 px-4 border-b">{r.testDate ? new Date(r.testDate).toLocaleString() : '-'}</td>
                        <td className="py-3 px-4 border-b">{r.domain || '-'}</td>
                        <td className="py-3 px-4 border-b">{r.score} / {r.totalQuestions}</td>
                        <td className="py-3 px-4 border-b">{r.percentage >= 65 ? 'Pass' : 'Fail'}</td>
                        <td className="py-3 px-4 border-b">
                          <a href={`/result/${r._id}`} className="text-blue-600 hover:underline">View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 