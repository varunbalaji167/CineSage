import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const favIds = userSnap.data()?.favorites || [];
      const watchedMap = userSnap.data()?.watched || {};

      const movieDocs = await Promise.all(
        favIds.map(async (id) => {
          const q = query(collection(db, "movies"), where("id", "==", id));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const movieData = snapshot.docs[0].data();
            return {
              ...movieData,
              watched: watchedMap?.[id]?.watched || false,
              count: watchedMap?.[id]?.count || 0,
            };
          } else {
            return null;
          }
        })
      );

      setMovies(movieDocs.filter(Boolean));
    };

    fetchFavorites();
  }, [user]);

  const incrementWatched = async (id) => {
    const updated = movies.map((m) =>
      m.id === id
        ? { ...m, count: (m.count || 0) + 1, watched: true }
        : m
    );
    setMovies(updated);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`watched.${id}.watched`]: true,
      [`watched.${id}.count`]: updated.find((m) => m.id === id).count,
    });
  };

  const removeFromFavorites = async (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: updated.map((m) => m.id),
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8 px-3 md:px-10"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 font-serif">
          Your Favorite Movies
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-300 text-lg">No favorites yet!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-black bg-opacity-70 backdrop-blur-lg rounded-xl shadow-md overflow-hidden text-white p-3 hover:scale-105 transition-all duration-200"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-lg mb-3 cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
                <h2 className="text-lg font-semibold mb-2 text-center">
                  {movie.title}
                </h2>

                {/* Label */}
                <div className="flex justify-center mb-3">
                  {movie.watched ? (
                    <div className="bg-blue-600 px-3 py-1 rounded-full text-xs">
                      Times Watched: {movie.count}
                    </div>
                  ) : (
                    <div className="bg-yellow-500 px-3 py-1 rounded-full text-xs text-black font-medium">
                      To Be Watched
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => incrementWatched(movie.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Mark as Watched
                  </button>
                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;