import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Layout/Navbar';
import Footer from '../Footer/Footer';
import ChatWidget from '../Chat/ChatWidget';

const Disclaimer = () => {
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
                Disclaimer
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

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">Website Disclaimer</h2>
                <p className="mb-4">
                  The information provided by YugaYatra Retail Pvt Ltd ("Company", "we", "our", "us") on our website is for general informational purposes only. All information on the website is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the website.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">External Links Disclaimer</h2>
                <p className="mb-4">
                  The website may contain links to external websites that are not provided or maintained by or in any way affiliated with our Company. Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">Professional Disclaimer</h2>
                <p className="mb-4">
                  The website cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                </p>
                <p className="mb-4">
                  We do not provide any kind of professional advice. The use or reliance of any information contained on this website is solely at your own risk.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">Testimonials Disclaimer</h2>
                <p className="mb-4">
                  The website may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">Errors and Omissions Disclaimer</h2>
                <p className="mb-4">
                  While we have made every attempt to ensure that the information contained in this website has been obtained from reliable sources, YugaYatra Retail Pvt Ltd is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this website is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-rich-black">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Disclaimer, please contact us at:
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

export default Disclaimer;