import React from "react";
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div
        className="favorites-empty"
        style={{ textAlign: "center", marginTop: "4rem",height: "50vh"}}
      >
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Your Favorites
      </h2>
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
    </div>
  );
}

export default Favorites;
