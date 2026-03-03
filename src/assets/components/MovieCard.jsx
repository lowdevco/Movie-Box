import React from "react";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  function onFavoriteClick() {
    toggleFavorite(movie);
  }

  const imageUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.Title} />
        <div className="movie-overlay">
          <button
            className="favorite-btn"
            onClick={onFavoriteClick}
            style={{
              color: isFavorite ? "red" : "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
