import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX, FiPackage, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  
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
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: getDisplayName(),
    email: currentUser?.email || 'user@example.com',
    phone: '+91 98765 43210',
    address: 'A-123, Sector 15, Noida, Uttar Pradesh - 201301',
    dateOfBirth: '1990-01-01',
    favoriteGenres: ['Fiction', 'Mystery', 'Self-Help'],
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301'
  });

  // Mock order history with Indian context
  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 1299.97,
      items: 3,
      books: ['The Silent Patient', 'Atomic Habits', 'Educated'],
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 899.98,
      items: 2,
      books: ['The Midnight Library', 'Where the Crawdads Sing'],
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 599.99,
      items: 1,
      books: ['Becoming'],
      paymentMethod: 'COD'
    }
  ];

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, this would update the user profile in Firebase
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      displayName: getDisplayName(),
      email: currentUser?.email || 'user@example.com',
      phone: '+91 98765 43210',
      address: 'A-123, Sector 15, Noida, Uttar Pradesh - 201301',
      dateOfBirth: '1990-01-01',
      favoriteGenres: ['Fiction', 'Mystery', 'Self-Help'],
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301'
    });
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-warm-brown-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{getDisplayName()}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {profileData.city}, {profileData.state}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-warm-brown-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiPackage className="w-6 h-6 text-warm-brown-600" />
                  </div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="font-semibold">{orderHistory.length}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warm-brown-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiHeart className="w-6 h-6 text-warm-brown-600" />
                  </div>
                  <p className="text-sm text-gray-600">Wishlist</p>
                  <p className="font-semibold">{getWishlistCount()}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warm-brown-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FiShoppingCart className="w-6 h-6 text-warm-brown-600" />
                  </div>
                  <p className="text-sm text-gray-600">Cart</p>
                  <p className="font-semibold">{getCartItemsCount()}</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-2">
                <Link
                  to="/wishlist"
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FiHeart className="w-4 h-4 mr-3" />
                  My Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FiShoppingCart className="w-4 h-4 mr-3" />
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-4 py-2 text-warm-brown-600 hover:text-warm-brown-700"
                    >
                      <FiEdit2 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-warm-brown-500 text-white rounded-lg hover:bg-warm-brown-600"
                      >
                        <FiSave className="w-4 h-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <FiX className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.displayName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <FiMail className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {new Date(profileData.dateOfBirth).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="House/Flat No., Street, Area"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-start">
                        <FiMapPin className="w-4 h-4 mr-2 text-gray-400 mt-1" />
                        {profileData.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    {isEditing ? (
                      <select
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      >
                        {indianStates.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">{profileData.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        value={profileData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN code"
                        maxLength="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favorite Genres
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.favoriteGenres.map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-warm-brown-100 text-warm-brown-700 text-sm rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
              </div>

              <div className="divide-y divide-gray-200">
                {orderHistory.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString('en-IN')} • {order.items} items • {order.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Books:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {order.books.map((book, index) => (
                          <li key={index}>{book}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;