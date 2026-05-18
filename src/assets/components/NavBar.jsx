import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <svg className="brand-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M7 5V19M17 5V19M2 9H7M17 9H22M2 15H7M17 15H22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <span className="brand-text">MovieBox</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link${location.pathname === "/" ? " active" : ""}`}
          id="home-nav"
        >
          <span className="nav-link-icon">🏠</span>
          <span className="nav-link-label">Home</span>
          {location.pathname === "/" && <span className="nav-active-pill" />}
        </Link>
        <Link
          to="/favorites"
          className={`nav-link${location.pathname === "/favorites" ? " active" : ""}`}
        >
          <span className="nav-link-icon">♥</span>
          <span className="nav-link-label">Favorites</span>
          {location.pathname === "/favorites" && <span className="nav-active-pill" />}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
