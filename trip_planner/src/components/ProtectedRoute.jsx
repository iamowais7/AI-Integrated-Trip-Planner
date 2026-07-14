import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

function ProtectedRoute() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
