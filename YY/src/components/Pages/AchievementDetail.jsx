import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Building, Calendar, CheckCircle, Globe, Star, Trophy, Users, ArrowLeft } from 'lucide-react';
import Navbar from '../Layout/Navbar';
import Footer from '../Footer/Footer';
import ChatWidget from '../Chat/ChatWidget';

const AchievementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Achievement data - same as in AchievementsSection
  const achievements = [
    {
      id: 'company-incorporation',
      icon: <Building className="w-8 h-8" />,
      title: "Company Incorporation",
      date: "May 16, 2024",
      description: "Successfully incorporated YugaYatra Retail (OPC) Private Limited with CIN: U47912KA2024OPC188603",
      highlight: "Legal Foundation",
      image: "incorporation-certificate.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited was officially incorporated on May 16, 2024, marking the beginning of our journey as a legally recognized business entity in India.",
        "Our Certificate of Incorporation was issued by the Registrar of Companies, Karnataka, with the Corporate Identity Number (CIN): U47912KA2024OPC188603.",
        "This milestone represents the formal establishment of our company structure, allowing us to operate legally within the framework of Indian corporate law and pursue our business objectives with full legitimacy.",
        "The incorporation process involved careful planning of our business structure, objectives, and governance framework to ensure compliance with all regulatory requirements."
      ],
      details: {
        "Registration Authority": "Registrar of Companies, Karnataka",
        "Company Type": "One Person Company (OPC) Private Limited",
        "Authorized Capital": "₹10,00,000",
        "Paid-up Capital": "₹1,00,000",
        "Registered Office": "Electronic City, Phase 1, Bengaluru, Karnataka, India"
      }
    },
    {
      id: 'dipp-startup-recognition',
      icon: <Star className="w-8 h-8" />,
      title: "DIPP Startup Recognition",
      date: "2024",
      description: "Officially recognized as a startup by the Department for Promotion of Industry and Internal Trade",
      highlight: "Certificate No: DIPP169780",
      image: "startup-india-certificate.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited has been officially recognized as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India.",
        "This recognition validates our innovative business model and grants us access to various benefits under the Startup India initiative launched by the Government of India.",
        "The recognition process involved a thorough evaluation of our business model, innovation potential, and scalability prospects by the DPIIT.",
        "This achievement positions us to benefit from various government schemes designed to foster the growth of innovative startups in India."
      ],
      details: {
        "Recognition Number": "DIPP169780",
        "Issuing Authority": "Department for Promotion of Industry and Internal Trade",
        "Validity": "10 years from date of incorporation",
        "Benefits": "Tax benefits, easier compliance, IPR fast-tracking, government tenders"
      }
    },
    {
      id: 'udyam-registration',
      icon: <Award className="w-8 h-8" />,
      title: "UDYAM Registration",
      date: "July 22, 2024",
      description: "Registered as a Micro Enterprise under UDYAM with Registration Number: UDYAM-KR-03-0421327",
      highlight: "Valid until 2034",
      image: "udyam-certificate.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited has successfully obtained UDYAM registration as a Micro Enterprise under the Ministry of Micro, Small and Medium Enterprises, Government of India.",
        "Our UDYAM Registration Number UDYAM-KR-03-0421327 was issued on July 22, 2024, and is valid for a period of 10 years.",
        "This registration classifies us as a Micro Enterprise based on our investment in plant and machinery/equipment and turnover criteria as specified by the MSME Ministry.",
        "The UDYAM registration enables us to access various benefits and schemes designed for MSMEs, including priority sector lending, collateral-free loans, and protection against delayed payments."
      ],
      details: {
        "Registration Number": "UDYAM-KR-03-0421327",
        "Enterprise Category": "Micro",
        "Sector": "Service",
        "Validity": "10 years (until 2034)",
        "Issuing Authority": "Ministry of Micro, Small and Medium Enterprises"
      }
    },
    {
      id: 'gst-registration',
      icon: <CheckCircle className="w-8 h-8" />,
      title: "GST Registration",
      date: "2024",
      description: "Obtained GST registration with GSTIN: 29AABCY8389C1ZT for seamless business operations",
      highlight: "Tax Compliant",
      image: "gst-certificate.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited has successfully obtained Goods and Services Tax (GST) registration with GSTIN: 29AABCY8389C1ZT.",
        "This registration enables us to collect GST on our services and claim input tax credit on our purchases, ensuring tax compliance and operational efficiency.",
        "The GST registration process involved verification of our business details, PAN, and other statutory requirements by the GST authorities.",
        "Being GST registered allows us to conduct business seamlessly across India and participate in the formal economy with full tax compliance."
      ],
      details: {
        "GSTIN": "29AABCY8389C1ZT",
        "State Jurisdiction": "Karnataka",
        "Registration Type": "Regular",
        "Business Category": "Services",
        "Effective Date": "2024"
      }
    },
    {
      id: 'trademark-application',
      icon: <Globe className="w-8 h-8" />,
      title: "Trademark Application",
      date: "July 2, 2024",
      description: "Filed trademark application (TM Application No: 6508313) for brand protection in Class 25",
      highlight: "Brand Protection",
      image: "trademark-certificate.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited has filed a trademark application with the Trademark Registry, Government of India, to protect our brand identity and intellectual property.",
        "Our trademark application (Application No: 6508313) was filed on July 2, 2024, under Class 25, which covers clothing, footwear, and headgear.",
        "This application is a strategic step towards securing exclusive rights to our brand name and logo, preventing unauthorized use by third parties.",
        "The trademark registration process involves examination, publication, and registration phases, and we are currently awaiting examination by the Trademark Registry."
      ],
      details: {
        "Application Number": "6508313",
        "Filing Date": "July 2, 2024",
        "Class": "25 (Clothing, footwear, headgear)",
        "Status": "Pending Examination",
        "Validity": "10 years from registration date (renewable)"
      }
    },
    {
      id: 'food-safety-license',
      icon: <Trophy className="w-8 h-8" />,
      title: "Food Safety License",
      date: "June 7, 2024",
      description: "Obtained FSSAI Registration (ID: 21224007001166) for retail operations in food sector",
      highlight: "Multi-sector Operations",
      image: "fssai-registration.webp",
      fullDescription: [
        "YugaYatra Retail (OPC) Private Limited has successfully obtained Food Safety and Standards Authority of India (FSSAI) registration with ID: 21224007001166.",
        "This registration was issued on June 7, 2024, and authorizes us to operate in the food retail sector in compliance with the Food Safety and Standards Act, 2006.",
        "The FSSAI registration process involved verification of our premises, facilities, and compliance with food safety standards and hygiene requirements.",
        "This achievement expands our operational capabilities to include food retail, diversifying our business portfolio and opening new market opportunities."
      ],
      details: {
        "FSSAI ID": "21224007001166",
        "Category": "Retailer",
        "Issuing Authority": "Food Safety and Standards Authority of India",
        "Validity": "1 year (renewable)",
        "Scope": "Food retail operations"
      }
    }
  ];

  // Find the achievement based on the ID from URL params
  const achievement = achievements.find(item => item.id === id);

  // If achievement not found, show error message
  if (!achievement) {
    return (
      <div className="main-container">
        <Navbar />
        <main>
          <section className="py-20 relative overflow-hidden bg-gradient-to-b from-yellow-50 to-amber-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold text-stone-800 mb-6">Achievement Not Found</h1>
              <p className="text-xl text-stone-600 mb-8">The achievement you're looking for doesn't exist.</p>
              <button 
                onClick={() => navigate('/#achievements')} 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-lg hover:from-yellow-700 hover:to-amber-700 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Achievements
              </button>
            </div>
          </section>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Map the icon component based on the achievement title
  const getIconComponent = () => {
    switch (achievement.title) {
      case 'Company Incorporation':
        return <Building className="w-12 h-12" />;
      case 'DIPP Startup Recognition':
        return <Star className="w-12 h-12" />;
      case 'UDYAM Registration':
        return <Award className="w-12 h-12" />;
      case 'GST Registration':
        return <CheckCircle className="w-12 h-12" />;
      case 'Trademark Application':
        return <Globe className="w-12 h-12" />;
      case 'Food Safety License':
        return <Trophy className="w-12 h-12" />;
      default:
        return <Award className="w-12 h-12" />;
    }
  };

  return (
    <div className="main-container">
      <Navbar />
      <main>
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-yellow-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <button 
                onClick={() => navigate('/#achievements')} 
                className="inline-flex items-center px-4 py-2 text-stone-700 hover:text-amber-600 transition-colors duration-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Achievements
              </button>
            </motion.div>

            {/* Achievement Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800">
                  {achievement.title}
                </h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="inline-block text-sm text-amber-700 font-semibold bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                    {achievement.date}
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-stone-700 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                    <Star className="w-4 h-4 mr-2 text-amber-500" />
                    {achievement.highlight}
                  </span>
                </div>
                <p className="text-xl text-stone-600 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-white">
                    {getIconComponent()}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Certificate Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src={`/${achievement.image}`} 
                  alt={`${achievement.title} Certificate`}
                  className="w-full h-auto object-contain max-h-[500px] mx-auto"
                />
              </div>
            </motion.div>

            {/* Detailed Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
            >
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-stone-800">About This Achievement</h2>
                  <div className="space-y-4">
                    {achievement.fullDescription.map((paragraph, index) => (
                      <p key={index} className="text-stone-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-stone-800">Details</h2>
                  <div className="space-y-4">
                    {Object.entries(achievement.details).map(([key, value], index) => (
                      <div key={index} className="border-b border-stone-200 pb-3 last:border-0 last:pb-0">
                        <h3 className="text-sm font-medium text-stone-500">{key}</h3>
                        <p className="text-stone-800 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-16"
            >
              <h3 className="text-3xl font-bold text-stone-800 mb-6">Ready to Start Your Digital Journey?</h3>
              <p className="text-stone-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Join us as we continue to achieve new milestones and deliver exceptional digital solutions. 
                Let's build something amazing together.
              </p>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-lg hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 text-lg"
                >
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default AchievementDetail;