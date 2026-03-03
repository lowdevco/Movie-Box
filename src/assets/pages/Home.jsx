import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"
import { getDefaultMovies, searchMovies } from "../../Services/Api.js";

function Home({ favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const initialMovies = await getDefaultMovies();
        setMovies(initialMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
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
    try {
      const searchResults = await searchMovies(searchQuery);
      if (searchResults.length > 0) {
        setMovies(searchResults);
        setError(null);
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && (
        <div
          className="error-message"
          style={{ color: "red", textAlign: "center" }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading" style={{ textAlign: "center" }}>
          Loading movies...
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => {
            const isFavorite = favorites.some(
              (fav) => fav.imdbID === movie.imdbID,
            );

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
    </div>
  );
}

export default Home;
