import { useState, useEffect } from "react";
import "./assets/css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Favorites from "./assets/pages/Favorites";
import NavBar from "./assets/components/NavBar";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("movie-favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("movie-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavs) => {
      const isFavorite = prevFavs.some((fav) => fav.imdbID === movie.imdbID);

      if (isFavorite) {
        return prevFavs.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavs, movie];
      }
    });
  };

  return (
    <div>
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
