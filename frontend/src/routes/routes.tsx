import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import About from "@/pages/About";
import Topic from "@/pages/Topic";
import Blog from "@/pages/Blog";
import Dataverse from "@/pages/dataverse/index";
import Dataset from "@/pages/Dataset";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/pages/admin/Layout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import File from "@/pages/File";
// import { getCountData } from "@/services/DataverseApi";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "topics", element: <Topic /> },
      { path: "blog", element: <Blog /> },
      {
        path: "dataverse",
        element: <Dataverse />,
        // loader: async () => {
        //   const countData = await getCountData();
        //   return { countData };
        // },
      },
      { path: "dataset", element: <Dataset /> },
      { path: "file", element: <File /> },
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoute />, //
    children: [
      {
        element: <AdminLayout />,
        children: [{ index: true, element: <AdminDashboard /> }],
      },
    ],
  },
]);
