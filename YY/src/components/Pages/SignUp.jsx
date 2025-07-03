import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

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

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    education: '',
    skills: '',
    domain: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Full Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    if (!form.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!form.phone.trim()) errors.phone = 'Phone Number is required';
    if (!form.education.trim()) errors.education = 'Educational details are required';
    if (!form.skills.trim()) errors.skills = 'Skills are required';
    if (!form.domain) errors.domain = 'Please select a domain';
    if (!form.experience) errors.experience = 'Please select your experience';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      // TODO: Update API endpoint and payload as needed
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf4] pt-24 pb-12">
      <div className="w-full max-w-7xl flex rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Sign Up Form */}
        <div className="w-7/12 bg-rich-black text-white px-12 py-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
          <p className="mb-8 text-gray-300">Create your account</p>
          {error && <div className="text-red-400 mb-4">{error}</div>}
          {success && <div className="text-green-400 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name & Email */}
              <div>
                <label className="block text-sm mb-1">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.name} onChange={handleChange} required />
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.email} onChange={handleChange} required />
                {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
              </div>
              {/* Password & Confirm */}
              <div>
                <label className="block text-sm mb-1">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white pr-12"
                    value={form.password}
                    onChange={handleChange}
                    required
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
                {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white pr-12"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                    onClick={() => setShowConfirmPassword(v => !v)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <HiEyeSlash size={22} /> : <HiEye size={22} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p className="text-red-400 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
              </div>
              {/* Phone & Domain */}
              <div>
                <label className="block text-sm mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.phone} onChange={handleChange} required placeholder="e.g., +91 9876543210" />
                {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Domain <span className="text-red-500">*</span></label>
                <select name="domain" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.domain} onChange={handleChange} required>
                  {DOMAIN_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {fieldErrors.domain && <p className="text-red-400 text-xs mt-1">{fieldErrors.domain}</p>}
              </div>
              {/* Education full width */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Educational Details <span className="text-red-500">*</span></label>
                <input type="text" name="education" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.education} onChange={handleChange} required placeholder="e.g., B.Tech, ABC University" />
                {fieldErrors.education && <p className="text-red-400 text-xs mt-1">{fieldErrors.education}</p>}
              </div>
              {/* Skills & Experience */}
              <div>
                <label className="block text-sm mb-1">Skills <span className="text-red-500">*</span></label>
                <input type="text" name="skills" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.skills} onChange={handleChange} required placeholder="e.g., React, Python" />
                {fieldErrors.skills && <p className="text-red-400 text-xs mt-1">{fieldErrors.skills}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Experience <span className="text-red-500">*</span></label>
                <select name="experience" className="w-full px-4 py-2 rounded bg-[#23201a] border border-gray-700 focus:border-lavish-gold focus:outline-none text-white" value={form.experience} onChange={handleChange} required>
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="More than 5 years">More than 5 years</option>
                </select>
                {fieldErrors.experience && <p className="text-red-400 text-xs mt-1">{fieldErrors.experience}</p>}
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded bg-lavish-gold text-white font-semibold hover:bg-yellow-500 transition-colors duration-200" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
          <div className="mt-8 flex justify-between items-center text-sm text-gray-400">
            <span>Already have an account?</span>
            <button onClick={() => navigate('/signin')} className="ml-2 px-4 py-2 rounded bg-gray-800 text-white hover:bg-lavish-gold hover:text-white border border-gray-700 hover:border-lavish-gold transition-colors duration-200">Sign In</button>
          </div>
        </div>
        {/* Right: Welcome Illustration */}
        <div className="w-5/12 bg-gradient-to-br from-[#fffbe6] to-[#e6c97a] flex flex-col justify-center items-center px-16 py-10 border-l border-gray-300/30">
          <h2 className="text-5xl font-extrabold text-rich-black mb-4 leading-tight text-center drop-shadow-sm">Join The Student Portal</h2>
          <p className="text-lg text-rich-black/80 font-medium mb-10 text-center">Start your internship journey with us</p>
          <img src="/signup.svg" alt="Sign Up Illustration" className="w-96 max-w-full" />
        </div>
      </div>
    </div>
  );
} 