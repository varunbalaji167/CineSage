// import React, { useEffect, useState } from 'react';
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   startAfter,
// } from 'firebase/firestore';
// import { db } from '../firebase';
// import MovieCard from './MovieCard';

// const MoviesList = () => {
//   const [movies, setMovies] = useState([]);
//   const [filter, setFilter] = useState('revenue');
//   const [lastVisible, setLastVisible] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Fetch movies (initial or paginated)
//   const fetchMovies = async ({ isLoadMore = false } = {}) => {
//     const moviesRef = collection(db, 'movies');

//     const q = isLoadMore && lastVisible
//       ? query(moviesRef, orderBy(filter, 'desc'), startAfter(lastVisible), limit(20))
//       : query(moviesRef, orderBy(filter, 'desc'), limit(20));

//     try {
//       isLoadMore ? setLoadingMore(true) : setLoading(true);

//       const snapshot = await getDocs(q);
//       const newMovies = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       if (isLoadMore) {
//         setMovies(prev => [...prev, ...newMovies]);
//       } else {
//         setMovies(newMovies);
//       }

//       // Update last visible for pagination
//       const lastDoc = snapshot.docs[snapshot.docs.length - 1];
//       setLastVisible(lastDoc);

//       // If less than 20 docs, no more to fetch
//       setHasMore(snapshot.docs.length === 20);
//     } catch (err) {
//       console.error('Error fetching movies:', err);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // On filter change, reset everything
//   useEffect(() => {
//     setMovies([]);
//     setLastVisible(null);
//     setHasMore(true);
//     fetchMovies(); // Fetch new sorted movies
//   }, [filter]);

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Top Movies by {filter}</h1>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border px-3 py-1 rounded"
//         >
//           <option value="revenue">Revenue</option>
//           <option value="budget">Budget</option>
//           <option value="popularity">Popularity</option>
//           <option value="runtime">Runtime</option>
//         </select>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading movies...</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {movies.map(movie => (
//               <MovieCard key={movie.id} movie={movie} />
//             ))}
//           </div>

//           {hasMore && (
//             <div className="text-center mt-6">
//               <button
//                 onClick={() => fetchMovies({ isLoadMore: true })}
//                 disabled={loadingMore}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 {loadingMore ? 'Loading more...' : 'Load More'}
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default MoviesList;

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import MovieCard from "./MovieCard";
import LoaderButton from "./LoaderButton";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("revenue");
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movies (initial or paginated)
  const fetchMovies = async ({ isLoadMore = false } = {}) => {
    const moviesRef = collection(db, "movies");

    const q =
      isLoadMore && lastVisible
        ? query(
            moviesRef,
            orderBy(filter, "desc"),
            startAfter(lastVisible),
            limit(20)
          )
        : query(moviesRef, orderBy(filter, "desc"), limit(20));

    try {
      isLoadMore ? setLoadingMore(true) : setLoading(true);

      const snapshot = await getDocs(q);
      const newMovies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (isLoadMore) {
        setMovies((prev) => [...prev, ...newMovies]);
      } else {
        setMovies(newMovies);
      }

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastDoc);
      setHasMore(snapshot.docs.length === 20);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setLastVisible(null);
    setHasMore(true);
    fetchMovies();
  }, [filter]);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-black/80 rounded-2xl min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 md:mb-0 text-red-500 drop-shadow">
              Top Movies by {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </h1>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded bg-red-500 text-white shadow hover:bg-red-700 transition"
            >
              <option value="revenue">Revenue</option>
              <option value="budget">Budget</option>
              <option value="popularity">Popularity</option>
              <option value="runtime">Runtime</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center mt-20">
              <LoaderButton text="Loading movies..." />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-10">
                  {loadingMore ? (
                    <LoaderButton text="Loading more..." />
                  ) : (
                    <button
                      onClick={() => fetchMovies({ isLoadMore: true })}
                      className="px-6 py-3 bg-red-500 text-black font-semibold text-lg rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
                    >
                      Load More
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
