import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../components/BookGrid';
import FilterSidebar from '../components/FilterSidebar';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import { booksData } from '../data/books';

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('title');
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    priceMin: null,
    priceMax: null,
    minRating: null
  });

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filteredBooks = [...booksData];

      // Apply filters
      if (filters.categories.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          filters.categories.includes(book.category)
        );
      }

      if (filters.languages.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
          filters.languages.includes(book.language)
        );
      }

      if (filters.priceMin !== null && filters.priceMax !== null) {
        filteredBooks = filteredBooks.filter(book =>
          book.price >= filters.priceMin && book.price <= filters.priceMax
        );
      }

      if (filters.minRating) {
        filteredBooks = filteredBooks.filter(book =>
          book.rating >= filters.minRating
        );
      }

      // Apply sorting
      filteredBooks.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return new Date(b.publishDate || '2024-01-01') - new Date(a.publishDate || '2024-01-01');
          case 'popularity':
            return b.reviewsCount - a.reviewsCount;
          default:
            return a.title.localeCompare(b.title);
        }
      });

      setBooks(filteredBooks);
      setLoading(false);
    }, 500);
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      languages: [],
      priceMin: null,
      priceMax: null,
      minRating: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Books
          </h1>
          <p className="text-lg text-gray-600">
            Discover your next great read from our extensive collection of {booksData.length} books
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <span className="text-sm text-gray-600">
              {books.length} books found
            </span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500"
            >
              <option value="title">Sort by Title</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest First</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-warm-brown-500 text-white' : 'text-gray-600'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-warm-brown-500 text-white' : 'text-gray-600'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Books Grid */}
          <div className="flex-1">
            <BookGrid books={books} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;