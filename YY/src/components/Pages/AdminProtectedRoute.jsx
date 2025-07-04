import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProtectedRoute({ children }) {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('adminToken');
  if (!isAdmin) {
    return <Navigate to="/admin-signin" replace />;
  }
  return children;
} 