import { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch movies from API
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows")
      .then((response) => {
        const movieData = response.data.slice(0, 30).map((show) => ({
          id: show.id,
          title: show.name,
          genre: show.genres[0] || "Other",
          year: show.premiered ? show.premiered.slice(0, 4) : "Unknown",
          rating: show.rating.average || "N/A",
        }));

        setMovies(movieData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    const alreadyAdded = watchlist.some((item) => item.id === movie.id);

    if (!alreadyAdded) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  // Get unique genres
  const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];

  // Filter movies
  const filteredMovies =
    filter === "All"
      ? movies
      : movies.filter((movie) => movie.genre === filter);

  return (
    <div className="container">
      <h1>Movie Watchlist</h1>

      <Watchlist movies={watchlist} onRemove={removeFromWatchlist} />

      <h2>Explore Movies</h2>

      {/* Genre Filter */}
      <div className="filter-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            className={filter === genre ? "active" : ""}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="loader">Loading movies...</div>
      ) : (
        <div className="movie-list">
          {filteredMovies.length === 0 ? (
            <p>No movies found</p>
          ) : (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAdd={addToWatchlist}
                isAdded={watchlist.some((item) => item.id === movie.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
