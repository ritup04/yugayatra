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
import TestTerms from './components/Pages/TestTerms';
import Test from './components/Pages/Test';
import Quiz from './components/Pages/Quiz';
import './App.css';
import Contact from './components/Home/Contact';
// import TimelineSection from './components/Home/TimelineSection';

function App() {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
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
        {/* Test Terms and Conditions Page */}
        <Route path="/test-terms" element={<TestTerms />} />
        {/* Test Page */}
        <Route path="/test" element={<Test />} />
        {/* Quiz Page */}
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;