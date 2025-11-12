import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Plant Disease Detection",
      description: "Advanced AI-powered plant disease identification using image recognition technology. Upload photos of your crops to get instant diagnosis and treatment recommendations.",
      icon: "🌿",
      features: ["Instant Diagnosis", "Treatment Plans", "Disease Prevention"],
      route: "/disease-detection"
    },
    {
      id: 2,
      title: "Market Price Prediction",
      description: "Predict future crop prices with our machine learning algorithms. Make informed decisions about when to sell your produce for maximum profit.",
      icon: "📈",
      features: ["Price Forecasting", "Market Trends", "Profit Optimization"],
      route: "/market-predection"
    },
    {
      id: 3,
      title: "Weather Forecasting",
      description: "Accurate weather predictions tailored for agricultural needs. Plan your farming activities with confidence using our advanced meteorological data.",
      icon: "🌤️",
      features: ["7-Day Forecasts", "Crop-Specific Alerts", "Historical Data"],
      route: "/weather-predection"
    },
    {
      id: 4,
      title: "Soil Analysis",
      description: "Comprehensive soil testing and analysis to determine nutrient levels, pH balance, and soil health. Get personalized recommendations for soil improvement.",
      icon: "🌱",
      features: ["Nutrient Analysis", "pH Testing", "Fertilizer Recommendations"],
      route: "/SoilPredictor"
    },
    {
      id: 5,
      title: "Storage Management",
      description: "Smart storage solutions for your agricultural products. Monitor temperature, humidity, and other conditions to ensure optimal storage conditions.",
      icon: "🏭",
      features: ["Climate Control", "Inventory Tracking", "Quality Monitoring"],
      route: "/StorageForm"
    },
    {
      id: 6,
      title: "Marketplace",
      description: "Connect directly with buyers and sellers in our agricultural marketplace. Trade commodities with transparent pricing and secure transactions.",
      icon: "🛒",
      features: ["Direct Trading", "Secure Payments", "Quality Assurance"],
      route: "/Marketplace"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Comprehensive agricultural solutions powered by cutting-edge technology
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full animate-fadeIn" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="text-6xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-center">{service.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(service.route)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose AgriSync?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to revolutionizing agriculture through technology and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Precision Agriculture</h3>
              <p className="text-gray-600">Data-driven farming decisions for optimal results</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Insights</h3>
              <p className="text-gray-600">Instant access to critical farming information</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Solutions</h3>
              <p className="text-gray-600">Eco-friendly practices for long-term agricultural success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of farmers who have improved their productivity and profitability with our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact-us')}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Contact Us Today
            </button>
            <button
              onClick={() => navigate('/about-us')}
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => navigate('/')}
          className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Services;
