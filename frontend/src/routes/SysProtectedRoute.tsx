// src/components/SysProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SysProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("sys_token");

  if (!token) {
    return <Navigate to="/sys/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("sys_token");
      return <Navigate to="/sys/login" state={{ from: location }} replace />;
    }
  } catch {
    localStorage.removeItem("sys_token");
    return <Navigate to="/sys/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default SysProtectedRoute;
