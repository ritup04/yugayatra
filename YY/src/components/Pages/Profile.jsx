import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiBook, FiBriefcase, FiAward, FiLayers, FiMessageCircle, FiKey, FiLogOut, FiCreditCard, FiRefreshCw } from 'react-icons/fi';
import { useRef as useReactRef } from 'react';

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
  const fileInputRef = useReactRef();
  const email = localStorage.getItem('studentEmail');
  const navigate = useNavigate();

  // Change Password Section State
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Domain options for dropdown
  const DOMAIN_OPTIONS = [
    { value: '', label: 'Select a domain' },
    { value: 'backend development', label: 'Backend Development' },
    { value: 'content writing', label: 'Content Writing' },
    { value: 'data analysis', label: 'Data Analysis' },
    { value: 'data science', label: 'Data Science' },
    { value: 'devops', label: 'DevOps' },
    { value: 'digital marketing', label: 'Digital Marketing' },
    { value: 'front end development', label: 'Front End Development' },
    { value: 'full stack development', label: 'Full Stack Development' },
    { value: 'hr', label: 'HR' },
    { value: 'machine learning', label: 'Machine Learning' },
    { value: 'mobile development', label: 'Mobile Development' },
    { value: 'ui/ux design', label: 'UI/UX Design' },
  ];

  const [animate, setAnimate] = useState(false);

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

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.message || 'Failed to change password.');
      }
    } catch (err) {
      setPasswordError('Could not change password.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">No user found.</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfaf4] py-4 px-2 font-sans">
      <div
        className={`w-full max-w-7xl min-h-[300px] flex bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Sidebar */}
        <div className={`w-96 bg-[#f7e7b3] shadow-xl border-r border-gray-100 flex flex-col items-center py-10 px-8 relative transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-6 group">
            <div className="w-32 h-32 rounded-full border-4 border-[#e3b23c] shadow-lg bg-white flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-300 group-hover:scale-110" onClick={() => fileInputRef.current.click()}>
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl text-[#e3b23c] flex items-center justify-center w-full h-full"><FiUser /></span>
              )}
              {/* Camera Icon Overlay */}
              <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md flex items-center justify-center border border-[#e3b23c] group-hover:bg-yellow-100 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#e3b23c] pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5h-15a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 014.5 7.5h2.086a1.5 1.5 0 001.06-.44l1.414-1.414A1.5 1.5 0 0110.086 5.5h3.828a1.5 1.5 0 011.06.44l1.414 1.414a1.5 1.5 0 001.06.44H19.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5z" />
                </svg>
              </div>
            </div>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
          </div>
          <div className="text-2xl font-extrabold text-[#3a2e19] mb-1 font-serif tracking-wide transition-all duration-700 delay-200" style={{opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(20px)'}}> {user.name} </div>
          <div className="text-[#3a2e19] mb-4 text-base transition-all duration-700 delay-300" style={{opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(20px)'}}>{user.email}</div>
          <div className="w-full bg-[#fafbfc] rounded-xl shadow-lg p-5 mb-6 border border-gray-200 transition-all duration-700 delay-400" style={{opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(20px)'}}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-base">
                <span className="font-semibold text-[#e3b23c]">Attempts Left</span>
                <span className={`font-bold ${attemptsRemaining >= 1 && attemptsRemaining <= 5 ? 'text-green-400' : 'text-red-400'}`}>{attemptsRemaining}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-[#e3b23c]">Payment</span>
                {user?.paymentStatus === 'Paid' ? (
                  <span style={{ color: 'green', fontWeight: 'bold', marginLeft: 8 }}>Paid</span>
                ) : (
                  <button onClick={() => navigate('/payment')} className="ripple-btn px-4 py-1 bg-[#e3b23c] text-[#3a2e19] rounded font-semibold text-xs hover:bg-yellow-600 transition flex items-center gap-1 scale-100 hover:scale-105 focus:scale-105 active:scale-95 duration-200"><FiCreditCard />Pay Now</button>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="ripple-btn mb-3 px-10 py-3 bg-[#e3b23c] text-[#3a2e19] rounded-lg font-semibold hover:bg-yellow-600 transition-all shadow flex items-center gap-2 scale-100 hover:scale-105 focus:scale-105 active:scale-95 duration-200"
            onClick={() => navigate('/reset-password')}
          >
            <FiKey className="inline-block text-[#3a2e19]" />
            Reset Password
          </button>
          <button onClick={handleLogout} className="ripple-btn px-10 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition w-full shadow flex items-center gap-2 scale-100 hover:scale-105 focus:scale-105 active:scale-95 duration-200">
            <FiLogOut className="inline-block text-white" />
            Logout
          </button>
        </div>
        {/* Main Content */}
        <div className={`flex-1 flex flex-col p-10 min-h-[300px] bg-white transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button className={`pb-2 px-2 font-semibold text-2xl border-b-2 transition-all duration-300 ${activeTab === 'account' ? 'border-yellow-500 text-gray-800 tab-underline' : 'border-transparent text-gray-400 hover:text-yellow-600'}`} onClick={() => setActiveTab('account')}>Account Settings</button>
            <button className={`pb-2 px-2 font-semibold text-2xl border-b-2 transition-all duration-300 ${activeTab === 'history' ? 'border-yellow-500 text-gray-800 tab-underline' : 'border-transparent text-gray-400 hover:text-yellow-600'}`} onClick={() => setActiveTab('history')}>Test History</button>
          </div>
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSave}>
                <div>
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiUser className="mr-2 text-yellow-500" /> Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow placeholder-gray-400 bg-[#fafbfc] transition-all duration-700 delay-100 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiPhone className="mr-2 text-yellow-500" /> Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow placeholder-gray-400 bg-[#fafbfc] transition-all duration-700 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} placeholder="Enter your phone number" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiBook className="mr-2 text-yellow-500" /> Education</label>
                  <input name="education" value={form.education} onChange={handleChange} className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow placeholder-gray-400 bg-[#fafbfc] transition-all duration-700 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} placeholder="Your education" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiAward className="mr-2 text-yellow-500" /> Skills</label>
                  <input name="skills" value={form.skills} onChange={handleChange} className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow placeholder-gray-400 bg-[#fafbfc] transition-all duration-700 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} placeholder="Your skills" />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiBriefcase className="mr-2 text-yellow-500" /> Experience</label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow bg-[#fafbfc] transition-all duration-700 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="More than 5 years">More than 5 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2 flex items-center text-gray-800"><FiLayers className="mr-2 text-yellow-500" /> Domain</label>
                  <select
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none text-lg shadow bg-[#fafbfc] transition-all duration-700 delay-600 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    {DOMAIN_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 flex gap-4 items-center mt-2">
                  <button type="submit" className={`px-10 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-500 transition-all shadow flex items-center gap-2 scale-100 hover:scale-105 focus:scale-105 active:scale-95 duration-200 transition-all duration-700 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <FiRefreshCw className="inline-block text-white" />
                    Update
                  </button>
                  {success && <span className="text-green-600 font-semibold">{success}</span>}
                  {error && <span className="text-red-600 font-semibold">{error}</span>}
                </div>
              </form>
            </>
          )}
          {/* Test History Tab */}
          {activeTab === 'history' && (
            <div className="bg-[#fafbfc] rounded-xl shadow p-8 border border-gray-200">
              <h3 className="text-2xl font-extrabold mb-6 text-gray-800 font-serif">Test History</h3>
              {/* Payment or Appear for Test Button */}
              {user.paymentStatus !== 'Paid' ? (
                <div className="mb-6 flex flex-col gap-2">
                  <button
                    className="w-fit px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-500 transition-all shadow flex items-center gap-2"
                    onClick={() => navigate('/payment')}
                  >
                    <FiCreditCard className="inline-block text-white" />
                    Pay Now
                  </button>
                  <span className="text-red-600 font-semibold">You need to make the payment first to appear for the test.</span>
                </div>
              ) : (
                user.paymentStatus === 'Paid' && attemptsRemaining >= 1 && attemptsRemaining <= 5 && (
                  <button
                    className="mb-6 px-10 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-500 transition-all shadow flex items-center gap-2"
                    onClick={() => navigate('/test')}
                  >
                    <FiRefreshCw className="inline-block text-white" />
                    Appear for Test
                  </button>
                )
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
      <style>
        {`
        .tab-underline {
          position: relative;
        }
        .tab-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: #e3b23c;
          border-radius: 2px;
          transform: scaleX(1);
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .ripple-btn {
          position: relative;
          overflow: hidden;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(0,0,0,0.15);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
}

// Ripple effect handler
function handleButtonRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
} 