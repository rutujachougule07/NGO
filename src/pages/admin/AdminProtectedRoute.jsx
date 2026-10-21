import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

/**
 * Route protection wrapper for Admin Console routes.
 * If user is not authenticated, redirects directly to /admin/login.
 */
export default function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useAdmin();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
