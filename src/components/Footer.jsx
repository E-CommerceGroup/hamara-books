import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-warm-brown-800 dark:bg-gray-900 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                {/* Enhanced logo for footer */}
                <div className="w-10 h-10 bg-gradient-to-br from-warm-yellow-400 via-warm-yellow-500 to-warm-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-warm-brown-800 font-bold text-xl font-serif">📚</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-warm-brown-300 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold text-warm-yellow-400 font-serif tracking-wide shadow-lg">
                    Hamara
                  </span>
                  <span className="text-xl font-bold text-white font-serif tracking-wide">
                    Books
                  </span>
                </div>
                <span className="text-xs text-warm-brown-300 font-medium tracking-widest uppercase opacity-75">
                  India's Book Heaven
                </span>
              </div>
            </div>
            <p className="text-warm-brown-200 mb-4">
              Your one-stop destination for all kinds of books. Discover, read, and grow with Hamara Books.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=bestsellers" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/books?category=new-arrivals" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-warm-brown-200 hover:text-warm-yellow-400 transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-warm-yellow-400" />
                <span className="text-warm-brown-200">123 Book Street, Connaught Place, New Delhi - 110001</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4 text-warm-yellow-400" />
                <span className="text-warm-brown-200">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-warm-yellow-400" />
                <span className="text-warm-brown-200">info@hamarabooks.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-brown-700 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-brown-200 text-sm">
            © 2025 Hamara Books. All rights reserved. | Made in India 🇮🇳
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-warm-brown-200 hover:text-warm-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-warm-brown-200 hover:text-warm-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;