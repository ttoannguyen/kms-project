import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import About from "@/pages/About";
import Topic from "@/pages/Topic";
import Blog from "@/pages/Blog";
import Dataverse from "@/pages/dataverse/index";
import Dataset from "@/pages/dataset/Dataset";
import File from "@/pages/File";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/pages/admin/Layout";
import ProtectedRoute from "./ProtectedRoute";
import CreateDataverse from "@/pages/dataverse/CreateDataverse";

// Define routes: public routes don't require login, protected routes use ProtectedRoute
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Public
      { path: "login", element: <Login /> }, // Public
      { path: "about", element: <About /> }, // Public
      { path: "topics", element: <Topic /> }, // Public
      { path: "blog", element: <Blog /> }, // Public
      { path: "dataverse", element: <Dataverse /> }, // Public
      { path: "dataset", element: <Dataset /> }, // Public
      { path: "file", element: <File /> }, // Public
      {
        path: "dataverse/create",
        element: <CreateDataverse />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> }, // Protected
    ],
  },
]);
