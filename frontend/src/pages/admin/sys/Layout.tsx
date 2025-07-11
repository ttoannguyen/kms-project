// src/pages/sys/Layout.tsx
import { Outlet } from "react-router-dom";

const SysLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SysLayout;
