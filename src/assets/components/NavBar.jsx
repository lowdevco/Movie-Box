import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="nav-mobile">🎬</span> MovieBox
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" id="home-mobile">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
