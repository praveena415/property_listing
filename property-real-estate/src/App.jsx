import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PropertyDetails from "./components/PropertyDetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import Favorites from "./components/Favorites";
import Compare from "./components/Compare";
import ProtectedRoute from "./components/ProtectedRoute";
import PROPERTY_DATA from "./data/properties";


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("demoUser");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  return (
    <div className="app-root">
      <Navbar user={user} setUser={setUser} />
      <main className="container">
        <Routes>
        
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />

         
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home user={user} properties={PROPERTY_DATA} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container small-muted">
          © {new Date().getFullYear()} PropFinder — Praveena Prasad - Built with ❤️
        </div>
      </footer>
    </div>
  );
}
