import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiLogOut, FiHeart, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Get display name with fallback
  const getDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      // Extract name from email (before @)
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
      {/* Premium Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Glass background with blur effect */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/30"></div>
        
        {/* Gradient overlay for premium effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown-50/50 via-transparent to-warm-yellow-50/50 dark:from-gray-800/30 dark:via-transparent dark:to-gray-700/30"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 shadow-lg shadow-warm-brown-500/10 dark:shadow-gray-900/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Premium Logo with enhanced styling */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Main logo with premium glass effect */}
                <div className="w-14 h-14 bg-gradient-to-br from-warm-brown-500 via-warm-brown-600 to-warm-brown-700 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/20">
                  <span className="text-white font-bold text-2xl font-serif drop-shadow-lg">📚</span>
                </div>
                
                {/* Animated glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-warm-brown-400 to-warm-yellow-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
                
                {/* Premium indicator dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-warm-yellow-400 to-warm-yellow-500 rounded-full animate-pulse shadow-lg border-2 border-white dark:border-gray-800"></div>
              </div>
              
              <div className="flex flex-col">
                {/* Enhanced brand name */}
                <div className="flex items-center space-x-1">
                  <span className="text-3xl font-bold bg-gradient-to-r from-warm-brown-700 via-warm-brown-600 to-warm-brown-500 bg-clip-text text-transparent dark:from-warm-brown-300 dark:via-warm-brown-200 dark:to-warm-brown-100 font-serif tracking-wide drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
                    Hamara
                  </span>
                  <span className="text-3xl font-bold text-warm-brown-800 dark:text-warm-brown-200 font-serif tracking-wide drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
                    Books
                  </span>
                </div>
                {/* Premium tagline */}
                <span className="text-xs text-warm-brown-600 dark:text-warm-brown-400 font-semibold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  India's Book Heaven
                </span>
              </div>
            </Link>

            {/* Premium Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                {/* Glass search container */}
                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-600/30 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books, authors..."
                    className="w-full px-6 py-4 pl-14 pr-6 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-warm-brown-500/50 transition-all duration-300"
                  />
                  <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-warm-brown-500 dark:text-warm-brown-400 w-5 h-5" />
                  
                  {/* Search button */}
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 text-white px-4 py-2 rounded-xl hover:from-warm-brown-600 hover:to-warm-brown-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Subtle glow effect on focus */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-warm-brown-500/20 to-warm-yellow-500/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
            </form>

            {/* Premium Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Books', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Books' ? '/books' : `/${item.toLowerCase()}`}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 font-medium text-lg group"
                >
                  {item}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-warm-brown-500 to-warm-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Premium User Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle with glass effect */}
              <button
                onClick={toggleTheme}
                className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Wishlist with glass effect */}
              <Link
                to="/wishlist"
                className="relative p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiHeart className="w-5 h-5" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              {/* Cart with glass effect */}
              <Link
                to="/cart"
                className="relative p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiShoppingCart className="w-5 h-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              {/* User Menu with premium styling */}
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/profile" 
                    className="hidden sm:flex items-center px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <FiUser className="w-5 h-5 mr-2" />
                    <span className="font-medium">{getDisplayName()}</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="sm:hidden p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <FiUser className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
                    title="Logout"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-3 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 text-white font-semibold rounded-xl hover:from-warm-brown-600 hover:to-warm-brown-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button with glass effect */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 transition-all duration-300 rounded-xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Premium Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-6">
              {/* Glass container for mobile menu */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-600/30 shadow-2xl p-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search books, authors..."
                      className="w-full px-6 py-4 pl-14 pr-6 bg-white/60 dark:bg-gray-700/60 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-warm-brown-500/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
                    />
                    <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-warm-brown-500 dark:text-warm-brown-400 w-5 h-5" />
                  </div>
                </form>

                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {[
                    { name: 'Books', path: '/books' },
                    { name: 'Blog', path: '/blog' },
                    { name: 'Contact', path: '/contact' }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {currentUser && (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="w-5 h-5 mr-3" />
                        {getDisplayName()}
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Wishlist ({getWishlistCount()})
                      </Link>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-warm-brown-600 dark:hover:text-warm-brown-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 font-medium"
                  >
                    {isDark ? <FiSun className="w-5 h-5 mr-3" /> : <FiMoon className="w-5 h-5 mr-3" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;