import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import BookGrid from '../components/BookGrid';
import FilterSidebar from '../components/FilterSidebar';
import { searchBooks, getCategories, getAuthors } from '../data/books';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    priceMin: null,
    priceMax: null,
    minRating: null
  });

  const categories = getCategories();
  const authors = getAuthors();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      let results = searchBooks(query);
      
      // Apply filters
      if (filters.categories.length > 0) {
        results = results.filter(book =>
          filters.categories.includes(book.category)
        );
      }

      if (filters.priceMin !== null && filters.priceMax !== null) {
        results = results.filter(book =>
          book.price >= filters.priceMin && book.price <= filters.priceMax
        );
      }

      if (filters.minRating) {
        results = results.filter(book =>
          book.rating >= filters.minRating
        );
      }

      setBooks(results);
      setLoading(false);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
      // Generate suggestions
      const bookSuggestions = searchBooks(value).slice(0, 5).map(book => ({
        type: 'book',
        text: book.title,
        author: book.author,
        id: book.id
      }));

      const authorSuggestions = authors
        .filter(author => author.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3)
        .map(author => ({
          type: 'author',
          text: author
        }));

      const categorySuggestions = categories
        .filter(category => category.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 2)
        .map(category => ({
          type: 'category',
          text: category
        }));

      setSuggestions([...bookSuggestions, ...authorSuggestions, ...categorySuggestions]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'book') {
      // Navigate to book detail page
      window.location.href = `/books/${suggestion.id}`;
    } else {
      setSearchQuery(suggestion.text);
      setSearchParams({ q: suggestion.text });
      setShowSuggestions(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      languages: [],
      priceMin: null,
      priceMax: null,
      minRating: null
    });
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setBooks([]);
    setSearchParams({});
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Search Books
          </h1>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                  placeholder="Search books, authors, categories..."
                  className="w-full px-4 py-4 pl-12 pr-20 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-warm-brown-500 text-white rounded-md hover:bg-warm-brown-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900">{suggestion.text}</span>
                        {suggestion.author && (
                          <span className="text-sm text-gray-500 ml-2">by {suggestion.author}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 capitalize">
                        {suggestion.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Results Header */}
        {searchQuery && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Search results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                {loading ? 'Searching...' : `${books.length} books found`}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        )}

        {searchQuery ? (
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Search Results */}
            <div className="flex-1">
              {loading ? (
                <BookGrid books={[]} loading={true} />
              ) : books.length > 0 ? (
                <BookGrid books={books} />
              ) : searchQuery ? (
                <div className="text-center py-12">
                  <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No books found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <Link
                    to="/books"
                    className="inline-flex items-center px-6 py-3 bg-warm-brown-500 text-white font-semibold rounded-lg hover:bg-warm-brown-600 transition-colors"
                  >
                    Browse All Books
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          /* Search Suggestions when no query */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category}
                    to={`/search?q=${encodeURIComponent(category)}`}
                    className="block text-warm-brown-600 hover:text-warm-brown-700 hover:underline"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Authors</h3>
              <div className="space-y-2">
                {authors.slice(0, 6).map((author) => (
                  <Link
                    key={author}
                    to={`/search?q=${encodeURIComponent(author)}`}
                    className="block text-warm-brown-600 hover:text-warm-brown-700 hover:underline"
                  >
                    {author}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Searches</h3>
              <div className="space-y-2">
                {['bestsellers', 'new releases', 'fiction', 'mystery', 'self-help', 'biography'].map((term) => (
                  <Link
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="block text-warm-brown-600 hover:text-warm-brown-700 hover:underline capitalize"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;