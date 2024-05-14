import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children, isAuthenticated, ...rest }) {
    return !isAuthenticated ? children : <Navigate to="/home" replace state={{ from: rest.location }} />;

}
