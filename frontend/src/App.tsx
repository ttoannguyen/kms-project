// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { routes } from "./routes/routes";

import "./styles/globals.css";
import "./styles/swiper.css";
import { SysAuthProvider } from "./contexts/SysAuthContext";
import { KeycloakConfigProvider } from "./contexts/KeycloakConfigContext ";
import { Toaster } from "sonner";

const App = () => {
  return (
    <KeycloakConfigProvider>
      <AuthProvider>
        <SysAuthProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </SysAuthProvider>
      </AuthProvider>
    </KeycloakConfigProvider>
  );
};

export default App;
