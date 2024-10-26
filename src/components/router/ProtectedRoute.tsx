import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
};

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login'
}: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};
