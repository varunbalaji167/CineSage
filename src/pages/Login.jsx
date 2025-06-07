// import React, { useState } from "react";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6">
//       <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
//         <h2 className="text-4xl font-serif font-bold text-center text-gray-900 mb-6">
//           Welcome Back to <span className="text-indigo-600">StyleSphere</span>
//         </h2>

//         {error && (
//           <p className="text-sm text-red-500 text-center mb-4">{error}</p>
//         )}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <div className="my-6 relative text-center text-sm text-gray-500">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300" />
//           </div>
//           <span className="relative bg-white px-3">or</span>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition duration-300"
//         >
//           Continue with Google
//         </button>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{" "}
//           <a
//             href="/signup"
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/images/auth.jpg')" }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-70 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-red-600">
        <h2 className="text-4xl font-bold text-center text-white mb-6 font-sans tracking-wide">
          Sign In to <span className="text-red-500">CineSage</span>
        </h2>

        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="my-6 relative text-center text-sm text-gray-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <span className="relative bg-black bg-opacity-80 px-3">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-md transition duration-300"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-red-500 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;