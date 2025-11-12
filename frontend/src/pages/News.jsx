import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary AI Technology Transforms Crop Disease Detection",
      excerpt: "New machine learning algorithms can now identify plant diseases with 98% accuracy, helping farmers prevent crop loss before it's too late.",
      image: "/news1.jpg",
      date: "2024-01-15",
      category: "Technology",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Farming Practices Boost Global Food Security",
      excerpt: "Innovative irrigation techniques and precision agriculture are helping farmers produce more food while using fewer resources.",
      image: "/news2.webp",
      date: "2024-01-12",
      category: "Sustainability",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 3,
      title: "Market Trends: Organic Produce Demand Surges 25%",
      excerpt: "Consumer preference for organic foods continues to grow, creating new opportunities for farmers adopting sustainable practices.",
      image: "/news3.jpg",
      date: "2024-01-10",
      category: "Market Analysis",
      readTime: "6 min read",
      featured: false
    }
  ];

  const categories = ["All", "Technology", "Sustainability", "Market Analysis"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = selectedCategory === "All"
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Agricultural News & Insights
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Stay informed with the latest developments in agriculture, technology, and sustainable farming
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full animate-fadeIn" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Story</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                      {featuredArticle.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredArticle.date}</span>
                    <span className="text-gray-500 text-sm ml-4">{featuredArticle.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.filter(article => !article.featured).map((article, index) => (
            <div
              key={article.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm">{article.date}</span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <button className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gray-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 text-gray-300">
            Subscribe to our newsletter for the latest agricultural news and insights
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
              Subscribe
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default News;
