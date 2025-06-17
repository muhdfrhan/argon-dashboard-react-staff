import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const userPosition = localStorage.getItem('userPosition');

  // Check for token AND if the user's position is 'Finance'
  if (!token || userPosition !== 'Finance') {
    // If not authenticated or not a finance user, redirect to the finance login page
    return <Navigate to="/finance/login" replace />;
  }

  // If authenticated and authorized, render the child component (the dashboard)
  return children;
};

export default ProtectedRoute;