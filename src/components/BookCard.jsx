import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice) => {
    return (usdPrice * 83).toFixed(0);
  };

  return (
    <div className="book-card group relative">
      {/* Floating badges */}
      <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
        {book.isNew && (
          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
            NEW
          </span>
        )}
        {book.isBestseller && (
          <span className="px-3 py-1 bg-gradient-to-r from-warm-yellow-500 to-orange-500 text-warm-brown-800 text-xs font-bold rounded-full shadow-lg">
            BESTSELLER
          </span>
        )}
        {book.originalPrice && book.originalPrice > book.price && (
          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
            SALE
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button 
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
          isInWishlist(book.id) 
            ? 'bg-red-500/90 text-white shadow-lg' 
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
        }`}
      >
        <FiHeart className={`w-4 h-4 ${isInWishlist(book.id) ? 'fill-current' : ''}`} />
      </button>

      {/* Book image with overlay */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={book.coverImage || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'}
          alt={book.title}
          className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick view button */}
        <Link
          to={`/books/${book.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-gray-100 px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiEye className="w-4 h-4 inline mr-2" />
            Quick View
          </div>
        </Link>
      </div>
      
      {/* Book details */}
      <div className="p-6 space-y-4">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-warm-brown-600 dark:group-hover:text-warm-brown-400 transition-colors text-lg">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 font-medium">{book.author}</p>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < book.rating ? 'text-warm-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({book.reviewsCount || 0})</span>
        </div>
        
        {/* Price and actions */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gradient-primary">₹{convertToINR(book.price)}</span>
              {book.originalPrice && book.originalPrice > book.price && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{convertToINR(book.originalPrice)}</span>
              )}
            </div>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                Save ₹{convertToINR(book.originalPrice - book.price)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!book.inStock}
            className={`p-3 rounded-xl transition-all duration-300 ${
              book.inStock
                ? 'btn-primary hover:scale-110 active:scale-95'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Stock status */}
        <div className="flex items-center justify-between text-sm">
          {book.inStock ? (
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              In Stock
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </span>
          )}
          
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {book.category}
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-warm-brown-500/20 to-warm-yellow-500/20 blur-xl"></div>
      </div>
    </div>
  );
};

export default BookCard;