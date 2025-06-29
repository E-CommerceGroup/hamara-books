import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any books yet.</p>
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 bg-warm-brown-500 text-white font-semibold rounded-lg hover:bg-warm-brown-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const convertToINR = (usdPrice) => {
    // Convert USD to INR (approximate rate: 1 USD = 83 INR)
    return (usdPrice * 83).toFixed(0);
  };

  const cartTotalINR = getCartTotal() * 83;
  const freeShippingThreshold = 25 * 83; // ₹2075
  const shippingCost = cartTotalINR > freeShippingThreshold ? 0 : 99;
  const gstRate = 0.18; // 18% GST
  const gstAmount = cartTotalINR * gstRate;
  const finalTotal = cartTotalINR + shippingCost + gstAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Shopping Cart ({items.length} items)
                  </h1>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Book Image */}
                      <img
                        src={item.coverImage || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />

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
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{convertToINR(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{convertToINR(item.price)} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cartTotalINR.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">
                    ₹{gstAmount.toFixed(0)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">
                      ₹{finalTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {cartTotalINR < freeShippingThreshold && (
                <div className="bg-warm-yellow-50 border border-warm-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-warm-yellow-800">
                    Add ₹{(freeShippingThreshold - cartTotalINR).toFixed(0)} more for free shipping!
                  </p>
                </div>
              )}

              <button className="w-full bg-warm-brown-500 text-white font-semibold py-3 rounded-lg hover:bg-warm-brown-600 transition-colors mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/books"
                className="block w-full text-center border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">We Accept</h3>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="px-2 py-1 bg-white rounded">UPI</span>
                  <span className="px-2 py-1 bg-white rounded">Cards</span>
                  <span className="px-2 py-1 bg-white rounded">Net Banking</span>
                  <span className="px-2 py-1 bg-white rounded">Wallets</span>
                  <span className="px-2 py-1 bg-white rounded">COD</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-soft-beige-50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Free shipping on orders over ₹2,075</li>
                <li>• Standard delivery: 3-7 business days</li>
                <li>• Express delivery available in major cities</li>
                <li>• Cash on Delivery available</li>
                <li>• Easy returns within 15 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;