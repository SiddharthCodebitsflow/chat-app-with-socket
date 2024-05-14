import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  console.log(rest);
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: rest.location }} />;
};

export default PrivateRoute;
