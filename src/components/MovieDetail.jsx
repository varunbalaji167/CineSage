import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, isFavorite, addToFavorites, removeFromFavorites } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try {
        const moviesRef = collection(db, 'movies')
        const q = query(moviesRef, where('id', '==', id))
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
          setMovie(snapshot.docs[0].data())
        } else {
          setMovie(null)
        }
      } catch (error) {
        console.error('Error fetching movie:', error)
        setMovie(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  const handleToggleFavorite = () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    isFavorite(movie.id)
      ? removeFromFavorites(movie.id)
      : addToFavorites(movie.id)
  }

  if (loading) return <p className="text-white p-8">Loading...</p>
  if (!movie) return <p className="text-red-300 p-8">Movie not found.</p>

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-12 px-6 md:px-10 text-white"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto bg-black bg-opacity-80 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            className="w-full md:w-64 h-auto rounded-xl shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 font-serif">{movie.title}</h1>
            <p className="text-lg text-gray-300 mb-6 italic">{movie.tagline || 'No Tagline'}</p>

            <button
              onClick={handleToggleFavorite}
              className={`mb-6 px-5 py-3 rounded-lg font-semibold transition duration-300 ${
                isFavorite(movie.id)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-black'
              }`}
            >
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <p className="text-gray-200 mb-6 leading-relaxed">{movie.overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm text-gray-400">
              <p><span className="font-semibold text-white">Genres:</span> {movie.genres || 'Unknown'}</p>
              <p><span className="font-semibold text-white">Rating:</span> ⭐ {movie.vote_average}</p>
              <p><span className="font-semibold text-white">Release:</span> {movie.release_date || 'Unknown'}</p>
              <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime} mins</p>
              <p><span className="font-semibold text-white">Status:</span> {movie.status}</p>
              <p><span className="font-semibold text-white">Language:</span> {movie.original_language?.toUpperCase()}</p>
              <p><span className="font-semibold text-white">Budget:</span> ${movie.budget?.toLocaleString()}</p>
              <p><span className="font-semibold text-white">Revenue:</span> ${movie.revenue?.toLocaleString()}</p>
              <p><span className="font-semibold text-white">Popularity:</span> {movie.popularity}</p>
              <p>
                <span className="font-semibold text-white">Production:</span>{' '}
                {movie.production_companies || 'N/A'}
              </p>
              {movie.homepage && (
                <p>
                  <span className="font-semibold text-white">Homepage:</span>{' '}
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-400 underline hover:text-red-300"
                  >
                    Visit
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Login Required</h2>
            <p className="text-gray-700 mb-6">Please login to add movies to your favorites.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = "/login"; // Redirect to login
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="border border-gray-400 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail