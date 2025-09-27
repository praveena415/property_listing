// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/*
  Simple route guard:
  - Checks localStorage.demoUser (you can replace with Redux check if you prefer)
  - If not logged in, redirects to /signin and stores the attempted location in state
*/
export default function ProtectedRoute({ children }) {
  const raw = localStorage.getItem("demoUser");
  const user = raw ? JSON.parse(raw) : null;
  const location = useLocation();

  if (!user) {
    // Redirect to signin and remember where we came from
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
