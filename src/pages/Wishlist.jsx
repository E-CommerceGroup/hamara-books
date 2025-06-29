import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book.id);
  };

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice) => {
    return (usdPrice * 83).toFixed(0);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiHeart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save books you're interested in to your wishlist.</p>
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 bg-warm-brown-500 text-white font-semibold rounded-lg hover:bg-warm-brown-600 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                My Wishlist ({items.length} items)
              </h1>
              <button
                onClick={clearWishlist}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear Wishlist
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Book Image */}
                  <Link to={`/books/${item.id}`}>
                    <img
                      src={item.coverImage || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded-lg hover:opacity-75 transition-opacity"
                    />
                  </Link>

                  {/* Book Details */}
                  <div className="flex-1">
                    <Link
                      to={`/books/${item.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-warm-brown-600"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-600 mt-1">{item.author}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating ? 'text-warm-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({item.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{convertToINR(item.price)}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{convertToINR(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    {item.inStock ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className="flex items-center justify-center px-4 py-2 bg-warm-brown-500 text-white text-sm font-medium rounded-lg hover:bg-warm-brown-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex items-center justify-center px-4 py-2 text-red-600 border border-red-300 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;