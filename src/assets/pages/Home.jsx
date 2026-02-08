import React from "react";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    { id: 1, title: "huhdw", release_date: "2020" },
    { id: 2, title: "khj", release_date: "2022" },
    { id: 3, title: "kjh", release_date: "2024" },
    { id: 4, title: "oww", release_date: "2025" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    alert(searchQuery);
  };

  return (
    <>
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

        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              ),
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
