import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MovieCard.css";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgError;

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

  const typeLabel = movie.Type
    ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)
    : "Movie";

  return (
    <div className="movie-card" onClick={onCardClick}>
      {/* ── Poster ── */}
      <div className="movie-poster">
        {hasPoster ? (
          <>
            {!imgLoaded && <div className="poster-skeleton" />}
            <img
              src={movie.Poster}
              alt={movie.Title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(false); }}
              className={imgLoaded ? "loaded" : ""}
            />
          </>
        ) : (
          <div className="no-poster-placeholder">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="no-poster-icon">
              <rect x="4" y="9" width="40" height="30" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 34l10-9 7 7 8-10 15 13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span className="no-poster-label">Image Not Available</span>
            <span className="no-poster-title">{movie.Title}</span>
          </div>
        )}

        {/* ── Type Badge ── */}
        <span className="type-badge">{typeLabel}</span>

        {/* ── Gradient Scrim ── */}
        <div className="poster-scrim" />

        {/* ── Hover Overlay ── */}
        <div className="card-hover-overlay">
          <h3 className="overlay-title">{movie.Title}</h3>
          <p className="overlay-year">{movie.Year}</p>
          <span className="overlay-cta">View Details →</span>
        </div>
      </div>

      {/* ── Favorite Button ── */}
      <button
        className={`favorite-btn${isFavorite ? " active" : ""}`}
        onClick={onFavoriteClick}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        {isFavorite && <span className="pulse-ring" />}
        <span className="heart-symbol">{isFavorite ? "♥" : "♡"}</span>
      </button>
    </div>
  );
}

export default MovieCard;
