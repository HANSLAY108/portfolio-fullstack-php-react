// src/components/common/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the /admin/login page
    return <Navigate to="/admin/login" replace />;
  }

  // If they are authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;