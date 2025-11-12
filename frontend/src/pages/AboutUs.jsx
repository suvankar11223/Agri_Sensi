import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Agronomist",
      image: "👩‍🔬",
      description: "PhD in Agricultural Sciences with 15+ years of experience in sustainable farming practices."
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      image: "👨‍💻",
      description: "Expert in AI and machine learning applications for agricultural optimization."
    },
    {
      name: "Dr. Priya Patel",
      role: "Plant Pathologist",
      image: "👩‍⚕️",
      description: "Specialist in plant disease diagnosis and treatment with extensive research background."
    },
    {
      name: "James Rodriguez",
      role: "Farm Operations Manager",
      image: "👨‍🌾",
      description: "Former commercial farmer turned technology advocate for modern agriculture."
    }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to environmentally friendly farming practices that preserve our planet for future generations."
    },
    {
      icon: "🔬",
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize traditional agricultural methods."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Working together with farmers, researchers, and communities to build a better agricultural future."
    },
    {
      icon: "📈",
      title: "Growth",
      description: "Empowering farmers with tools and knowledge to increase productivity and profitability."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white py-20 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="absolute left-6 top-6 text-white hover:text-green-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-green-200">AgriSync</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing agriculture through technology, sustainability, and innovation for a better tomorrow.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To empower farmers and agricultural communities worldwide with cutting-edge technology,
              data-driven insights, and sustainable practices that ensure food security, environmental
              stewardship, and economic prosperity for generations to come.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className={`bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16 transition-all duration-1000 delay-800 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2020, AgriSync emerged from a simple observation: traditional farming methods
                    were struggling to keep pace with growing global demands and environmental challenges.
                    Our founders, a team of agricultural experts and technology innovators, saw an opportunity
                    to bridge this gap.
                  </p>
                  <p>
                    What started as a small research project has grown into a comprehensive platform that
                    serves thousands of farmers across multiple continents. We combine artificial intelligence,
                    IoT sensors, satellite imagery, and traditional agricultural knowledge to create solutions
                    that are both technologically advanced and practically applicable.
                  </p>
                  <p>
                    Today, AgriSync stands at the forefront of agricultural innovation, committed to sustainable
                    farming practices that protect our environment while ensuring food security for a growing
                    global population.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🌾</div>
                <div className="bg-green-100 rounded-full p-6 inline-block">
                  <div className="text-6xl">🚀</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className={`text-center mb-16 transition-all duration-1000 delay-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="text-6xl mb-4 text-center">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className={`bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 md:p-12 text-white text-center transition-all duration-1000 delay-1200 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-green-200">Farmers Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-green-200">Hectares Optimized</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30%</div>
                <div className="text-green-200">Yield Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-green-200">Water Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
