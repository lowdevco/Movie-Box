import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../Services/Api.js";
import "../css/MovieDetail.css";

/* ── Star Rating Bar ── */
function StarRating({ rating }) {
  const score = parseFloat(rating) || 0;
  const percent = (score / 10) * 100;
  return (
    <div className="star-rating-wrap" title={`${rating}/10 on IMDb`}>
      <div className="star-bar-track">
        <div className="star-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="star-score">{rating}/10</span>
    </div>
  );
}

/* ── Genre Pill ── */

function GenrePill({ genre }) {
  return <span className="genre-pill">{genre.trim()}</span>;
}

/* ── Cast Chip ── */

function CastChip({ name }) {
  const initials = name.trim().split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
  return (
    <div className="cast-chip">
      <span className="cast-avatar">{initials}</span>
      <span className="cast-name">{name.trim()}</span>
    </div>
  );
}

function MovieDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        setError(null);
      } catch (err) {
        console.error("Error loading movie:", err);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-spinner" />
        <p>Loading movie details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <span>⚠️</span>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="back-btn-inline">← Go Back</button>
      </div>
    );
  }

  if (!movie) return null;

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
  const genres = movie.Genre ? movie.Genre.split(",") : [];
  const cast = movie.Actors ? movie.Actors.split(",").slice(0, 4) : [];
  const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;

  // Find other rating sources
  const rtRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes");
  const mcRating = movie.Ratings?.find(r => r.Source === "Metacritic");

  return (
    <div className="movie-detail-page">
      {/* ── Full-bleed Backdrop ── */}
      {posterUrl && (
        <div className="detail-backdrop" aria-hidden="true">
          <img
            src={posterUrl}
            alt=""
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="backdrop-scrim" />
        </div>
      )}

      {/* ── Back Button ── */}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
        title="Go back"
        id="back-to-home-btn"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {/* ── Main Content ── */}

      <div className="detail-content">

        {/* Left — Poster + Quick Info */}

        <aside className="detail-sidebar">
          <div className="detail-poster-wrap">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.Title} poster`}
                className="detail-poster"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.style.removeProperty("display");
                }}
              />
            ) : null}
            <div
              className="detail-poster-placeholder"
              style={{ display: posterUrl ? "none" : "flex" }}
            >
              <span>🎬</span>
            </div>
          </div>

          {/* Quick Info */}

          <div className="quick-info-card">
            <div className="quick-info-row">
              <span className="qi-label">RELEASE</span>
              <span className="qi-value">{movie.Released || "N/A"}</span>
            </div>
            <div className="quick-info-row">
              <span className="qi-label">RUNTIME</span>
              <span className="qi-value">{movie.Runtime || "N/A"}</span>
            </div>
            <div className="quick-info-row">
              <span className="qi-label">LANGUAGE</span>
              <span className="qi-value">{movie.Language || "N/A"}</span>
            </div>
            <div className="quick-info-row">
              <span className="qi-label">COUNTRY</span>
              <span className="qi-value">{movie.Country || "N/A"}</span>
            </div>
            <div className="quick-info-row">
              <span className="qi-label">RATED</span>
              <span className="qi-value">{movie.Rated || "N/A"}</span>
            </div>
          </div>


          {/* Favorite Button */}

          <button
            className={`fav-btn-detail${isFavorite ? " active" : ""}`}
            onClick={() => toggleFavorite(movie)}
            id="toggle-favorite-detail-btn"
          >
            <span className="fav-heart">{isFavorite ? "♥" : "♡"}</span>
            <span>{isFavorite ? "In Favorites" : "Add to Favorites"}</span>
          </button>

          {/* IMDb Button */}

          <button
            className="imdb-btn"
            onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}/`, "_blank")}
            title="View on IMDb"
            id="view-imdb-btn"
          >
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect width="48" height="48" rx="8" fill="#F5C518"/>
              <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle"
                fontSize="20" fontWeight="900" fill="#000" fontFamily="Outfit,sans-serif">
                IMDb
              </text>
            </svg>
            View on IMDb
          </button>
        </aside>

        {/* Right — Details */}

        <main className="detail-main">

          {/* Type badge */}

          <span className="detail-type-badge">
            {movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : "Movie"}
          </span>

          {/* Title */}

          <h1 className="detail-title">{movie.Title}</h1>

          {/* Year + Rating */}

          <div className="detail-meta-row">
            <span className="detail-year">{movie.Year}</span>
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="detail-rating-block">
                <span className="rating-star">⭐</span>
                <StarRating rating={movie.imdbRating} />
              </div>
            )}
          </div>

          {/* Ratings row */}

          {(rtRating || mcRating) && (
            <div className="ratings-row">
              {rtRating && (
                <div className="rating-badge rt">
                  <span className="rb-label">🍅 Rotten Tomatoes</span>
                  <span className="rb-value">{rtRating.Value}</span>
                </div>
              )}
              {mcRating && (
                <div className="rating-badge mc">
                  <span className="rb-label">🎭 Metacritic</span>
                  <span className="rb-value">{mcRating.Value}</span>
                </div>
              )}
            </div>
          )}

          {/* Genres */}

          {genres.length > 0 && (
            <div className="genre-row" aria-label="Genres">
              {genres.map((g, i) => <GenrePill key={i} genre={g} />)}
            </div>
          )}

          {/* Plot */}

          <section className="detail-section">
            <h2 className="detail-section-title">Synopsis</h2>
            <p className="detail-plot">
              {movie.Plot || "A detailed synopsis is not available for this movie."}
            </p>
          </section>

          {/* Cast */}

          {cast.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">Cast</h2>
              <div className="cast-grid">
                {cast.map((actor, i) => <CastChip key={i} name={actor} />)}
              </div>
            </section>
          )}

          {/* Crew */}

          {(movie.Director || movie.Writer) && (
            <section className="detail-section">
              <h2 className="detail-section-title">Crew</h2>
              <div className="crew-list">
                {movie.Director && movie.Director !== "N/A" && (
                  <div className="crew-row">
                    <span className="crew-role">Director</span>
                    <span className="crew-name">{movie.Director}</span>
                  </div>
                )}
                {movie.Writer && movie.Writer !== "N/A" && (
                  <div className="crew-row">
                    <span className="crew-role">Writer</span>
                    <span className="crew-name">
                      {movie.Writer.split(",").slice(0, 2).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default MovieDetail;
