import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../Services/Api.js";
import "../css/MovieDetail.css";

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

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Movie not found.</div>;

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  function handleFavoriteClick(e) {
    e.stopPropagation(); 
    toggleFavorite(movie);
  }

  
  const dataFields = [
    { label: "RELEASE", value: movie.Released || "N/A" },
    { label: "RUNTIME", value: movie.Runtime || "N/A" },
    {
      label: "RATING",
      value: movie.imdbRating ? `${movie.imdbRating}⭐` : "N/A",
    },
    { label: "GENRES", value: movie.Genre || "N/A" },
    { label: "LANGUAGE", value: movie.Language || "N/A" },
    { label: "COUNTRY", value: movie.Country || "N/A" },
  ];

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail-container">
 
        <button
          className="close-btn"
          onClick={() => navigate("/")}
          title="Go back to Home"
        >
          <span>&times;</span>
        </button>


        <div className="movie-detail-card">
       
          <div className="detail-panel left-panel">
            <h2 className="panel-header">MOVIE INFO</h2>
            <div className="data-fields-list">
              {dataFields.map((field, index) => (
                <div key={index} className="data-field">
                  <span className="data-label">{field.label}</span>
                  <p className="data-value">{field.value}</p>
                </div>
              ))}
            </div>

            <button
              className={`favorite-btn-detail ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              <span className="heart-icon">{isFavorite ? "♥" : "♡"}</span>
              <span>{isFavorite ? "In Favorites" : "Add to Favorites"}</span>
            </button>
          </div>


          <div className="detail-panel right-panel">
            <h1 className="movie-title">{movie.Title}</h1>
            <p className="movie-tagline">
              {movie.Plot ? movie.Plot.substring(0, 100) : "N/A"}...
            </p>


            <div className="movie-visual">
              <img src={movie.Poster} alt={movie.Title} />
            </div>

            <div className="movie-summary">
              <h3>Synopsis</h3>
              <p>
                {movie.Plot ||
                  "A detailed synopsis is not available for this movie."}
              </p>
            </div>


            <div className="movie-sections">
              <div className="movie-section">
                <h3>Cast</h3>
                <div className="section-list">
                  {movie.Actors?.split(",")
                    .slice(0, 4)
                    .map((actor, index) => (
                      <p key={index} className="section-item">
                        {actor.trim()}
                      </p>
                    ))}
                </div>
              </div>
              <div className="movie-section">
                <h3>Crew</h3>
                <div className="section-list">
                  {movie.Director?.split(",").map((director, index) => (
                    <p key={index} className="section-item">
                      {director.trim()} (Director)
                    </p>
                  ))}
                  {movie.Writer?.split(",")
                    .slice(0, 2)
                    .map((writer, index) => (
                      <p key={index} className="section-item">
                        {writer.trim()} (Writer)
                      </p>
                    ))}
                </div>
              </div>
            </div>

            <button
              className="imdb-btn"
              onClick={() =>
                window.open(
                  `https://www.imdb.com/title/${movie.imdbID}/`,
                  "_blank",
                )
              }
              title="View on IMDb"
            >
              View on IMDb
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
