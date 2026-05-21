import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Login check
  if (!token) {
    return <Navigate to="/" />;
  }

  // Role check
  if (role) {

    // Multiple roles
    if (Array.isArray(role)) {

      if (!role.includes(userRole)) {
        return <Navigate to="/" />;
      }

    } 
    
    // Single role
    else {

      if (userRole !== role) {
        return <Navigate to="/" />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;