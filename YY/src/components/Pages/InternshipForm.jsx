import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser'; // <- Make sure you installed this: npm install emailjs-com

// ✅ Replace these with your actual values from EmailJS dashboard
const EMAIL_SERVICE_ID = 'service_18u49j8';
const EMAIL_TEMPLATE_ID = 'template_mzfncpp';
const EMAIL_PUBLIC_KEY = 'JXb_IkOBOnGyDn33Y';

const RECIPIENT_EMAIL = 'shiran1431911@gmail.com';

const InternshipForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'backend-error'
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    message: '',
    domain: ''
  });

  const [showTestPopup, setShowTestPopup] = useState(false);

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, navigate]);

  const validateField = (name, value) => {
    const validators = {
      name: { test: (val) => val.trim().length >= 2, message: 'Name must be at least 2 characters long' },
      email: { test: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'Please enter a valid email address' },
      phone: { test: (val) => /^[0-9+\-\s()]{10,15}$/.test(val.replace(/\s/g, '')), message: 'Please enter a valid phone number (10-15 digits)' },
      education: { test: (val) => val.trim().length >= 5, message: 'Please provide your education background' },
      skills: { test: (val) => val.trim().length >= 3, message: 'Please list your relevant skills' },
      domain: { test: (val) => val.trim().length > 0, message: 'Please select a domain' }
    };
    const validator = validators[name];
    if (!validator) return { isValid: true, message: '' };
    return { isValid: validator.test(value), message: validator.test(value) ? '' : validator.message };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);

    if (['name', 'email', 'phone', 'education', 'skills', 'domain'].includes(name)) {
      const validation = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: validation.isValid ? '' : validation.message }));
      const input = e.target;
      input.classList.remove('border-red-400', 'border-green-400', 'border-lavish-gold/30');
      if (value.trim() === '') {
        input.classList.add('border-lavish-gold/30');
      } else if (validation.isValid) {
        input.classList.add('border-green-400');
      } else {
        input.classList.add('border-red-400');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const requiredFields = ['name', 'email', 'phone', 'education', 'skills', 'domain'];
    const validationErrors = {};
    let hasErrors = false;
    requiredFields.forEach((field) => {
      const validation = validateField(field, formData[field]);
      if (!validation.isValid) {
        validationErrors[field] = validation.message;
        hasErrors = true;
      }
    });
    setFieldErrors(validationErrors);

    if (hasErrors) {
      setSubmitStatus('error');
      const firstErrorField = document.querySelector('.border-red-400');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      education: formData.education.trim(),
      experience: formData.experience.trim() || 'None specified',
      skills: formData.skills.trim(),
      domain: formData.domain.trim(),
      message: formData.message.trim() || 'No additional message',
      to_email: RECIPIENT_EMAIL,
      timestamp: new Date().toLocaleString()
    };

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // ✅ This is the correct send() call
      const response = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams,
        EMAIL_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response.status, response.text);

      // Save to your backend
      let backendSaveSuccess = false;
      try {
        const backendRes = await fetch('http://localhost:5000/api/internships', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const backendData = await backendRes.json();
        if (backendRes.ok) {
          backendSaveSuccess = true;
          console.log('Saved to backend:', backendData);
        } else {
          setSubmitStatus('backend-error');
        }
      } catch (error) {
        console.error('Error saving to backend:', error);
        setSubmitStatus('backend-error');
      }

      if (backendSaveSuccess) {
        setFormData({ name: '', email: '', phone: '', education: '', experience: '', skills: '', message: '', domain: '' });
        setFieldErrors({});
        setSubmitStatus('success');
        const inputs = formRef.current.querySelectorAll('input, textarea');
        inputs.forEach((input) => {
          input.classList.remove('border-red-400', 'border-green-400');
          input.classList.add('border-lavish-gold/30');
        });
        setShowTestPopup(true);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatusMessage = () => {
    if (!submitStatus) return null;
    const statusConfig = {
      success: { color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', message: 'Application submitted successfully! Redirecting home...' },
      error: { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', message: 'Please fix the errors above and try again.' },
      'backend-error': { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', message: 'Application could not be saved to our database. Please try again later.' }
    };
    const config = statusConfig[submitStatus];
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
        <ExclamationTriangleIcon className={`h-5 w-5 ${config.color}`} />
        <p className={`text-sm font-medium ${config.color}`}>{config.message}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {showTestPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-rich-black">Do you want to take the YugaYatra test?</h2>
            <p className="mb-6 text-gray-700">This test helps us understand your skills better. Would you like to proceed?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setShowTestPopup(false);
                  navigate('/test-terms');
                }}
                className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold"
              >
                Yes
              </button>
              <button onClick={() => setShowTestPopup(false)} className="px-6 py-2 bg-gray-200 text-rich-black rounded-lg font-semibold">No</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Back to home */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-rich-black mb-2 tracking-tight">Internship Application</h1>
            <p className="text-gray-600 text-lg">Join our team and kickstart your career</p>
          </div>
          <Link to="/" className="group flex items-center gap-2 px-6 py-3 bg-white border border-lavish-gold/30 rounded-xl text-lavish-gold hover:bg-lavish-gold hover:text-white">
            <XMarkIcon className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-lavish-gold/10">
          {/* Form Header */}
          <div className="h-32 w-full bg-gradient-to-r from-[#90A959] via-[#7FA359] to-[#788F5A] relative overflow-hidden">
            <div className="relative h-full flex items-end p-8 pb-6">
              <h2 className="text-white text-3xl font-bold drop-shadow-lg">Apply for Internship</h2>
              <p className="text-white/90 text-sm font-medium">Take the first step towards your future</p>
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <StatusMessage />
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-rich-black border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-rich-black">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                    />
                    {fieldErrors.name && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-rich-black">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@domain.com"
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-rich-black">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., +91 9876543210"
                    className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {fieldErrors.phone}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs">Include country code (e.g., +91 for India)</p>
                </div>
              </div>
              {/* Academic & Professional Section */}
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-semibold text-rich-black border-b border-gray-200 pb-2">
                  Academic & Professional Background
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="education" className="block text-sm font-semibold text-rich-black">
                      Education Background <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="education"
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., B.Tech Computer Science, ABC University, 2024"
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                    />
                    {fieldErrors.education && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {fieldErrors.education}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-sm font-semibold text-rich-black">
                      Previous Experience <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="experience"
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Previous internships, projects, or work experience"
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="skills" className="block text-sm font-semibold text-rich-black">
                      Relevant Skills <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="skills"
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., JavaScript, React, Python, UI/UX Design"
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400"
                    />
                    {fieldErrors.skills && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {fieldErrors.skills}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="domain" className="block text-sm font-semibold text-rich-black">
                      Domain <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300"
                    >
                      <option value="">Select a domain</option>
                      <option value="backend development">Backend Development</option>
                      <option value="content writing">Content Writing</option>
                      <option value="data analysis">Data Analysis</option>
                      <option value="data science">Data Science</option>
                      <option value="devops">DevOps</option>
                      <option value="digital marketing">Digital Marketing</option>
                      <option value="front end development">Front End Development</option>
                      <option value="full stack development">Full Stack Development</option>
                      <option value="hr">HR</option>
                      <option value="machine learning">Machine Learning</option>
                      <option value="mobile development">Mobile Development</option>
                      <option value="ui/ux design">UI/UX Design</option>
                    </select>
                    {fieldErrors.domain && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        {fieldErrors.domain}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Motivation Section */}
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-semibold text-rich-black border-b border-gray-200 pb-2">
                  Tell Us About Yourself
                </h3>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-rich-black">
                    Why do you want to join us?
                    <span className="text-gray-500 font-normal"> (Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Share your motivation, career goals, and what excites you about this opportunity..."
                    className="w-full px-4 py-3 bg-white border border-lavish-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavish-gold/20 focus:border-lavish-gold text-sm transition-all duration-300 placeholder-gray-400 resize-none"
                  />
                </div>
              </div>
              {/* Submit button */}
              <div className="flex justify-end pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative px-8 py-4 bg-gradient-to-r from-[#90A959] to-[#788F5A] text-white font-semibold rounded-xl shadow-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#7FA355] hover:to-[#6F7E4F]'
                  } flex items-center gap-3`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <PaperAirplaneIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Have questions? Contact us at{' '}
            <a href={`mailto:${RECIPIENT_EMAIL}`} className="text-lavish-gold hover:text-primary-orange font-medium">
              {RECIPIENT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipForm;
