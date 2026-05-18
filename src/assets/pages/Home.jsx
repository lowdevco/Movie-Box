import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getDefaultMovies, searchMovies } from "../../Services/Api.js";

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-poster skeleton-anim" />
    </div>
  );
}

function Home({ favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("Trending Now");

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const initialMovies = await getDefaultMovies();
        setMovies(initialMovies);
        setSectionTitle("Trending Now");
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadInitialMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchMovies(searchQuery);
      if (searchResults.length > 0) {
        setMovies(searchResults);
        setSectionTitle(`Results for "${searchQuery}"`);
        setError(null);
      } else {
        setMovies([]);
        setError(`No movies found for "${searchQuery}".`);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* ════ HERO ════ */}
      <section className="hero" aria-label="Search movies">
        {/* Ambient orbs */}
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />

        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your<br />
            <span className="hero-title-accent">Next Favorite Film</span>
          </h1>
          <p className="hero-subtitle">
            Search millions of movies, explore details, and curate your personal collection.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="search-form" role="search">
            <div className="search-input-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                id="movie-search-input"
                type="text"
                placeholder="Search movies, series, and more…"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="search-button" id="search-submit-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ════ RESULTS ════ */}
      <section className="movies-section">
        {!loading && !error && movies.length > 0 && (() => {
          const visibleCount = movies.filter((m) => m.Poster && m.Poster !== "N/A").length;
          return (
            <div className="section-header">
              <h2 className="section-title">{sectionTitle}</h2>
              <span className="section-count">{visibleCount} titles</span>
            </div>
          );
        })()}

        {error && (
          <div className="error-card" role="alert">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="movies-grid" aria-busy="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="movies-grid">
            {movies
              .filter((movie) => movie.Poster && movie.Poster !== "N/A")
              .map((movie) => {
                const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
                return (
                  <MovieCard
                    movie={movie}
                    key={movie.imdbID}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
