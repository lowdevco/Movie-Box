import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>🎬 MovieBox</h2>
          <p>
            Your ultimate cinematic companion. Discover, search, and save your
            favorite movies all in one place.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="footer-social">
          <h3>Connect</h3>
          <a
            href="https://github.com/lowdevco"
            target="_blank"
            
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadirfank/"
            target="_blank"
            
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MovieBox All rights reserved |{" "}
          <Link to="https://github.com/lowdevco">lowdevco</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
