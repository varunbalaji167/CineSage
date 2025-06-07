import React from 'react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  genres,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-black/50 backdrop-blur-md p-4 rounded-lg shadow-md">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by movie title..."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* Genre Dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="flex-1 md:max-w-xs px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      >
        <option value="">All Genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;