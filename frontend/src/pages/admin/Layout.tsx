// src/pages/admin/Layout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

const AdminLayout = () => {
  const { hasRole } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
          {hasRole("kms_admin") && (
            <NavLink
              to="/admin/configs"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "text-gray-700"
              }
            >
              Configs
            </NavLink>
          )}

          {hasRole("kms_admin") && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "text-gray-700"
              }
            >
              Users
            </NavLink>
          )}

          {hasRole("kms_admin") && (
            <NavLink
              to="/admin/news"
              className={({ isActive }) =>
                isActive ? "text-green-600 font-semibold" : "text-gray-700"
              }
            >
              News Management
            </NavLink>
          )}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold" : "text-gray-700"
            }
          >
            Back to home
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
