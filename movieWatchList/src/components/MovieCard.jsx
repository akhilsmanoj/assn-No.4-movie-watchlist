function MovieCard({ movie, onAdd, isAdded }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>

      <button onClick={() => onAdd(movie)} disabled={isAdded}>
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieCard;
