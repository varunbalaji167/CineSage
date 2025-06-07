// //src/context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { auth, db } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         const userRef = doc(db, "users", firebaseUser.uid);
//         const userSnap = await getDoc(userRef);
//         if (!userSnap.exists()) {
//           await setDoc(userRef, {
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             name: firebaseUser.displayName || "",
//             createdAt: new Date(),
//           });
//         }
//         setUser(firebaseUser);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout failed:", error.message);
//     }
//   };

//   const value = { user, logout };
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || "",
            createdAt: new Date(),
            favorites: []
          });
        }

        setUser(firebaseUser);
        setFavorites(userSnap.data()?.favorites || []);
      } else {
        setUser(null);
        setFavorites([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Add movie ID to favorites
  const addToFavorites = async (movieId) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(movieId)
    });
    setFavorites((prev) => [...prev, movieId]);
  };

  // Remove movie ID from favorites
  const removeFromFavorites = async (movieId) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(movieId)
    });
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  // Check if a movie is favorited
  const isFavorite = (movieId) => favorites.includes(movieId);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const value = {
    user,
    logout,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};