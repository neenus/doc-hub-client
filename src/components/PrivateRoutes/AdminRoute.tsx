import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: any) => state.auth.user);

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
