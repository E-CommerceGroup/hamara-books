import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    language: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Biography', 'History', 'Self-Help', 'Children', 'Educational'
  ];

  const languages = ['English', 'Hindi', 'Urdu', 'Bengali', 'Tamil', 'Telugu'];

  const priceRanges = [
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $25', min: 10, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: 'Over $50', min: 50, max: 999 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-warm-brown-600 hover:text-warm-brown-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            Category
            {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category) || false}
                    onChange={(e) => {
                      const categories = filters.categories || [];
                      if (e.target.checked) {
                        onFilterChange({
                          ...filters,
                          categories: [...categories, category]
                        });
                      } else {
                        onFilterChange({
                          ...filters,
                          categories: categories.filter(c => c !== category)
                        });
                      }
                    }}
                    className="mr-2 text-warm-brown-500 focus:ring-warm-brown-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            Price Range
            {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.price && (
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.label} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceMin === range.min && filters.priceMax === range.max}
                    onChange={() => {
                      onFilterChange({
                        ...filters,
                        priceMin: range.min,
                        priceMax: range.max
                      });
                    }}
                    className="mr-2 text-warm-brown-500 focus:ring-warm-brown-500"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            Rating
            {expandedSections.rating ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.rating && (
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => {
                      onFilterChange({
                        ...filters,
                        minRating: rating
                      });
                    }}
                    className="mr-2 text-warm-brown-500 focus:ring-warm-brown-500"
                  />
                  <span className="text-sm text-gray-700">{rating}+ Stars</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Language Filter */}
        <div>
          <button
            onClick={() => toggleSection('language')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
          >
            Language
            {expandedSections.language ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.language && (
            <div className="space-y-2">
              {languages.map((language) => (
                <label key={language} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.languages?.includes(language) || false}
                    onChange={(e) => {
                      const languages = filters.languages || [];
                      if (e.target.checked) {
                        onFilterChange({
                          ...filters,
                          languages: [...languages, language]
                        });
                      } else {
                        onFilterChange({
                          ...filters,
                          languages: languages.filter(l => l !== language)
                        });
                      }
                    }}
                    className="mr-2 text-warm-brown-500 focus:ring-warm-brown-500"
                  />
                  <span className="text-sm text-gray-700">{language}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;