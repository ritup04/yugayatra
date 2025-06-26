import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Layout/Navbar';
import Footer from '../Footer/Footer';
import ChatWidget from '../Chat/ChatWidget';

const TermsOfService = () => {
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
                Terms of Service
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
                  Welcome to YugaYatra Retail Pvt Ltd. These terms and conditions outline the rules and regulations for the use of our website and services.
                </p>
                <p className="mb-4">
                  By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">2. License to Use Website</h2>
                <p className="mb-4">
                  Unless otherwise stated, YugaYatra Retail Pvt Ltd and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
                </p>
                <p className="mb-4">
                  You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">3. Restrictions</h2>
                <p className="mb-4">
                  You are specifically restricted from all of the following:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Publishing any website material in any other media</li>
                  <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
                  <li>Publicly performing and/or showing any website material</li>
                  <li>Using this website in any way that is or may be damaging to this website</li>
                  <li>Using this website in any way that impacts user access to this website</li>
                  <li>Using this website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to the website, or to any person or business entity</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">4. Your Content</h2>
                <p className="mb-4">
                  In these terms and conditions, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant YugaYatra Retail Pvt Ltd a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
                </p>
                <p className="mb-4">
                  Your Content must be your own and must not be infringing on any third party's rights. YugaYatra Retail Pvt Ltd reserves the right to remove any of Your Content from this website at any time without notice.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">5. No Warranties</h2>
                <p className="mb-4">
                  This website is provided "as is," with all faults, and YugaYatra Retail Pvt Ltd makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">6. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall YugaYatra Retail Pvt Ltd, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">7. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;