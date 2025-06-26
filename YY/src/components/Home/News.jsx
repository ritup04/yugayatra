import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const News = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'YugaYatra is Mass Hiring - Join Our Growing Team!',
      date: 'June 8, 2025',
      excerpt: 'We\'re expanding rapidly and looking for talented individuals across multiple departments including HR, Marketing, Business Development, and Tech Support.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1284&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'YugaYatra Now Live on LinkedIn - Apply Directly!',
      date: 'June 5, 2025',
      excerpt: 'Connect with us on LinkedIn to explore internship opportunities, company updates, and apply directly through our official page for faster processing.',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'New Partnership with 50+ Companies for Student Internships',
      date: 'May 28, 2025',
      excerpt: 'YugaYatra has successfully partnered with over 50 leading companies across various industries to provide diverse internship opportunities for students.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      link: '#'
    },
    {
      id: 4,
      title: 'YugaYatra Launches Virtual Career Fair 2025',
      date: 'May 15, 2025',
      excerpt: 'Our first virtual career fair connects 1000+ students with top employers, featuring live interviews, skill assessments, and instant job offers.',
      image: 'https://www.dreamcast.in/blog/wp-content/uploads/2021/01/How-To-Host-Virtual-Career-Fair-Job-Fair-27-NOV-2020.jpg',
      link: '#'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FFF8E1]/80 to-[#E7CBA9]/80" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
            Latest <span className="text-gradient">News</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-rich-black/80">
            Stay updated with the latest happenings and announcements from YugaYatra.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-rich-black/60 mb-3">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-rich-black">{item.title}</h3>
                <p className="text-sm text-rich-black/80 mb-4 flex-1">{item.excerpt}</p>
                {/* Read More link - removed href to prevent navigation */}
                <button 
                  onClick={() => alert('This feature is coming soon!')}
                  className="text-lavish-gold font-medium hover:underline flex items-center mt-auto self-start"
                >
                  Read More
                  <FaArrowRight className="ml-2 text-xs" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;