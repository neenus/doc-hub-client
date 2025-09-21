import type { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate, useLocation } from 'react-router-dom';
import { startTransition, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAppSelector((state: any) => state.auth);
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      startTransition(() => {
        setShouldRedirect(true);
      });
    }
  }, [loading, user]);

  // Show loading spinner while Redux is rehydrating
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    // Redirect to sign-in page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
