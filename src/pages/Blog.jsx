import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiHeart, FiMessageCircle, FiArrowRight } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'reviews', 'author-interviews', 'reading-tips', 'new-releases'];

  // Mock blog posts
  useEffect(() => {
    const mockPosts = [
      {
        id: '1',
        title: '10 Must-Read Books That Will Change Your Perspective',
        excerpt: 'Discover transformative books that challenge conventional thinking and open new pathways of understanding.',
        content: 'Full article content here...',
        author: 'Priya Sharma',
        publishDate: '2024-01-15',
        category: 'reviews',
        image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
        likes: 127,
        comments: 23,
        readTime: '5 min read'
      },
      {
        id: '2',
        title: 'Interview: Bestselling Author Shares Writing Secrets',
        excerpt: 'An exclusive conversation with a renowned author about their creative process and journey to success.',
        content: 'Full article content here...',
        author: 'Rajesh Kumar',
        publishDate: '2024-01-12',
        category: 'author-interviews',
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        likes: 89,
        comments: 15,
        readTime: '8 min read'
      },
      {
        id: '3',
        title: 'How to Build a Reading Habit That Actually Sticks',
        excerpt: 'Evidence-based strategies to help you read more consistently and enjoy the process.',
        content: 'Full article content here...',
        author: 'Anita Singh',
        publishDate: '2024-01-10',
        category: 'reading-tips',
        image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
        likes: 203,
        comments: 41,
        readTime: '6 min read'
      },
      {
        id: '4',
        title: 'New Releases This Month: What to Add to Your TBR',
        excerpt: 'A curated list of the most anticipated book releases hitting shelves this month.',
        content: 'Full article content here...',
        author: 'Vikram Patel',
        publishDate: '2024-01-08',
        category: 'new-releases',
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        likes: 156,
        comments: 28,
        readTime: '4 min read'
      },
      {
        id: '5',
        title: 'The Art of Slow Reading: Quality Over Quantity',
        excerpt: 'Why reading fewer books more thoughtfully might be the key to deeper understanding.',
        content: 'Full article content here...',
        author: 'Meera Gupta',
        publishDate: '2024-01-05',
        category: 'reading-tips',
        image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
        likes: 174,
        comments: 32,
        readTime: '7 min read'
      },
      {
        id: '6',
        title: 'Hidden Gems: Underrated Books You Should Read',
        excerpt: 'Discover amazing books that deserve more recognition and might become your next favorite.',
        content: 'Full article content here...',
        author: 'Arjun Reddy',
        publishDate: '2024-01-03',
        category: 'reviews',
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        likes: 198,
        comments: 37,
        readTime: '5 min read'
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warm-brown-600 to-warm-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The Hamara Books Blog
            </h1>
            <p className="text-xl text-warm-brown-100 max-w-2xl mx-auto">
              Discover insights, reviews, and stories from the world of books. 
              Join our community of passionate readers and writers.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-warm-brown-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-warm-brown-600 bg-warm-brown-100 rounded-full">
                      Featured
                    </span>
                    <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                      {formatCategoryName(filteredPosts[0].category)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 mr-1" />
                        {filteredPosts[0].author}
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-1" />
                        {new Date(filteredPosts[0].publishDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${filteredPosts[0].id}`}
                    className="inline-flex items-center text-warm-brown-600 hover:text-warm-brown-700 font-medium"
                  >
                    Read More
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-warm-brown-600 bg-warm-brown-100 rounded-full">
                    {formatCategoryName(post.category)}
                  </span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-warm-brown-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiHeart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <FiMessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-warm-brown-600 hover:text-warm-brown-700 font-medium text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-warm-brown-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Never Miss a Story
          </h2>
          <p className="text-warm-brown-200 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest book reviews, author interviews, 
            and reading recommendations delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-warm-yellow-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-warm-yellow-500 text-warm-brown-800 font-semibold rounded-lg hover:bg-warm-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;