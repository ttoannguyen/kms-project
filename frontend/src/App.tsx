// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { routes } from "./routes/routes";

import "./styles/globals.css";
import "./styles/swiper.css";

const App = () => {
  

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};

export default App;
