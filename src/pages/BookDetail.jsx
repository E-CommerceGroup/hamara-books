import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import BookGrid from '../components/BookGrid';
import { getBookById, getRelatedBooks } from '../data/books';
import toast from 'react-hot-toast';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundBook = getBookById(id);
      if (foundBook) {
        setBook(foundBook);
        setRelatedBooks(getRelatedBooks(id, foundBook.category));
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart(book);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toast.success('Added to cart! Redirecting to checkout...');
  };

  const handleWishlistToggle = () => {
    if (book) {
      if (isInWishlist(book.id)) {
        removeFromWishlist(book.id);
      } else {
        addToWishlist(book);
      }
    }
  };

  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const convertToINR = (usdPrice) => {
    return (usdPrice * 83).toFixed(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-32 h-48 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
          <Link to="/books" className="text-warm-brown-600 hover:text-warm-brown-700">
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  // Mock reviews for demonstration
  const reviews = [
    {
      id: 1,
      user: 'Priya M.',
      rating: 5,
      comment: 'Absolutely gripping! Could not put it down.',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Rahul D.',
      rating: 4,
      comment: 'Great psychological thriller with an unexpected twist.',
      date: '2024-01-10'
    },
    {
      id: 3,
      user: 'Anita R.',
      rating: 5,
      comment: 'One of the best books I\'ve read this year!',
      date: '2024-01-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-warm-brown-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/books" className="hover:text-warm-brown-600">Books</Link></li>
            <li>/</li>
            <li className="text-gray-900">{book.title}</li>
          </ol>
        </nav>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="flex justify-center">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-w-md h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Book Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < book.rating ? 'text-warm-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {book.rating} ({book.reviewsCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-warm-brown-700">
                  ₹{convertToINR(book.price)}
                </span>
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{convertToINR(book.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {book.inStock ? (
                  <span className="text-green-600 font-medium">
                    ✓ In Stock ({book.stockCount} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-warm-brown-500 text-white font-semibold rounded-lg hover:bg-warm-brown-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!book.inStock}
                  className="flex-1 px-6 py-3 bg-warm-yellow-500 text-warm-brown-800 font-semibold rounded-lg hover:bg-warm-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleWishlistToggle}
                  className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                    isInWishlist(book.id)
                      ? 'border-red-300 text-red-600 bg-red-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiHeart className={`w-4 h-4 mr-2 ${isInWishlist(book.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(book.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiShare2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex space-x-8 px-8">
              {['description', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab
                      ? 'border-warm-brown-500 text-warm-brown-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="px-8 py-6">
              {selectedTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {book.description}
                  </p>
                </div>
              )}

              {selectedTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Book Details</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex">
                        <dt className="w-24 text-gray-600">Pages:</dt>
                        <dd className="text-gray-900">{book.pages}</dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 text-gray-600">Publisher:</dt>
                        <dd className="text-gray-900">{book.publisher}</dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 text-gray-600">Published:</dt>
                        <dd className="text-gray-900">{new Date(book.publishDate).toLocaleDateString('en-IN')}</dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 text-gray-600">ISBN:</dt>
                        <dd className="text-gray-900">{book.isbn}</dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 text-gray-600">Language:</dt>
                        <dd className="text-gray-900">{book.language}</dd>
                      </div>
                      <div className="flex">
                        <dt className="w-24 text-gray-600">Category:</dt>
                        <dd className="text-gray-900">{book.category}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4">Customer Reviews</h4>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex items-center ml-2">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-warm-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Related Books
          </h2>
          <BookGrid books={relatedBooks} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;