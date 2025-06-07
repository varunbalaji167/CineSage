// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();

//   // Fetch genres from movies collection
//   useEffect(() => {
//     const fetchGenres = async () => {
//       const snapshot = await getDocs(collection(db, "movies"));
//       const genreSet = new Set();
//       snapshot.docs.forEach(doc => {
//         const movieGenres = doc.data().genres?.split(',') || [];
//         movieGenres.forEach(genre => genreSet.add(genre.trim()));
//       });
//       setGenres([...genreSet]);
//     };

//     fetchGenres();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim() && !selectedGenre) return;

//     const params = new URLSearchParams();
//     if (searchTerm.trim()) params.append("q", searchTerm.trim());
//     if (selectedGenre) params.append("genre", selectedGenre);

//     navigate(`/search?${params.toString()}`);
//     setSearchTerm("");
//     setSelectedGenre("");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//       <div className="flex justify-between items-center w-full md:w-auto">
//         <Link to="/" className="text-2xl font-bold text-indigo-600">
//           🎬 MovieHub
//         </Link>
//       </div>

//       <form
//         onSubmit={handleSearch}
//         className="flex flex-wrap md:flex-nowrap items-center gap-2"
//       >
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-2 py-1 border border-gray-300 rounded w-40 md:w-64 outline-none"
//         />

//         <select
//           value={selectedGenre}
//           onChange={(e) => setSelectedGenre(e.target.value)}
//           className="px-2 py-1 border border-gray-300 rounded outline-none"
//         >
//           <option value="">All Genres</option>
//           {genres.map((genre, idx) => (
//             <option key={idx} value={genre}>
//               {genre}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           className="text-indigo-600 font-semibold hover:underline ml-2"
//         >
//           Search
//         </button>
//       </form>

//       <div className="flex flex-wrap gap-4 items-center">
//         <Link to="/favorites" className="text-gray-700 hover:text-indigo-600">
//           Favorites
//         </Link>
//         {user && (
//           <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
//             Profile
//           </Link>
//         )}
//         {user ? (
//           <button
//             onClick={logout}
//             className="text-red-600 hover:underline font-medium"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="text-green-600 hover:text-green-700 font-medium"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGenres = async () => {
//       const snapshot = await getDocs(collection(db, "movies"));
//       const genreSet = new Set();
//       snapshot.docs.forEach(doc => {
//         const movieGenres = doc.data().genres?.split(',') || [];
//         movieGenres.forEach(genre => genreSet.add(genre.trim()));
//       });
//       setGenres([...genreSet]);
//     };

//     fetchGenres();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim() && !selectedGenre) return;

//     const params = new URLSearchParams();
//     if (searchTerm.trim()) params.append("q", searchTerm.trim());
//     if (selectedGenre) params.append("genre", selectedGenre);

//     navigate(`/search?${params.toString()}`);
//     setSearchTerm("");
//     setSelectedGenre("");
//   };

//   return (
//     <nav className="bg-black backdrop-blur-md text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-lg z-50">
//       {/* Logo */}
//       <div className="flex justify-between items-center w-full md:w-auto">
//         <Link
//           to="/"
//           className="text-3xl font-extrabold tracking-wide  drop-shadow-md text-red-500 hover:text-red-700 transition"
//         >
//           🎬 CineSage
//         </Link>
//       </div>

//       {/* Search */}
//       <form
//         onSubmit={handleSearch}
//         className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"
//       >
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-3 py-2 w-full md:w-64 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
//         />

//         <select
//           value={selectedGenre}
//           onChange={(e) => setSelectedGenre(e.target.value)}
//           className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
//         >
//           <option value="">All Genres</option>
//           {genres.map((genre, idx) => (
//             <option key={idx} value={genre}>
//               {genre}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
//         >
//           Search
//         </button>
//       </form>

//       {/* Navigation Links */}
//       <div className="flex flex-wrap gap-4 items-center">
//         <Link
//           to="/favorites"
//           className="hover:text-red-400 transition font-medium"
//         >
//           ❤️ Favorites
//         </Link>

//         {user && (
//           <Link
//             to="/profile"
//             className="hover:text-red-400 transition font-medium"
//           >
//             👤 Profile
//           </Link>
//         )}

//         {user ? (
//           <button
//             onClick={logout}
//             className="text-red-400 hover:underline font-medium transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="text-green-400 hover:text-green-500 font-medium transition"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const snapshot = await getDocs(collection(db, "movies"));
      const genreSet = new Set();
      snapshot.docs.forEach(doc => {
        const movieGenres = doc.data().genres?.split(',') || [];
        movieGenres.forEach(genre => genreSet.add(genre.trim()));
      });
      setGenres([...genreSet]);
    };

    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim() && !selectedGenre) return;

    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append("q", searchTerm.trim());
    if (selectedGenre) params.append("genre", selectedGenre);

    navigate(`/search?${params.toString()}`);
    // Do not reset selectedGenre to "" after submitting the form
  };

  return (
    <nav className="bg-black backdrop-blur-md text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-lg z-50">
      {/* Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide  drop-shadow-md text-red-500 hover:text-red-700 transition"
        >
          🎬 CineSage
        </Link>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 w-full md:w-64 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        >
          <option value="">All Genres</option>
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 items-center">
        <Link
          to="/favorites"
          className="hover:text-red-400 transition font-medium"
        >
          ❤️ Favorites
        </Link>

        {user && (
          <Link
            to="/profile"
            className="hover:text-red-400 transition font-medium"
          >
            👤 Profile
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="text-red-400 hover:underline font-medium transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-green-400 hover:text-green-500 font-medium transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
