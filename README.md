# CineSage - A Movie Recommendation Website

## Overview

This **CineSage** is a web application built with **React**, **Firebase**, and **Tailwind CSS** that allows users to search for movies, explore detailed information about them, and save their favorite movies. The app fetches data from a Firebase Firestore database, providing dynamic and interactive features such as searching, pagination, and sorting by genres. The app also includes a "Back to Top" button for better user experience, especially when browsing a long list of results.

## Features

- **Search Functionality**: Users can search for movies by title. The search supports partial matching and is case-insensitive.
- **Genre Filters**: Users can filter movies by genre in addition to the title search.
- **Pagination**: The app fetches movies in chunks of 20 items to avoid overwhelming the user with too many results at once. The "Load More" button allows users to load more movies as they scroll through the list.
- **Favorites Selection**: Authenticated Users can store their Favorite Movies collection
- **Back to Top Button**: Once the user scrolls down the page, a floating "Back to Top" button becomes visible. When clicked, it smoothly scrolls the user back to the top of the page.
- **Dynamic UI**: The user interface adapts based on the fetched data. The grid displays movie cards for each movie result with basic information such as title, description, genres, and an image.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase (Firestore)
- **Styling**: Tailwind CSS for responsive and modern design
- **Search & Pagination**: Firebase Firestore queries for efficient data retrieval

## Setup and Installation

To get started with the Website, follow the steps below:

### Prerequisites

- Node.js and npm (or Yarn) installed on your system.
- Firebase account for setting up Firestore.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shrees2/EMovies.git
   cd client
   ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Set Up Firebase

- Create a Firebase project at Firebase Console.
- Set up Firebase Authentication (Email/Password sign-in method).
- Create Firestore collections (users, movies) using src/utils/Upload.js.
- Copy the Firebase configuration from your Firebase console and add it to the src/firebase.js file.

4. Run the app locally
```bash
npm run dev
```
## API Reference

### 1. Firebase Firestore Database

The Firestore database in the app stores movie data, which mainly includes:

- **id**: Unique identifier for each movie.
- **title**: The movie title.
- **description**: A brief description of the movie.
- **genres**: A list of genres for the movie.
- **image**: URL for the movie poster image.

This data should be structured in the Firestore database under a collection called `movies`. Each document in the `movies` collection represents a movie with the aforementioned fields.

### 2. Fetching Movies from Firestore

In this project, we fetch movie data from Firebase Firestore using the `getDocs` method. Here's how we fetch and display movies:

####  **Setting up Firestore Query**

We query the `movies` collection to retrieve all the movie documents. We also filter the movies based on the search term (`q`) and genre (`genre`). The `getDocs` function fetches the documents from Firestore.

```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchMovies = async () => {
  setLoading(true);
  try {
    const snapshot = await getDocs(collection(db, 'movies'));
    const allMovies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter based on search term and genre
    const filtered = allMovies.filter(movie => {
      const titleMatch = movie.title?.toLowerCase().includes(searchTerm);
      const genreMatch = genreParam ? movie.genres?.toLowerCase().includes(genreParam) : true;
      return titleMatch && genreMatch;
    });

    setResults(filtered);
  } catch (err) {
    console.error('Error searching movies:', err);
  } finally {
    setLoading(false);
  }
};
```
## Deployment

To deploy using Firebase run following commands in terminal at root of client

```bash
  npm run build
  firebase login
  firebase init

  // After succesfull Firebase initialization

  firebase deploy --only hosting
```
### Hosted URL
https://CineSage-swetha.web.app
## Acknowledgements

 - **Dataset of Movies** is collected from **Kaggle Database**(https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies)
