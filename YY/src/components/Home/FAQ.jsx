import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const searchRef = useRef(null);

  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: 'What services does YugaYatra offer?',
      answer: 'YugaYatra offers a comprehensive range of digital services including website development, digital marketing, social media management, content development, AI training, graphic designing, Instagram management, Meta ads promotion, sales funnels, e-commerce solutions, Amazon and Flipkart seller account management, and product photography.'
    },
    {
      id: 2,
      question: 'How can I apply for an internship at YugaYatra?',
      answer: 'You can apply for an internship by clicking the "Apply for Internship" button in the navigation bar. Fill out the application form with your details, education, experience, and skills, and our team will review your application.'
    },
    {
      id: 3,
      question: 'What is the duration of your internship programs?',
      answer: 'Our internship programs typically range from 1-2 months, depending on the specific program and department. Each program is designed to provide comprehensive hands-on experience in the respective field.'
    },
    {
      id: 4,
      question: 'Do you offer remote work options?',
      answer: 'Yes, we offer only remote work options for many of our positions, including internships. The availability of remote work depends on the specific role and department requirements.'
    },
    {
      id: 5,
      question: 'How do I request a quote for your services?',
      answer: 'You can request a quote by contacting us through our website, email, or phone. Provide details about your project requirements, and our team will get back to you with a customized quote based on your specific needs.'
    },
    {
      id: 6,
      question: 'What is your approach to digital marketing?',
      answer: 'Our approach to digital marketing is data-driven and results-oriented. We develop customized strategies based on your business goals, target audience, and industry trends. We utilize a mix of SEO, content marketing, social media, email marketing, and paid advertising to maximize your online presence and ROI.'
    },
    {
      id: 7,
      question: 'Can you help with e-commerce website development?',
      answer: 'Yes, we specialize in e-commerce website development. We can create custom online stores using platforms like Shopify, WooCommerce, or Magento, complete with secure payment gateways, inventory management, and user-friendly interfaces tailored to your brand.'
    },
    {
      id: 8,
      question: 'What makes YugaYatra different from other digital agencies?',
      answer: 'YugaYatra stands out through our holistic approach to digital solutions, combining technical expertise with creative excellence. We focus on building long-term partnerships with our clients, offering personalized strategies, transparent communication, and measurable results. Our team stays at the forefront of industry trends to deliver innovative solutions that drive real business growth.'
    }
  ];

  // Filter FAQs based on search term
  useEffect(() => {
    const results = faqData.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(results);
    
    // Reset open item when search changes
    setOpenItem(null);
  }, [searchTerm]);

  // Initialize filtered FAQs
  useEffect(() => {
    setFilteredFaqs(faqData);
  }, []);

  // Toggle FAQ item
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Clear search and focus
  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-primary to-soft-champagne" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-rich-black/80">
            Find answers to common questions about our services and processes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-lavish-gold/30 focus:outline-none focus:border-lavish-gold bg-white/70 backdrop-blur-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavish-gold/70" />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-rich-black/50 hover:text-rich-black"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border border-lavish-gold/20 shadow-md"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-lavish-gold/5 transition-colors"
                >
                  <span className="font-semibold text-rich-black">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openItem === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-lavish-gold" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openItem === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 border-t border-lavish-gold/10 text-rich-black/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-rich-black/70">No results found for "{searchTerm}"</p>
              <button
                onClick={handleClearSearch}
                className="mt-2 text-lavish-gold hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;