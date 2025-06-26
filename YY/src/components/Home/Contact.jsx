import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ArrowLeft } from 'lucide-react';

export default function Contact() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("Sending....");
    
    const submitData = new FormData();
    submitData.append("access_key", "95b2cac6-9e86-4f6d-a5af-a8a22b2a5d2c");
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("subject", formData.subject);
    submitData.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! 🎉");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    // In your actual app, this would be replaced with your router navigation
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-9">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 hover:bg-white text-amber-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Let's Connect</h1>
          <p className="text-gray-600 text-lg">We'd love to hear from you</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Contact Form */}
            <div className="lg:col-span-2 p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Send className="text-amber-600" size={24} />
                Send us a message
              </h2>
              
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 hover:bg-white"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  onClick={onSubmit}
                  disabled={isLoading || !formData.name || !formData.email || !formData.message}
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
              
              {result && (
                <div className={`mt-4 p-3 rounded-xl text-center text-sm font-medium ${
                  result.includes('successfully') || result.includes('🎉')
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : result.includes('Sending')
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {result}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/70 p-3 rounded-xl shadow-sm">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Address</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Electronic City, Phase 1<br />
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/70 p-3 rounded-xl shadow-sm">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Email</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      info@yugayatra.com<br />
                      support@yugayatra.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/70 p-3 rounded-xl shadow-sm">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Phone</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      +91 8757728679<br />
                      +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/70 p-3 rounded-xl shadow-sm">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Business Hours</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-white/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/40 rounded-xl p-3">
                    <div className="text-lg font-bold text-amber-700">24h</div>
                    <div className="text-xs text-gray-600">Response Time</div>
                  </div>
                  <div className="bg-white/40 rounded-xl p-3">
                    <div className="text-lg font-bold text-amber-700">100%</div>
                    <div className="text-xs text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}