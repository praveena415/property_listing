// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("demoUser");
    setUser(null);
    navigate("/signin");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <div className="brand">
          <span className="logo" aria-hidden="true" />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>PropFinder</Link>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/favorites">Favorites</Link>
          <Link to="/compare">Compare</Link>

          {user ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="small-muted" style={{ fontSize: 13 }}>{user.email}</span>
              <button className="btn" onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/signin" className="btn">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
