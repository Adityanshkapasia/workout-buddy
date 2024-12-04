import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onSort,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSort = (sortBy: string) => {
    setActiveSort(sortBy);
    onSort(sortBy);
  };

  return (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search workouts..."
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
        />
        <button
          type="submit"
          className="p-2 bg-primary-light dark:bg-primary-dark text-white rounded-r-lg hover:bg-opacity-90 transition-colors duration-200"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
      <div className="flex items-center space-x-4">
        <SlidersHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <button
          onClick={() => handleSort("date")}
          className={`px-3 py-1 rounded-full ${
            activeSort === "date"
              ? "bg-accent-light dark:bg-accent-dark text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          } hover:bg-opacity-90 transition-colors duration-200`}
        >
          Date
        </button>
        <button
          onClick={() => handleSort("duration")}
          className={`px-3 py-1 rounded-full ${
            activeSort === "duration"
              ? "bg-accent-light dark:bg-accent-dark text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          } hover:bg-opacity-90 transition-colors duration-200`}
        >
          Duration
        </button>
        <button
          onClick={() => handleSort("popularity")}
          className={`px-3 py-1 rounded-full ${
            activeSort === "popularity"
              ? "bg-accent-light dark:bg-accent-dark text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          } hover:bg-opacity-90 transition-colors duration-200`}
        >
          Popularity
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
