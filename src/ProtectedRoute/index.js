import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem("jwtToken");

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
