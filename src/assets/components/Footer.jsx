import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-content">
        {/* ── Brand ── */}
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7 5V19M17 5V19M2 9H7M17 9H22M2 15H7M17 15H22"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span>MovieBox</span>
          </div>
          <p className="footer-tagline">
            Your ultimate cinematic companion. Discover, search, and save your
            favorite films — all in one place.
          </p>
          <p className="footer-made">
            Made with <span className="heart-gradient">♥</span> by lowdevco
          </p>
        </div>

        {/* ── Quick Links ── */}
        <div className="footer-section">
          <h3 className="footer-heading">Navigate</h3>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/favorites" className="footer-link">Favorites</Link>
        </div>

        {/* ── Connect ── */}
        <div className="footer-section">
          <h3 className="footer-heading">Connect</h3>
          <a
            href="https://github.com/lowdevco"
            target="_blank"
            rel="noreferrer"
            className="footer-link footer-social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482
                0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462
                -.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832
                .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943
                0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647
                0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337
                c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647
                .64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935
                .359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743
                0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadirfank/"
            target="_blank"
            rel="noreferrer"
            className="footer-link footer-social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z
                M5.337 7.433a2.062 2.062 0 01-2.063-2.065
                2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MovieBox — All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
