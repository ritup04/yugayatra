import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Home/Hero';
import About from './components/Home/About';
import Services from './components/Home/Services';
import Analytics from './components/Home/Analytics';
import Blog from './components/Home/Blog';
import FAQ from './components/Home/FAQ';
import News from './components/Home/News';
import Alumni from './components/Home/Alumni';
import Footer from './components/Footer/Footer';
import ChatWidget from './components/Chat/ChatWidget';
import AchievementsSection from './components/Home/AchievementsSection';
import ProjectsSection from './components/Home/ProjectsSection';
import QuizSection from './components/Home/QuizSection';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';
import Disclaimer from './components/Pages/Disclaimer';
import SiteMap from './components/Pages/SiteMap';
import AchievementDetail from './components/Pages/AchievementDetail';
import InternshipForm from './components/Pages/InternshipForm';
import AdminInternships from './components/Pages/AdminInternships';
import AdminDashboard from './components/Pages/AdminDashboard';
import TestTerms from './components/Pages/TestTerms';
import Test from './components/Pages/Test';
import Quiz from './components/Pages/Quiz';
import PaymentPage from './components/Pages/PaymentPage';
import Result from './components/Pages/Result';
import Profile from './components/Pages/Profile';
import './App.css';
import Contact from './components/Home/Contact';
import SignUp from './components/Pages/SignUp';
import SignIn from './components/Pages/SignIn';
import ForgotPassword from './components/Pages/ForgotPassword';
import ResetPassword from './components/Pages/ResetPassword';
import TwoFactorAuth from './components/Pages/TwoFactorAuth';
// import TimelineSection from './components/Home/TimelineSection';

// Custom hook for handling animations
const useAnimationObserver = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      // Intersection Observer for fade-in animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
      });

      // Observe all fade-in elements
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        // Reset the animation by removing the visible class first
        element.classList.remove('visible');
        observer.observe(element);
      });

      return () => {
        observer.disconnect();
      };
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run when route changes
};

function AppContent() {
  useAnimationObserver();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={
          <div className="main-container">
            <main>
              <section className="section">
                <div className="grid-container">
                  <Hero />
                </div>
              </section>
              
              <About />
              <Services />
              <Analytics />
              <Blog />
              {/* <TimelineSection/> */}
              <News />
              <Alumni />
              <AchievementsSection/>
              <ProjectsSection/>
              <QuizSection/>
              <FAQ />
            </main>
            <Footer />
            <ChatWidget />
          </div>
        } />

        {/* Footer Link Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/site-map" element={<SiteMap />} />
        <Route path="/contact" element={<Contact />} />
        {/* Achievement Detail Page */}
        <Route path="/achievement/:id" element={<AchievementDetail />} />
        
        {/* Internship Application Page */}
        <Route path="/internship-application" element={<InternshipForm />} />
        {/* Admin Internship Applications Page */}
        <Route path="/admin/internships" element={<AdminInternships />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Test Terms and Conditions Page */}
        <Route path="/test-terms" element={<TestTerms />} />
        {/* Payment Page */}
        <Route path="/payment" element={<PaymentPage />} />
        {/* Test Page */}
        <Route path="/test" element={<Test />} />
        {/* Quiz Page */}
        <Route path="/quiz" element={<Quiz />} />
        {/* Result Page */}
        <Route path="/result/:resultId" element={<Result />} />
        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        {/* Auth Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppContent />
    </Router>
  );
}

export default App;