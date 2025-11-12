import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 1,
      title: "Smart Crop Monitoring System",
      description: "AI-powered crop health monitoring using drone technology and machine learning algorithms to predict and prevent crop diseases.",
      image: "/farm.avif",
      status: "Active",
      technologies: ["AI/ML", "IoT", "Drone Tech"],
      impact: "Reduced crop loss by 35%",
      fullDescription: "Our Smart Crop Monitoring System revolutionizes agricultural practices by integrating cutting-edge AI and drone technology. The system employs advanced machine learning algorithms to analyze crop health in real-time, detecting early signs of diseases, nutrient deficiencies, and pest infestations. Drones equipped with high-resolution cameras and multispectral sensors capture detailed imagery, which is processed through our proprietary AI models to provide actionable insights to farmers.",
      features: [
        "Real-time crop health analysis",
        "Early disease detection and prevention",
        "Automated drone flight planning",
        "Mobile app integration for on-the-go monitoring",
        "Historical data tracking and trend analysis",
        "Weather integration for predictive insights"
      ],
      benefits: [
        "35% reduction in crop loss",
        "Early intervention saves time and resources",
        "Increased yield through optimized farming practices",
        "Data-driven decision making",
        "Scalable solution for farms of all sizes"
      ],
      challenges: "Integration with existing farm management systems, ensuring data privacy and security."
    },
    {
      id: 2,
      title: "Precision Irrigation Network",
      description: "Automated irrigation system that optimizes water usage based on soil moisture levels, weather forecasts, and crop requirements.",
      image: "/farms.avif",
      status: "Completed",
      technologies: ["IoT Sensors", "Weather API", "Automation"],
      impact: "Saved 40% water consumption",
      fullDescription: "The Precision Irrigation Network is a comprehensive solution designed to optimize water usage in agriculture. By combining IoT sensors, weather data, and intelligent automation, the system delivers the right amount of water at the right time to each crop. This not only conserves water but also improves crop quality and yield while reducing operational costs for farmers.",
      features: [
        "Soil moisture sensors with real-time monitoring",
        "Weather forecast integration",
        "Automated valve control systems",
        "Crop-specific irrigation scheduling",
        "Mobile and web dashboard for remote management",
        "Energy-efficient pump control"
      ],
      benefits: [
        "40% reduction in water consumption",
        "Improved crop quality and yield",
        "Reduced operational costs",
        "Environmental sustainability",
        "Scalable for large agricultural operations"
      ],
      challenges: "Sensor calibration for different soil types, integration with existing irrigation infrastructure."
    },
    {
      id: 3,
      title: "Market Price Prediction Platform",
      description: "Advanced analytics platform that predicts crop prices using historical data, market trends, and external factors.",
      image: "/news1.jpg",
      status: "Active",
      technologies: ["Data Analytics", "Machine Learning", "Blockchain"],
      impact: "Improved farmer income by 25%",
      fullDescription: "Our Market Price Prediction Platform empowers farmers and traders with accurate crop price forecasts. Using advanced machine learning algorithms and comprehensive market data analysis, the platform predicts price fluctuations based on historical trends, weather patterns, global market conditions, and other economic factors. This enables informed decision-making for planting, harvesting, and selling crops.",
      features: [
        "AI-powered price prediction models",
        "Real-time market data integration",
        "Historical price trend analysis",
        "Weather impact assessment",
        "Global market news aggregation",
        "Personalized recommendations for farmers"
      ],
      benefits: [
        "25% improvement in farmer income",
        "Reduced risk of price volatility",
        "Optimized harvest timing",
        "Better market timing for sales",
        "Increased profitability and financial stability"
      ],
      challenges: "Accurate prediction of external market factors, real-time data processing at scale."
    },
    {
      id: 4,
      title: "Farm-to-Table Traceability",
      description: "Blockchain-based supply chain tracking system ensuring transparency from farm to consumer with quality assurance.",
      image: "/news2.webp",
      status: "In Development",
      technologies: ["Blockchain", "IoT", "Mobile App"],
      impact: "Enhanced food safety standards",
      fullDescription: "The Farm-to-Table Traceability system creates an immutable record of every step in the agricultural supply chain using blockchain technology. From seed planting to consumer purchase, every transaction, quality check, and transportation event is recorded on the blockchain, ensuring complete transparency and accountability. This builds consumer trust and enables rapid response to any quality or safety issues.",
      features: [
        "Blockchain-based immutable ledger",
        "IoT sensor integration for quality monitoring",
        "Mobile app for farmers and consumers",
        "Real-time supply chain tracking",
        "Automated quality assurance checks",
        "Consumer verification portal"
      ],
      benefits: [
        "Complete supply chain transparency",
        "Enhanced food safety and quality",
        "Rapid issue identification and resolution",
        "Increased consumer trust",
        "Premium pricing opportunities"
      ],
      challenges: "Blockchain scalability, integration with existing supply chain systems, user adoption."
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Innovative agricultural solutions transforming farming practices worldwide
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full animate-fadeIn" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Active' ? 'bg-green-500 text-white' :
                    project.status === 'Completed' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-green-600 font-semibold">
                    <span className="text-2xl">{project.impact}</span>
                  </div>
                  <button
                    onClick={() => openModal(project)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of farmers who have revolutionized their agricultural practices with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact-us')}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Get Started Today
            </button>
            <button
              onClick={() => navigate('/services')}
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Explore Services
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

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              {/* Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.status === 'Active' ? 'bg-green-500 text-white' :
                    selectedProject.status === 'Completed' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {selectedProject.status}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-green-300 font-semibold text-lg">{selectedProject.impact}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.fullDescription}</p>

                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Challenges Addressed</h4>
                    <p className="text-gray-600">{selectedProject.challenges}</p>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Projects;
