import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
