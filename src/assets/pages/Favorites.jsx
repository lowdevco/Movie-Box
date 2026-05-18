import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-icon-wrap" aria-hidden="true">
          <span className="empty-heart">♥</span>
          <span className="empty-pulse-ring" />
          <span className="empty-pulse-ring ring-2" />
        </div>
        <h2 className="empty-title">Your collection is empty</h2>
        <p className="empty-subtitle">
          Explore movies and tap the heart icon to add them to your personal favorites.
        </p>
        <Link to="/" className="empty-cta" id="browse-movies-btn">
          Browse Movies →
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      {/* ── Banner ── */}
      <div className="favorites-banner">
        <div className="banner-orb" aria-hidden="true" />
        <div className="banner-content">
          <span className="banner-badge">♥ Your Collection</span>
          <h1 className="banner-title">Favorite Movies</h1>
          <p className="banner-subtitle">
            {favorites.length} {favorites.length === 1 ? "title" : "titles"} saved
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="favorites-grid-section">
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Favorites;
