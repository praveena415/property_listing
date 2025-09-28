
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const raw = localStorage.getItem("demoUser");
  const user = raw ? JSON.parse(raw) : null;
  const location = useLocation();

  if (!user) {
   
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
