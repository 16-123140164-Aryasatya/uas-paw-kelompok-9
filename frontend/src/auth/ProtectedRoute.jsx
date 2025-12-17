import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loading label="Memeriksa autentikasi..." />;
  }

  // Jika belum login, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada requirement role dan user tidak punya role tersebut
  if (requiredRole && user.role !== requiredRole) {
    // Redirect ke dashboard sesuai role mereka
    if (user.role === 'librarian') {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  return children;
}
