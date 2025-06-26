import React from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FFF8E1]/80 to-[#E7CBA9]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
            Global Impact & Presence
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-rich-black/80">
            Our network spans across major business hubs, connecting professionals and creating opportunities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Stats Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card hover:border-lavish-gold"
            >
              <h3 className="text-lg font-semibold mb-2 text-lavish-gold">Global Reach</h3>
              <p className="text-4xl font-bold text-rich-black mb-2">50+</p>
              <p className="text-sm opacity-75">Countries Served</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card hover:border-lavish-gold"
            >
              <h3 className="text-lg font-semibold mb-2 text-lavish-gold">Student Statisfaction</h3>
              <p className="text-4xl font-bold text-rich-black mb-2">95%</p>
              <p className="text-sm opacity-75">Postive Feedback</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card hover:border-lavish-gold"
            >
              <h3 className="text-lg font-semibold mb-2 text-lavish-gold">Network</h3>
              <p className="text-4xl font-bold text-rich-black mb-2">10k+</p>
              <p className="text-sm opacity-75">Professional Connections</p>
            </motion.div>
          </div>

          {/* Analytics Image Column */}
          <div className="lg:col-span-2 relative h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 card overflow-hidden hover:border-lavish-gold"
            >
              <div className="relative w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                  alt="Global Analytics Dashboard"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:border-lavish-gold/50 transition-colors duration-300">
                        <p className="text-lavish-gold text-sm font-semibold">Active Users</p>
                        <p className="text-2xl font-bold text-white">2.4K</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:border-lavish-gold/50 transition-colors duration-300">
                        <p className="text-lavish-gold text-sm font-semibold">Growth Rate</p>
                        <p className="text-2xl font-bold text-white">+147%</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:border-lavish-gold/50 transition-colors duration-300">
                        <p className="text-lavish-gold text-sm font-semibold">ROI</p>
                        <p className="text-2xl font-bold text-white">3.2x</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {[
            { value: '500+', label: 'Alumni Worldwide' },
            { value: '20+', label: 'Corporate Partners' },
            { value: '2+', label: 'Years Experience' },
            { value: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center fade-in"
            >
              <p className="text-3xl font-bold text-lavish-gold mb-2">{stat.value}</p>
              <p className="text-sm text-rich-black/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;