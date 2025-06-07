import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import MovieCard from '../components/MovieCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const q = useQuery();
  const searchTerm = q.get('q')?.toLowerCase() || '';
  const genreParam = q.get('genre')?.toLowerCase() || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'movies'));
        const allMovies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const filtered = allMovies.filter(movie => {
          const titleMatch = movie.title?.toLowerCase().includes(searchTerm);
          const genreMatch = genreParam
            ? movie.genres?.toLowerCase().includes(genreParam)
            : true;
          return titleMatch && genreMatch;
        });

        setResults(filtered);
      } catch (err) {
        console.error('Error searching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, genreParam]);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <button
              disabled
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition transform hover:bg-red-700 cursor-wait"
            >
              <span className="animate-spin inline-block mr-3 w-5 h-5 border-4 border-t-transparent border-white rounded-full"></span>
              Loading...
            </button>
          </div>
        ) : results.length === 0 ? (
          <p className="text-center text-xl text-gray-300">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
