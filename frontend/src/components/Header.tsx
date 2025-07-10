// src/components/Header.tsx
import { useAuth } from "@/contexts/AuthProvider";
import { assets } from "../assets/assets";
import Menu from "./Menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSystemStore } from "@/stores/useSystemStore";

const Header: React.FC = () => {
  const { isAuthenticated, client, username, hasRole } = useAuth();
  const navigate = useNavigate();
  const maintenanceMode = useSystemStore((state) => state.maintenance);
  const handleLogin = () => {
    if (client && !isAuthenticated) {
      client.login();
    }
  };

  const handleLogout = () => {
    if (client && isAuthenticated) {
      client.logout({
        redirectUri: "http://localhost:3001/",
      });
    }
  };

  return (
    <div className="bg-[#292d56]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center py-6 gap-4">
          <img src={assets.LogoCTU} alt="Logo CTU" className="w-16 h-16" />
          <div className="text-3xl text-white font-semibold">
            Dataverse - CTU
          </div>
        </div>
      </div>
      <div className="bg-[#373c6a]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Menu />
          <div className="flex items-center gap-4">
            {isAuthenticated && username && (
              <span className="text-white">Hi, {username}</span>
            )}
            {hasRole("kms_admin") && (
              <Button
                onClick={() => navigate("/admin")}
                className="bg-green-500 cursor-pointer hover:bg-green-600 text-white"
              >
                Admin Panel
              </Button>
            )}
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-2"
              >
                Logout
              </Button>
            ) : (
              maintenanceMode ?? (
                <Button
                  onClick={handleLogin}
                  className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2"
                >
                  Login
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
