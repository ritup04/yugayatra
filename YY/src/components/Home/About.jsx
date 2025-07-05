import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-primary to-soft-champagne">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 fade-in"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
            About YugaYatra Retail <span className="text-gradient">(OPC) Pvt Ltd</span>
          </h2>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="prose prose-lg max-w-none text-rich-black/90">
            <p className="text-lg leading-relaxed mb-6">
              At YugaYatra Retail (OPC) Pvt Ltd, we specialize in providing innovative digital solutions and comprehensive training programs. Our company focuses on empowering businesses with the Artificial Intelligence tools and expertise needed to thrive in today's competitive marketplace.
            </p>
          </div>
        </motion.div>

        {/* Our Purpose Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-rich-black">
            Our <span className="text-gradient">Purpose</span>
          </h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <p className="text-lg leading-relaxed text-rich-black/90">
              Our purpose is to bridge the gap between traditional business models and digital innovation. We focus on creating sustainable digital ecosystems that not only solve immediate challenges but also position our clients for long-term success in an increasingly connected world.
            </p>
          </div>
        </motion.div>

        {/* Company Info Section - Golden Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#e6c97a] via-[#fffbe6] to-[#e6c97a] rounded-2xl shadow-xl p-12 md:p-16 text-stone-800 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl border border-amber-300 mb-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#3a2c1a]">YugaYatra Retail <span className="text-[#3a2c1a]/80">(OPC) Private Limited</span></h2>
            <p className="text-2xl text-[#3a2c1a]/90 font-medium">Your Digital Journey Partner</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-12">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-300 hover:bg-white/50 transition-all duration-300">
              <h4 className="font-bold text-lg mb-2 text-[#3a2c1a]">Incorporation</h4>
              <p className="text-[#3a2c1a]/80">May 16, 2024</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-300 hover:bg-white/50 transition-all duration-300">
              <h4 className="font-bold text-lg mb-2 text-[#3a2c1a]">Leadership</h4>
              <p className="text-[#3a2c1a]/80">Debashish Kumar, CEO/Director</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-300 hover:bg-white/50 transition-all duration-300">
              <h4 className="font-bold text-lg mb-2 text-[#3a2c1a]">Location</h4>
              <p className="text-[#3a2c1a]/80">Bangalore, Karnataka</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-[#3a2c1a]/80 max-w-4xl mx-auto leading-relaxed">
              Specializing in cutting-edge web development and digital marketing solutions, 
              driving real business impact through innovation and precision. We're not just training individuals; 
              we're crafting future leaders.
            </p>
          </div>
        </motion.div>

        {/* Company Details - Subtle Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
<div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 inline-flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-rich-black/90 font-semibold">
  <span className="font-bold">PAN: AABCY8389C</span>
  <span className="font-bold">UDYAM: KR-03-0421327</span>
  <span className="font-bold">CIN: U47912KA2024OPC188603</span>
  <span className="font-bold">FSSAI: 21224007001166</span>
  <span className="font-bold">TM Application No: 6508313</span>
  <span className="font-bold">GA Id: 445284040</span>

</div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-lavish-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default About;