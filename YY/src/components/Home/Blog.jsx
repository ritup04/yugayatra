import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaSearch, FaComment } from 'react-icons/fa';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Effect to hide/show navbar when blog post is expanded/collapsed
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (selectedPost) {
        // Hide navbar when blog post is expanded
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Show navbar when returning from expanded view
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    return () => {
      // Ensure navbar is visible when component unmounts
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transform = 'translateY(0)';
      }
    };
  }, [selectedPost]);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of E-commerce in 2023',
      excerpt: 'Explore the emerging trends that will shape online retail in the coming year.',
      content: 'E-commerce continues to evolve at a rapid pace, with new technologies and consumer behaviors reshaping the landscape. In 2023, we expect to see significant growth in mobile commerce, voice shopping, and augmented reality experiences. Businesses that adapt to these trends will be well-positioned to capture market share and drive customer engagement.\n\nPersonalization will also play a crucial role, with AI-driven recommendations becoming more sophisticated. Sustainability concerns are influencing purchasing decisions, leading to more eco-friendly packaging and transparent supply chains. Social commerce is blurring the lines between social media and shopping, creating new opportunities for brands to connect with consumers.',
      author: 'Samyuktha Nakirikanti',
      date: 'April 15, 2025',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
    },
    {
      id: 2,
      title: 'Effective Digital Marketing Strategies for Small Businesses',
      excerpt: 'Learn how small businesses can maximize their online presence with limited resources.',
      content: 'Digital marketing offers small businesses the opportunity to compete with larger companies on a more level playing field. With strategic planning and targeted efforts, even businesses with modest budgets can achieve significant results.\n\nContent marketing remains one of the most cost-effective approaches, allowing businesses to demonstrate expertise and build trust with potential customers. Social media platforms provide direct access to specific demographics, while local SEO helps businesses connect with nearby customers actively searching for their products or services.\n\nEmail marketing continues to deliver impressive ROI, especially when messages are personalized and segmented. Analytics tools enable small businesses to measure results and refine their strategies over time, ensuring marketing dollars are spent efficiently.',
      author: 'Ganesh Lagad',
      date: 'March 22, 2025',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80'
    },
    {
      id: 3,
      title: 'Building a Strong Online Brand Presence',
      excerpt: 'Discover the key elements of a compelling brand identity in the digital space.',
      content: 'A strong online brand presence is essential in today\'s digital-first business environment. It encompasses everything from your visual identity to your communication style and customer experience.\n\nConsistency across all digital touchpoints helps reinforce brand recognition and builds trust with your audience. Your website serves as the foundation of your online presence, while social media channels allow you to showcase your brand personality and engage directly with customers.\n\nContent that reflects your brand values and addresses customer pain points demonstrates your understanding of their needs. Online reputation management is increasingly important, as reviews and testimonials significantly influence purchasing decisions. Regular monitoring and adaptation ensure your brand remains relevant in a rapidly changing digital landscape.',
      author: 'Ashritha Reddy',
      date: 'February 10, 2025',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  // Initialize comments object
  useEffect(() => {
    const initialComments = {};
    blogPosts.forEach(post => {
      initialComments[post.id] = [
        {
          id: 1,
          name: 'Vikram Singh',
          email: 'vikram@example.com',
          text: 'Great insights! I especially appreciate the points about personalization.',
          date: 'April 18, 2025'
        },
        {
          id: 2,
          name: 'Meera Patel',
          email: 'meera@example.com',
          text: 'This article helped me rethink our strategy. Thank you!',
          date: 'April 20, 2025 '
        }
      ];
    });
    setComments(initialComments);
  }, []);

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !email.trim()) return;

    const newCommentObj = {
      id: comments[selectedPost.id].length + 1,
      name,
      email,
      text: newComment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setComments(prev => ({
      ...prev,
      [selectedPost.id]: [...prev[selectedPost.id], newCommentObj]
    }));

    // Reset form
    setNewComment('');
    setName('');
    setEmail('');
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FFF8E1]/80 to-[#E7CBA9]/80" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
            Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-rich-black/80">
            Insights, updates, and expertise from our team to help grow your business.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-lavish-gold/30 focus:outline-none focus:border-lavish-gold bg-white/70 backdrop-blur-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lavish-gold/70" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-rich-black/60 mb-3">
                  <span className="flex items-center mr-4">
                    <FaCalendarAlt className="mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <FaUser className="mr-1" />
                    {post.author}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-lavish-gold/20 text-rich-black inline-block mb-3 w-fit">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 text-rich-black">{post.title}</h3>
                <p className="text-rich-black/80 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-lavish-gold font-medium hover:underline flex items-center"
                  >
                    Read More
                  </button>
                  <span className="flex items-center text-sm text-rich-black/60">
                    <FaComment className="mr-1" />
                    {comments[post.id]?.length || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 mx-auto overflow-hidden relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
              >
                <div className="h-64 overflow-hidden relative flex-shrink-0">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 16rem)' }}>
                  <div className="flex items-center text-sm text-rich-black/60 mb-4">
                    <span className="flex items-center mr-6">
                      <FaCalendarAlt className="mr-2" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center">
                      <FaUser className="mr-2" />
                      {selectedPost.author}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6 text-rich-black">{selectedPost.title}</h2>
                  
                  <div className="prose prose-lg max-w-none mb-12 text-rich-black/80">
                    {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Comments Section */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-rich-black">Comments ({comments[selectedPost.id]?.length || 0})</h3>
                    
                    <div className="space-y-6 mb-8">
                      {comments[selectedPost.id]?.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-rich-black">{comment.name}</h4>
                            <span className="text-xs text-rich-black/60">{comment.date}</span>
                          </div>
                          <p className="text-rich-black/80">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Comment Form */}
                    {/* <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-bold mb-4 text-rich-black">Leave a Comment</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-rich-black/80 mb-1">Name *</label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded border border-lavish-gold/30 focus:outline-none focus:border-lavish-gold"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-rich-black/80 mb-1">Email *</label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded border border-lavish-gold/30 focus:outline-none focus:border-lavish-gold"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-rich-black/80 mb-1">Comment *</label>
                        <textarea
                          id="comment"
                          rows="4"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          required
                          className="w-full px-4 py-2 rounded border border-lavish-gold/30 focus:outline-none focus:border-lavish-gold"
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="modern-button"
                      >
                        Post Comment
                      </button>
                    </form> */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blog;