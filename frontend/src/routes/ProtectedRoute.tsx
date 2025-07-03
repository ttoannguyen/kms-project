import useAuth from "@/hooks/useAuth";
// import Keycloak from "keycloak-js";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLogin, , client] = useAuth();

  if (!client) {
    return null;
  }

  if (!isLogin) {
    client.login();
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
