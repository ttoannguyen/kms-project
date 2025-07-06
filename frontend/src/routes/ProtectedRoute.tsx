// components/ProtectedRoute.tsx
import { useAuth } from "@/contexts/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  redirectTo = "/unauthorized",
}: {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => hasRole(role))
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
