import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Layout/Navbar';
import Footer from '../Footer/Footer';
import ChatWidget from '../Chat/ChatWidget';

const PrivacyPolicy = () => {
  return (
    <div className="main-container">
      <Navbar />
      <main>
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-primary to-soft-champagne">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
                Privacy Policy
              </h1>
              <div className="h-1 w-24 bg-lavish-gold mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8"
            >
              <div className="prose prose-lg max-w-none text-rich-black/80">
                <p className="mb-4">
                  <strong>Last Updated:</strong> June 1, 2024
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to YugaYatra Retail Pvt Ltd. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">2. The Data We Collect</h2>
                <p className="mb-4">
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Identity Data: includes first name, last name, username or similar identifier</li>
                  <li>Contact Data: includes email address and telephone numbers</li>
                  <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
                  <li>Usage Data: includes information about how you use our website and services</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">3. How We Use Your Data</h2>
                <p className="mb-4">
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>To provide you with the services you have requested</li>
                  <li>To improve our website and services</li>
                  <li>To communicate with you about our services</li>
                  <li>To comply with a legal or regulatory obligation</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">4. Data Security</h2>
                <p className="mb-4">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">5. Your Legal Rights</h2>
                <p className="mb-4">
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and the right to withdraw consent.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">6. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> yugayatra@gmail.com<br />
                  <strong>Phone:</strong> +91 8757728679<br />
                  <strong>Address:</strong> Electronic City, Phase 1, Bengaluru, Karnataka, India
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PrivacyPolicy;