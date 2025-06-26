import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBarIcon, CodeBracketIcon, MegaphoneIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaCode, FaChartBar, FaUsers, FaShoppingCart, FaAmazon, FaShopify, FaCamera, FaChartLine, FaTasks } from 'react-icons/fa';

// Detailed service data based on the image
const detailedServices = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: FaCode,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Custom responsive website design',
      'E-commerce functionality',
      'SEO-optimized development'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: MegaphoneIcon,  // Changed from FaMegaphone to MegaphoneIcon
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Search engine optimization (SEO)',
      'PPC advertising campaigns',
      'Email marketing strategies'
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    icon: FaUsers,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Content creation & scheduling',
      'Community engagement',
      'Analytics & reporting'
    ]
  },
  {
    id: 'content-development',
    title: 'Content Development',
    icon: FaChartLine,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Blog & article writing',
      'SEO content optimization',
      'Content strategy planning'
    ]
  },
  {
    id: 'ai-training',
    title: 'AI Training',
    icon: FaChartBar,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Machine learning basics',
      'AI implementation strategies',
      'Data analysis training'
    ]
  },
  {
    id: 'graphic-designing',
    title: 'Graphic Designing',
    icon: FaCamera,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Logo & brand identity design',
      'Marketing materials creation',
      'Social media graphics'
    ]
  },
  {
    id: 'instagram-management',
    title: 'Instagram Management',
    icon: FaUsers,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Content strategy & planning',
      'Hashtag optimization',
      'Engagement growth tactics'
    ]
  },
  {
    id: 'meta-ads-promotion',
    title: 'Meta Ads Promotion',
    icon: MegaphoneIcon,  // Changed from FaMegaphone to MegaphoneIcon
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Campaign strategy development',
      'Audience targeting setup',
      'Performance optimization'
    ]
  },
  {
    id: 'sales-funnels',
    title: 'Sales Funnels',
    icon: FaChartLine,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Funnel strategy & design',
      'Conversion optimization',
      'Analytics & tracking setup'
    ]
  },
  {
    id: 'e-commerce-solutions',
    title: 'E-commerce Solutions',
    icon: FaShoppingCart,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Online store setup',
      'Payment gateway integration',
      'Inventory management'
    ]
  },
  {
    id: 'amazon-seller-account',
    title: 'Amazon Seller Account',
    icon: FaAmazon,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Account setup & optimization',
      'Product listing creation',
      'Performance monitoring'
    ]
  },
  {
    id: 'flipkart-seller-account',
    title: 'Flipkart Seller Account',
    icon: FaShopify,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Account registration & setup',
      'Catalog management',
      'Order fulfillment support'
    ]
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    icon: FaCamera,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'High-quality product shots',
      '360-degree photography',
      'Image post-processing'
    ]
  },
  {
    id: 'infographics-creation',
    title: 'Infographics Creation',
    icon: FaChartBar,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Data visualization design',
      'Custom illustrations',
      'Brand-aligned graphics'
    ]
  },
  {
    id: 'upwork-project-management',
    title: 'Upwork Project Management',
    icon: FaTasks,
    color: 'from-[#e6c97a] to-[#fffbe6]',
    bulletPoints: [
      'Project planning & setup',
      'Team coordination',
      'Milestone tracking'
    ]
  }
];

const services = [
  {
    title: 'Data Visualization',
    description: 'Transform complex data into compelling visual stories. Learn industry-standard tools and techniques.',
    icon: ChartBarIcon,
    color: 'from-secondary to-neon-purple',
    skills: ["Tableau", "D3.js", "Python", "Data Analysis"]
  },
  {
    title: 'Software Engineering',
    description: 'Build the future of technology with cutting-edge development practices and tools.',
    icon: CodeBracketIcon,
    color: 'from-neon-purple to-hot-magenta',
    skills: ["React", "Node.js", "Cloud Computing", "DevOps"]
  },
  {
    title: 'Marketing',
    description: 'Master digital marketing strategies and create impactful campaigns that drive results.',
    icon: MegaphoneIcon,
    color: 'from-hot-magenta to-cyber-green',
    skills: ["Social Media", "Content Strategy", "Analytics", "SEO"]
  },
  {
    title: 'HR Management',
    description: 'Develop expertise in modern HR practices and organizational development.',
    icon: UserGroupIcon,
    color: 'from-cyber-green to-secondary',
    skills: ["Talent Acquisition", "Employee Relations", "HR Analytics", "L&D"]
  },
];

// Service Card Component
const ServiceCard = ({ service, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"
        style={{
          background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
          '--tw-gradient-from': service.color.split(' ')[1],
          '--tw-gradient-to': service.color.split(' ')[3],
        }}
      />
      <div className="relative p-6 bg-primary/50 backdrop-blur-lg rounded-xl border border-light-gray/10 hover:border-secondary/50 transition-all duration-300">
        <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${service.color} p-3`}>
          <service.icon className="w-full h-full text-white" />
        </div>
        <h3 className="text-xl font-bold text-light-gray mb-2">{service.title}</h3>
        <p className="text-light-gray/70">{service.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {service.skills.map((skill, skillIndex) => (
            <span 
              key={skillIndex}
              className="px-3 py-1 text-sm border border-white/20 rounded-full
                       hover:border-white transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
            '--tw-gradient-from': service.color.split(' ')[1],
            '--tw-gradient-to': service.color.split(' ')[3],
          }}
        />
      </div>
    </motion.div>
  );
};

// Detailed Service Card Component
const DetailedServiceCard = ({ service, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-24 w-full bg-gradient-to-r ${service.color} relative`}>
          <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-xl bg-white shadow-lg flex items-center justify-center">
            <service.icon className="w-10 h-10 text-rich-black" />
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-rich-black mb-6">{service.title}</h2>
          
          <ul className="space-y-4">
            {service.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-lavish-gold mt-2 mr-3"></span>
                <span className="text-rich-black/80">{point}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex justify-end">
            <button className="modern-button">
              Get Started
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  
  // Toggle function to show/hide all services
  const toggleShowAllServices = (e) => {
    // Prevent default behavior to avoid page jumps
    if (e) e.preventDefault();
    
    setShowAllServices(prev => !prev);
    
    // Don't auto-scroll when toggling - this was causing the jumping issue
  };
  
  const programs = [
    {
      title: "Web Development",
      description: "Learn to craft complex websites that tell powerful visual stories. Develop hands-on experience with real projects while creating engaging, user-centered web experiences.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 12H17.4C17.7314 12 18 12.2686 18 12.6V19.4C18 19.7314 17.7314 20 17.4 20H16.6C16.2686 20 16 19.7314 16 19.4V12.6C16 12.2686 16.2686 12 16.6 12H16ZM8 9H9.4C9.73137 9 10 9.26863 10 9.6V19.4C10 19.7314 9.73137 20 9.4 20H8.6C8.26863 20 8 19.7314 8 19.4V9.6C8 9.26863 8.26863 9 8.6 9H8ZM12 4H13.4C13.7314 4 14 4.26863 14 4.6V19.4C14 19.7314 13.7314 20 13.4 20H12.6C12.2686 20 12 19.7314 12 19.4V4.6C12 4.26863 12.2686 4 12.6 4H12Z" 
            fill="currentColor"/>
          <path d="M3 4.6C3 4.26863 3.26863 4 3.6 4H4.4C4.73137 4 5 4.26863 5 4.6V19.4C5 19.7314 4.73137 20 4.4 20H3.6C3.26863 20 3 19.7314 3 19.4V4.6Z" 
            fill="currentColor"/>
          <path d="M20 15H21.4C21.7314 15 22 15.2686 22 15.6V19.4C22 19.7314 21.7314 20 21.4 20H20.6C20.2686 20 20 19.7314 20 19.4V15.6C20 15.2686 20.2686 15 20.6 15H20Z" 
            fill="currentColor"/>
        </svg>
      ),
      duration: "2 months",
      skills: ["React", "js", "MERN", "HTML/CSS"],
      highlights: [
        "Real-world projects",
        "Industry mentorship",
        "Portfolio development"
      ]
    },
    {
      title: "Software Engineering",
      description: "Dive into full-stack development using cutting-edge technologies. Build scalable applications and learn industry best practices.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.95 8.6L6.4 11.15L8.95 13.7L7.85 14.8L4.2 11.15L7.85 7.5L8.95 8.6ZM15.05 8.6L17.6 11.15L15.05 13.7L16.15 14.8L19.8 11.15L16.15 7.5L15.05 8.6Z" 
            fill="currentColor"/>
          <path d="M14 7L10.4 16H9L12.6 7H14Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4ZM4 4H20V20H4V4Z" 
            fill="currentColor"/>
        </svg>
      ),
      duration: "2 months",
      skills: ["React", "Node.js", "Cloud Computing", "DevOps"],
      highlights: [
        "Agile development",
        "Code reviews",
        "System design"
      ]
    },
    {
      title: "Digital Marketing",
      description: "Create and execute innovative digital marketing strategies. Learn to drive growth through data-driven campaigns.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" 
            fill="currentColor"/>
          <path d="M16 14H18V17H16V14Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V8ZM6 8H18V16H6V8Z" 
            fill="currentColor"/>
          <path d="M11.2 10.8L14.4 14H9.6L11.2 10.8Z" fill="currentColor"/>
        </svg>
      ),
      duration: "2 months",
      skills: ["Social Media", "Content Strategy", "Analytics", "SEO"],
      highlights: [
        "Campaign planning",
        "Performance analysis",
        "Brand strategy"
      ]
    },
    {
 title: "App Development",
 description: "Gain hands-on experience in modern app development. Learn to build and deploy high-performance mobile and web applications.",
 icon: (
   <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z" 
          stroke="currentColor" strokeWidth="2" fill="none"/>
     <path d="M9 7H15M9 11H15M9 15H12" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <circle cx="12" cy="18" r="1" fill="currentColor"/>
   </svg>
 ),
 duration: "3 months",
 skills: ["React Native", "Flutter", "API Integration", "App Store Deployment"],
 highlights: [
   "Cross-platform development",
   "User authentication & data management",
   "App store optimization"
 ]
}
  ];

  // Function to handle service card click
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  // Function to close the detailed service modal
  const handleCloseModal = () => {
    setSelectedService(null);
  };

  // Inside the return statement of Services component
  return (
    <section className="section py-20" id="programs">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Programs Section */}
        <div className="text-center mb-16 fade-in" id="programs">
          <span className="text-sm uppercase tracking-wider text-lavish-gold font-semibold">Career Growth</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-rich-black">Internship Programs</h2>
          <p className="text-lg max-w-3xl mx-auto text-rich-black/80">
            Launch your career with our industry-leading internship programs. 
            Gain hands-on experience, receive mentorship from experts, and build a strong professional network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="program-card fade-in overflow-hidden flex flex-col h-full"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="program-icon text-lavish-gold">
                {program.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-rich-black">{program.title}</h3>
              <p className="mb-4 text-rich-black/80">{program.description}</p>
              
              <div className="flex items-center mb-4 text-sm text-rich-black/70">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Duration: {program.duration}
              </div>
  
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2 text-rich-black">Skills You'll Gain:</p>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 text-xs bg-white/50 border border-lavish-gold/30 rounded-full text-rich-black hover:bg-lavish-gold/20 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
  
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2 text-rich-black">Program Highlights:</p>
                <ul className="space-y-1">
                  {program.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="text-sm flex items-start text-rich-black/80">
                      <span className="text-lavish-gold mr-2 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
  
              <button 
                className="modern-button w-full"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://api.whatsapp.com/send/?phone=918757728679&text=Hello, I am interested in applying for the ${program.title} internship program at YugaYatra. I would like to know more about the requirements, duration, and learning opportunities. I will attach my CV to this chat for your review.&type=phone_number&app_absent=0`, '_blank');
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Our Services Section */}
        <div className="text-center mt-24 mb-16 fade-in" id="services">
          <span className="text-sm uppercase tracking-wider text-lavish-gold font-semibold">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-rich-black">Our Services </h2>
          <p className="text-lg max-w-3xl mx-auto text-rich-black/80">
            We provide a comprehensive range of services to help businesses grow and succeed in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {detailedServices.slice(0, showAllServices ? detailedServices.length : 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="service-card fade-in overflow-hidden flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-lavish-gold/10"
              onClick={() => handleServiceClick(service)}
            >
              <div className={`h-16 w-full bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-rich-black">{service.title}</h3>
                <ul className="space-y-2">
                  {service.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start text-rich-black/80 text-sm">
                      <span className="text-lavish-gold mr-2 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {detailedServices.length > 6 && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={(e) => toggleShowAllServices(e)}
              className="modern-button flex items-center gap-2"
            >
              {showAllServices ? 'Show Less' : 'Show More'}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showAllServices ? 'rotate-180' : ''}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Detailed Service Modal - Enhanced with better animations */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-lavish-gold/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-24 w-full bg-gradient-to-r ${selectedService.color} relative`}>
                <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-xl bg-white shadow-lg flex items-center justify-center border border-lavish-gold/20">
                  <selectedService.icon className="w-10 h-10 text-rich-black" />
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="pt-16 pb-8 px-8">
                <h2 className="text-2xl font-bold text-rich-black mb-6">{selectedService.title}</h2>
                
                <ul className="space-y-4">
                  {selectedService.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-lavish-gold mt-2 mr-3"></span>
                      <span className="text-rich-black/80">{point}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 flex justify-end">
                  <motion.button 
                    className="modern-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`https://api.whatsapp.com/send/?phone=918757728679&text=Hello, I am interested in learning more about the ${selectedService.title} service offered by YugaYatra. Could you please provide me with detailed information about this service, including pricing and availability? I will attach my CV to this chat if needed for further discussion.&type=phone_number&app_absent=0`, '_blank');
                    }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;