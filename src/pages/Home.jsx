import MovieList from "../components/MovieList";
import ToTopButton from "../components/ToTopButton";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 md:px-10"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-black bg-opacity-70 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-8 text-center text-white drop-shadow-lg tracking-wide">
            Discover Curated & Classy Cinema
          </h1>
          <MovieList />
        </div>
      </div>
      <ToTopButton />
    </div>
  );
};

export default Home;