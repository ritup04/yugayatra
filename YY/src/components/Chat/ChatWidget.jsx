import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX, HiPaperAirplane, HiUser } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: 'Hello! Welcome to YugaYatra. How can we assist you today? You can also chat with us on WhatsApp!',
            sender: 'agent',
            timestamp: new Date()
          }
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        text: getAutoResponse(inputValue),
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple auto-response function - in a real app, this would be connected to a backend
  const getAutoResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        'Hello! How can I help you today?',
        'Hi there! What can I assist you with?',
        'Hey! Welcome to YugaYatra. How may I help you?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    } else if (lowerMessage.includes('internship') || lowerMessage.includes('apply') || lowerMessage.includes('job')) {
      return 'We have several internship opportunities available. Please click the "Apply for Internship" button in the navigation bar to submit your application.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('address')) {
      return 'You can reach us at yugayatra@gmail.com or call us at +91 8757728679. Our office is located in Electronic City, Phase 1, Bengaluru. Or click the WhatsApp button to chat directly!';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide') || lowerMessage.includes('do you')) {
      return 'We offer a range of services including website development, digital marketing, e-commerce solutions, and more. Check out our Services section for details!';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return 'Our pricing varies based on project requirements. Please contact our sales team at yugayatra@gmail.com for a customized quote.';
    } else if (lowerMessage.includes('thank')) {
      const thanks = [
        'You\'re welcome! Is there anything else I can help you with?',
        'Happy to help! Let me know if you need anything else.',
        'My pleasure! Feel free to ask if you have more questions.'
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    } else {
      const defaultResponses = [
        'Thank you for your message. One of our team members will get back to you soon. If you need immediate assistance, please email us at yugayatra@gmail.com or use the WhatsApp button.',
        'I don\'t have specific information about that yet. Could you try asking about our services, internships, or contact details?',
        'That\'s an interesting question. Let me connect you with our team who can provide more details. Please email us at yugayatra@gmail.com or use WhatsApp.',
        'I\'m still learning to answer all types of questions. For now, I can help with information about our services, internships, and contact details.'
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    window.open('https://api.whatsapp.com/send/?phone=918757728679&text&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${isOpen ? 'bg-rich-black text-lavish-gold' : 'bg-gradient-to-r from-secondary to-lavish-gold text-rich-black'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <HiX size={24} /> : <HiChat size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-lavish-gold/20"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-secondary to-lavish-gold p-4 text-rich-black">
              <h3 className="font-semibold">YugaYatra Support</h3>
              <p className="text-xs opacity-80">We typically reply within a few minutes</p>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user' ? 'bg-lavish-gold/20 text-rich-black ml-12' : 'bg-rich-black text-white mr-12'}`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-200 rounded-lg p-3 flex space-x-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input and WhatsApp Button */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <form onSubmit={handleSubmit} className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-lavish-gold/30 rounded-l-lg focus:outline-none focus:border-lavish-gold text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-secondary to-lavish-gold text-rich-black p-2 rounded-r-lg"
                  >
                    <HiPaperAirplane size={20} className="transform rotate-90" />
                  </button>
                </form>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;