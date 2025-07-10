import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
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
import AdminUsers from "@/pages/admin/AdminUser";
import AdminNewsPage from "@/pages/admin/AdminNews";
import MaintenanceGuard from "@/components/maintainPage/MaintenanceGuard";
import AdminConfig from "@/pages/admin/sys/AdminConfig";
import SysLogin from "@/pages/admin/sys/Login";
import SysLayout from "@/pages/admin/sys/Layout";
import SysProtectedRoute from "./SysProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MaintenanceGuard />,
    children: [
      { index: true, element: <Home /> }, // Public
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
      <ProtectedRoute requiredRoles={["kms_admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> }, 
      { path: "users", element: <AdminUsers /> },
      { path: "news", element: <AdminNewsPage /> },
      
    ],
  },
  {
    path: "sys",
    element:<SysLayout />,
    children: [
      { index: true, element: <SysLogin /> },
      {
        path: "admin",
        element: (
          <SysProtectedRoute>
            <AdminConfig />
          </SysProtectedRoute>
        ),
      },
    
    ],
  },
]);
