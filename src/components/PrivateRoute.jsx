import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import './PrivateRoute.css'; // Import the external CSS

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) {
    return (
      <div className="private-route-container">
        <div className="private-route-loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
