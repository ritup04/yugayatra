import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    message: ''
  });
  const studentEmail = typeof window !== 'undefined' ? localStorage.getItem('studentEmail') : null;
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Event listener for opening the form from other components
    const handleOpenInternshipForm = () => {
      setIsFormOpen(true);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Only add event listener if nav element exists
    const navElement = document.querySelector('nav');
    if (navElement) {
      navElement.addEventListener('openInternshipForm', handleOpenInternshipForm);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navElement) {
        navElement.removeEventListener('openInternshipForm', handleOpenInternshipForm);
      }
    };
  }, []);

  // Define navigation links based on current location
  const navLinks = [
    { title: 'Home', href: isHomePage ? '#' : '/' },
    { title: 'Services', href: isHomePage ? '#services' : '/#services' },
    { title: 'About', href: isHomePage ? '#about' : '/#about' },
    { title: 'Blog', href: isHomePage ? '#blog' : '/#blog' },
    { title: 'Achievements', href: isHomePage ? '#achievements' : '/#achievements' },
    { title: 'Alumni', href: isHomePage ? '#alumni' : '/#alumni' },
    { title: 'Contact', href: '/contact' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = 'service_t8keicp'; // Your EmailJS Service ID
    const templateID = 'template_i2l0nqs'; // Replace with your actual EmailJS Template ID
    const userID = '9k7OVUepP2PsEsXaA'; // Replace with your actual EmailJS Public Key

    // Prepare the template parameters (form data to be sent in the email)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      message: formData.message,
      to_email: 'yugayatra@gmail.com' // Add recipient email
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        // Reset form and close modal
        setFormData({
          name: '',
          email: '',
          phone: '',
          education: '',
          experience: '',
          skills: '',
          message: ''
        });
        setIsFormOpen(false);
        alert('Thank you for your application! We will contact you soon.');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('There was an error submitting your application. Please try again later.');
      });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/vite.svg"
                alt="YugaYatra Logo"
                width="40"
                height="40"
                className="inline-block mr-2 transform hover:scale-105 transition-transform duration-300 object-contain"
                style={{ clipPath: 'circle(45%)' }}  // This will crop the logo into a circle
              />
              <span className="text-xl font-bold text-gradient">YugaYatra</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.href.startsWith('#') ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium"
                >
                  {link.title}
                </a>
              ) : link.href.includes('#') ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium"
                >
                  {link.title}
                </Link>
              )
            ))}
            <Link to="/internship-application" className="modern-button">
              Apply for Internship
            </Link>
            <Link to="/admin" className="text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-300">
              Admin
            </Link>
            {studentEmail && (
              <Link to="/profile" className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium">
                Profile
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-rich-black focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} py-4 transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col space-y-4 bg-white/80 backdrop-blur-md p-4 rounded-lg">
            {navLinks.map((link, index) => (
              link.href.startsWith('#') ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ) : link.href.includes('#') ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium py-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )
            ))}
            <Link
              to="/internship-application"
              className="modern-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply for Internship
            </Link>
            <Link
              to="/admin"
              className="text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
            {studentEmail && (
              <Link
                to="/profile"
                className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Internship Application Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-lavish-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-24 w-full bg-gradient-to-r from-[#90A959] to-[#788F5A] relative">
              <h2 className="text-white text-2xl font-bold absolute bottom-6 left-8">Internship Application</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="pt-8 pb-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-rich-black mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-rich-black mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-black mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-black mb-1">Education Background *</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    placeholder="Degree, Institution, Year"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-black mb-1">Experience (if any)</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    placeholder="Previous internships or work experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-black mb-1">Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    placeholder="Relevant skills for the internship"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rich-black mb-1">Why do you want to join us?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 bg-white border border-lavish-gold/30 rounded-lg focus:outline-none focus:border-lavish-gold text-sm transition-all duration-300"
                    placeholder="Tell us why you're interested in interning with us"
                  ></textarea>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="modern-button">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;