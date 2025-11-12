import React, { useEffect, useState } from 'react';
import "./App.css";
import Header from './pages/Header';
import HeroSection from './pages/HeroSection';
import Agriinfo from './pages/OrganicFarmUI';
import Dashboard from './pages/AgriDashboard';
import AgriNewsSection from './pages/AgriNewsSection';
import PlantDiseaseDetection from './pages/PlantDiseaseDetection';
import MarketPrediction from './pages/MarketPrediction';
import WeatherForecast from './pages/WeatherForecast';
import StorageForm from "./components/StorageForm";
import Marketplace from "./components/Marketplace";
import SoilPredictor from './pages/SoilPredictor';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApiTestPage from './pages/ApiTestPage';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import Services from './pages/Services';
import News from './pages/News';
import ContactUs from './pages/ContactUs';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-smart-green mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoaded(true);

    // Scroll to top on route change
    window.scrollTo(0, 0);

    const checkVisibility = () => {
      const sections = document.querySelectorAll('.scroll-reveal');
      const windowHeight = window.innerHeight;

      sections.forEach(section => {
        const boundingRect = section.getBoundingClientRect();
        if (boundingRect.top < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };

    setTimeout(checkVisibility, 100);

    let scrollTimeout;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          checkVisibility();
          scrollTimeout = null;
        }, 10);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [location]);

  return (
    <div className={`App ${loaded ? 'app-loaded' : ''}`}>
      <div className="header-container">
        <Header />
      </div>

      <Routes>
        <Route path="/disease-detection" element={<ProtectedRoute><PlantDiseaseDetection /></ProtectedRoute>} />
        <Route path="/market-predection" element={<ProtectedRoute><MarketPrediction /></ProtectedRoute>} />
        <Route path="/weather-predection" element={<ProtectedRoute><WeatherForecast /></ProtectedRoute>} />
        <Route path="/StorageForm" element={<ProtectedRoute><StorageForm /></ProtectedRoute>} />
        <Route path="/Marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/SoilPredictor" element={<ProtectedRoute><SoilPredictor /></ProtectedRoute>} />
        <Route path="/api-test" element={<ApiTestPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={
          <div className="content-container">
            <div className="scroll-reveal">
              <HeroSection />
            </div>
            <div className="scroll-reveal">
              <Agriinfo />
            </div>
            <div className="scroll-reveal">
              <Dashboard />
            </div>
            <div className="scroll-reveal">
              <AgriNewsSection />
            </div>
          </div>
        } />
        <Route path="/AgriDashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;