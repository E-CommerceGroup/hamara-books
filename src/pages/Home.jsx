import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeadphones, FiBookOpen, FiUsers, FiAward } from 'react-icons/fi';
import BookGrid from '../components/BookGrid';
import { useState, useEffect } from 'react';
import { getBestsellers, getNewArrivals } from '../data/books';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedBooks(getBestsellers().slice(0, 8));
      setNewArrivals(getNewArrivals().slice(0, 4));
      setLoading(false);
    }, 1000);
  }, []);

  const testimonials = [
    {
      name: 'Priya Sharma',
      review: 'Amazing collection of books! Fast delivery and great customer service.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Raj Patel',
      review: 'Found rare books that I couldn\'t find anywhere else. Highly recommend!',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Anita Singh',
      review: 'Love the user-friendly website and the book recommendations are spot on.',
      rating: 5,
      avatar: '👩‍🎓'
    }
  ];

  const stats = [
    { icon: FiBookOpen, label: 'Books Available', value: '50,000+' },
    { icon: FiUsers, label: 'Happy Customers', value: '100,000+' },
    { icon: FiAward, label: 'Awards Won', value: '25+' },
    { icon: FiTruck, label: 'Cities Served', value: '500+' }
  ];

  return (
    <div className="min-h-screen morphing-bg">
      {/* Hero Section with Glassmorphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-warm-brown-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-warm-yellow-300/20 rounded-full blur-3xl floating-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-warm-brown-200/10 to-warm-yellow-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="text-gray-900 dark:text-gray-100">Discover Your Next</span>
                <br />
                <span className="bg-gradient-to-r from-warm-brown-600 via-warm-brown-500 to-warm-yellow-500 bg-clip-text text-transparent font-extrabold">
                  Great Read
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed">
                Explore thousands of books across all genres. From bestsellers to hidden gems, 
                find your perfect book at <span className="font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent">Hamara Books</span> - India's largest online bookstore.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link
                  to="/books"
                  className="btn-primary group"
                >
                  <span className="relative z-10 flex items-center">
                    Browse Books
                    <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/search?q=new releases"
                  className="btn-secondary group"
                >
                  <span className="flex items-center">
                    New Arrivals
                    <FiStar className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
                  alt="Books"
                  className="rounded-xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 glass-card p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">50,000+ Books Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-brown-500 to-warm-brown-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Neumorphism */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Why Choose Hamara Books?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of book shopping with our premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiTruck, title: 'Free Shipping', desc: 'Free delivery on orders over ₹2,075', color: 'from-blue-500 to-cyan-500' },
              { icon: FiShield, title: 'Secure Payment', desc: '100% secure payment processing', color: 'from-green-500 to-emerald-500' },
              { icon: FiHeadphones, title: '24/7 Support', desc: 'Customer support always available', color: 'from-purple-500 to-pink-500' },
              { icon: FiStar, title: 'Quality Books', desc: 'Curated collection of best books', color: 'from-orange-500 to-red-500' }
            ].map((feature, index) => (
              <div key={index} className="neu-card text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Fresh Arrivals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the latest additions to our ever-growing collection
            </p>
          </div>
          <BookGrid books={newArrivals} loading={loading} />
          <div className="text-center mt-12">
            <Link
              to="/search?q=new releases"
              className="btn-secondary group"
            >
              View All New Arrivals
              <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Bestselling Treasures
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of bestsellers and must-read books
            </p>
          </div>
          <BookGrid books={featuredBooks} loading={loading} />
          <div className="text-center mt-12">
            <Link
              to="/search?q=bestsellers"
              className="btn-primary group"
            >
              <span className="relative z-10 flex items-center">
                View All Bestsellers
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Explore by Genre
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find books in your favorite categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Fiction', icon: '📚', gradient: 'from-purple-500 to-pink-500' },
              { name: 'Mystery', icon: '🔍', gradient: 'from-gray-700 to-gray-900' },
              { name: 'Romance', icon: '💕', gradient: 'from-pink-500 to-rose-500' },
              { name: 'Self-Help', icon: '🌟', gradient: 'from-yellow-500 to-orange-500' },
              { name: 'Biography', icon: '👤', gradient: 'from-blue-500 to-indigo-500' },
              { name: 'History', icon: '🏛️', gradient: 'from-amber-600 to-orange-600' }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/search?q=${encodeURIComponent(category.name)}`}
                className="glass-card text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-warm-brown-600 dark:group-hover:text-warm-brown-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Reader Reviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm-brown-500 to-warm-brown-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-warm-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new books, 
              exclusive offers, and reading recommendations.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;