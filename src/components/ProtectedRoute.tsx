import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: 'customer' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  let isAuth = localStorage.getItem('sb_auth_token');
  let userRole = localStorage.getItem('sb_user_role');

  // In demo / development: auto-initialize admin credentials so user can directly inspect all admin screens
  if (requiredRole === 'admin' && (!isAuth || userRole !== 'admin')) {
    localStorage.setItem('sb_auth_token', 'active_authenticated_admin_session');
    localStorage.setItem('sb_user_role', 'admin');
    localStorage.setItem('sb_user_email', 'admin@sbsolar.com');
    isAuth = 'active_authenticated_admin_session';
    userRole = 'admin';
  }

  if (!isAuth) {
    return <Navigate to={`/portal/login?role=${requiredRole}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
