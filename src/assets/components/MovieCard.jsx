import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/MovieCard.css";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();


  function onCardClick(e) {

    if (!e.target.closest(".favorite-btn")) {
      navigate(`/movie/${movie.imdbID}`); 
    }
  }

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation(); 
    toggleFavorite(movie);
  }

  const imageUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card" onClick={onCardClick}>
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.Title} />
        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </div>

      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={onFavoriteClick}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <span style={{ color: isFavorite ? "#f43f5e" : "white" }}>
          {isFavorite ? "♥" : "♡"}
        </span>
      </button>
    </div>
  );
}

export default MovieCard;
