import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Footer from '../Footer/Footer';
import ChatWidget from '../Chat/ChatWidget';

const SiteMap = () => {
  // Site structure data
  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/#services' },
        { name: 'Programs', path: '/#programs' },
        { name: 'Projects', path: '/#projects' },
        { name: 'Blog', path: '/#blog' },
        { name: 'News', path: '/#news' },
        { name: 'FAQ', path: '/#faq' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Website Development', path: '/#services' },
        { name: 'Digital Marketing', path: '/#services' },
        { name: 'Social Media Management', path: '/#services' },
        { name: 'Content Development', path: '/#services' },
        { name: 'AI Training', path: '/#services' },
        { name: 'Graphic Designing', path: '/#services' },
        { name: 'E-commerce Solutions', path: '/#services' },
        { name: 'Product Photography', path: '/#services' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Site Map', path: '/site-map' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { name: 'Contact Us', path: '/#contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'Apply for Internship', path: '/#programs' },
      ]
    }
  ];

  return (
    <div className="main-container">
      <Navbar />
      <main>
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-primary to-soft-champagne">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
                Site Map
              </h1>
              <div className="h-1 w-24 bg-lavish-gold mx-auto"></div>
              <p className="mt-6 text-lg text-rich-black/80 max-w-3xl mx-auto">
                A complete overview of all pages available on the YugaYatra Retail Pvt Ltd website.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {siteStructure.map((section, index) => (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-bold mb-4 text-rich-black border-b border-lavish-gold/30 pb-2">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path}
                          className="text-rich-black/80 hover:text-lavish-gold transition-colors duration-300 flex items-center"
                        >
                          <span className="mr-2">→</span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl font-bold mb-6 text-rich-black">Looking for something specific?</h2>
              <Link 
                to="/#faq"
                className="modern-button inline-flex items-center"
              >
                Visit our FAQ Section
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SiteMap;