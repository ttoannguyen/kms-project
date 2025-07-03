// src/App.tsx
// import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import "./styles/globals.css";
import "./styles/swiper.css";
import { RouterProvider } from "react-router-dom";

const App = () => {
  // const [isLogin, token] = useAuth();
  //   console.log(isLogin);
  //   return isLogin ? <TestPrivate token={token} /> : <TestPublic />;
  return <RouterProvider router={routes} />;
};

export default App;
