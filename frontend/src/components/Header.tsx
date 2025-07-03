import useAuth from "@/hooks/useAuth";
import { assets } from "../assets/assets";
import Menu from "./Menu";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const [isLogin, , client] = useAuth();
  const handleLogin = () => {
    if (client && !isLogin) {
      client.login();
    }
  };

  const handleLogout = () => {
    if (client && isLogin) {
      client.logout({
        redirectUri: "http://localhost:3001/", // URL sau khi đăng xuất
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
          {isLogin ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 px-6 py-2"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
