// src/utils/Upload.jsx
import React from 'react';
import {
  collection,
  doc,
  getDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import movies from '../data/Movies.json';

const BATCH_LIMIT = 500;

const Upload = () => {
  const run = async () => {
    try {
      const moviesRef = collection(db, 'movies');
      const existingDocsSnap = await getDocs(moviesRef);
      const existingIds = new Set(existingDocsSnap.docs.map(doc => doc.id));

      let batch = writeBatch(db);
      let batchCounter = 0;

      for (const movie of movies) {
        const movieId = movie.id?.toString();
        if (!movieId || existingIds.has(movieId)) continue;

        const formattedMovie = {
          ...movie,
          revenue: Number(movie.revenue) || 0,
          budget: Number(movie.budget) || 0,
          vote_count: Number(movie.vote_count) || 0,
          vote_average: Number(movie.vote_average) || 0,
          adult: movie.adult === 'True' || movie.adult === true,
          release_date: movie.release_date || '',
          genres: movie.genres || '',
          overview: movie.overview || '',
          poster_path: movie.poster_path || '',
          backdrop_path: movie.backdrop_path || '',
        };

        const movieDoc = doc(moviesRef, movieId);
        batch.set(movieDoc, formattedMovie);
        batchCounter++;

        if (batchCounter === BATCH_LIMIT) {
          await batch.commit();
          console.log(`✅ Committed batch of ${BATCH_LIMIT}`);
          batch = writeBatch(db);
          batchCounter = 0;
        }
      }

      if (batchCounter > 0) {
        await batch.commit();
        console.log(`✅ Committed final batch of ${batchCounter}`);
      }

      alert('🎉 Movies uploaded successfully!');
    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('Upload failed. Check console for errors.');
    }
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={run}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Upload Movies to Firestore
      </button>
    </div>
  );
};

export default Upload;