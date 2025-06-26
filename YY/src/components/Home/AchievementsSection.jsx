import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Building, Calendar, CheckCircle, Globe, Star, Trophy, Users } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 'company-incorporation',
      icon: <Building className="w-8 h-8" />,
      title: "Company Incorporation",
      date: "May 16, 2023",
      description: "Successfully incorporated YugaYatra Retail (OPC) Private Limited with CIN: U47912KA2024OPC188603",
      highlight: "Legal Foundation",
      image: "incorporation-certificate.webp"
    },
    {
      id: 'dipp-startup-recognition',
      icon: <Star className="w-8 h-8" />,
      title: "DIPP Startup Recognition",
      date: "2023",
      description: "Officially recognized as a startup by the Department for Promotion of Industry and Internal Trade",
      highlight: "Certificate No: DIPP169780",
      image: "startup-india-certificate.webp"
    },
    {
      id: 'udyam-registration',
      icon: <Award className="w-8 h-8" />,
      title: "UDYAM Registration",
      date: "July 22, 2023",
      description: "Registered as a Micro Enterprise under UDYAM with Registration Number: UDYAM-KR-03-0421327",
      highlight: "Valid until 2034",
      image: "udyam-certificate.webp"
    },
    {
      id: 'gst-registration',
      icon: <CheckCircle className="w-8 h-8" />,
      title: "GST Registration",
      date: "2024",
      description: "Obtained GST registration with GSTIN: 29AABCY8389C1ZT for seamless business operations",
      highlight: "Tax Compliant",
      image: "gst-certificate.webp"
    },
    {
      id: 'trademark-application',
      icon: <Globe className="w-8 h-8" />,
      title: "Trademark Application",
      date: "July 2, 2023",
      description: "Filed trademark application (TM Application No: 6508313) for brand protection in Class 25",
      highlight: "Brand Protection",
      image: "trademark-certificate.webp"
    },
    {
      id: 'food-safety-license',
      icon: <Trophy className="w-8 h-8" />,
      title: "Food Safety License",
      date: "June 7, 2023",
      description: "Obtained FSSAI Registration (ID: 21224007001166) for retail operations in food sector",
      highlight: "Multi-sector Operations",
      image: "fssai-registration.webp"
    }
  ];

  const stats = [
    { number: "6+", label: "Months in Business", icon: <Calendar className="w-6 h-6" /> },
    { number: "6", label: "Major Certifications", icon: <Award className="w-6 h-6" /> },
    { number: "100%", label: "Compliance Rate", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "3", label: "Business Sectors", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden bg-gradient-to-b from-yellow-50 to-amber-50 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800">
            Our <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating our journey of excellence since May 2023. From incorporation to recognition, 
            each milestone represents our commitment to digital innovation and business growth.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/achievement/${achievement.id}`} className="block h-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={achievement.image} 
                      alt={`${achievement.title} Certificate`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg">
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                  </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-stone-800">{achievement.title}</h3>
                    <span className="inline-block text-sm text-amber-700 font-semibold bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                      {achievement.date}
                    </span>
                  </div>
                  
                  <p className="text-stone-600 leading-relaxed text-sm">
                    {achievement.description}
                  </p>
                  
                  <div className="pt-2">
                    <span className="inline-flex items-center text-sm font-semibold text-stone-700 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                      <Star className="w-4 h-4 mr-2 text-amber-500" />
                      {achievement.highlight}
                    </span>
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Info Section - Updated with Golden Gradient and Hover Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#e6c97a] via-[#fffbe6] to-[#e6c97a] rounded-2xl shadow-xl p-12 md:p-16 text-stone-800 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl border border-amber-300"
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-stone-800 mb-6">Ready to Start Your Digital Journey?</h3>
          <p className="text-stone-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Join us as we continue to achieve new milestones and deliver exceptional digital solutions. 
            Let's build something amazing together.
          </p>
          {/* <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-rich-black hover:text-lavish-gold transition-colors duration-300 font-medium-py-2"
            >
              Explore Opportunities
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm text-stone-800 px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-lg border-2 border-stone-300 hover:border-amber-400"
            >
              Learn More
            </motion.button>
          </div> */}
        </motion.div>

        {/* Company Details - Subtle Section */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 inline-flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-stone-600">
            <span>PAN: AABCY8389C</span>
            <span>UDYAM: KR-03-0421327</span>
            <span>CIN: U47912KA2024OPC188603</span>
            <span>FSSAI: 21224007001166</span>
            <span>TM Application No: 6508313</span>
          </div>
        </motion.div> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AchievementsSection;