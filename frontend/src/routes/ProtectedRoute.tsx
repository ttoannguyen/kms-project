// // components/ProtectedRoute.tsx
// import { useAuth } from "@/contexts/AuthProvider";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({
//   children,
//   requiredRoles = [],
//   redirectTo = "/unauthorized",
// }: {
//   children: React.ReactNode;
//   requiredRoles?: string[];
//   redirectTo?: string;
// }) => {
//   const { isAuthenticated, isLoading, hasRole } = useAuth();

//   if (isLoading) return <div>Loading...</div>;

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   if (
//     requiredRoles.length > 0 &&
//     !requiredRoles.some((role) => hasRole(role))
//   ) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import { useAuth } from "@/contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { useSystemStore } from "@/stores/useSystemStore";
import { useEffect } from "react";

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  redirectTo = "/unauthorized",
}: {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}) => {
  const { isAuthenticated, isLoading, hasRole, client } = useAuth();
  const maintenance = useSystemStore((state) => state.maintenance);
  const location = useLocation();

  const allowDuringMaintenance =
    location.pathname.startsWith("/admin-secret-login") ||
    location.pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAuthenticated && client) {
      client.login();
    }
  }, [isAuthenticated, client]);

  if (isLoading) return <div>Loading...</div>;

  if (maintenance && !allowDuringMaintenance) {
    return <Navigate to="/maintenance" replace />;
  }

  if (!isAuthenticated) {
    return <div className="text-center p-8">Redirecting to login...</div>;
  }

  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => hasRole(role))
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
