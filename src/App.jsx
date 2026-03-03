import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/NavBar";
import Home from "./assets/pages/Home";
import Favorites from "./assets/pages/Favorites";
import MovieDetail from "./assets/pages/MovieDetail"; 
import "./assets/css/App.css";
import Footer from "./assets/components/Footer";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("movie_favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav.imdbID === movie.imdbID);
      if (isFav) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home favorites={favorites} toggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetail
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
