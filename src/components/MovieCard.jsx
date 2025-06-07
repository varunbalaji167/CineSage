// import { Link } from 'react-router-dom'

// const MovieCard = ({ movie }) => {
//   const hasBackdrop = movie.backdrop_path && movie.backdrop_path.trim() !== ''
//   const imageUrl = hasBackdrop
//     ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
//     : null

//   const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

//   return (
//     <Link
//       to={`/movie/${movie.id}`}
//       className="bg-white shadow-md rounded overflow-hidden hover:scale-105 transition"
//     >
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={movie.title}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//           No Image
//         </div>
//       )}

//       <div className="p-2">
//         <h2 className="text-lg font-bold">{movie.title}</h2>
//         <p className="text-sm text-gray-500">{movie.genres || 'No Genre'}</p>
//         <p className="text-sm text-gray-400">{year}</p>
//       </div>
//     </Link>
//   )
// }

// export default MovieCard

import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const hasBackdrop = movie.backdrop_path && movie.backdrop_path.trim() !== ''
  const imageUrl = hasBackdrop
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : null

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative bg-black bg-opacity-60 rounded-2xl overflow-hidden shadow-xl border border-red-600 transition-transform transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 transition duration-300"
        />
      ) : (
        <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-300 text-lg italic">
          No Image Available
        </div>
      )}

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
        <h2 className="text-white text-xl font-semibold truncate drop-shadow-sm">
          {movie.title}
        </h2>
        <p className="text-red-400 text-sm mt-1 font-medium">
          {movie.genres || 'Genre Unavailable'}
        </p>
        <p className="text-gray-300 text-xs">{year}</p>
      </div>
    </Link>
  )
}

export default MovieCard