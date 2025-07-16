import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Database, FolderPlus, CirclePlus, Upload } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home size={16} />,
    label: "Home",
    path: "/",
  },

  {
    icon: <Database size={16} />,
    label: "Dataverse",
    path: "/dataverse",
  },

  {
    icon: <Upload size={16} />,
    label: "Upload File",
    path: "/uploadFile",
  },
];

const Menu: React.FC = () => {
  const dataverseUrl = import.meta.env.VITE_DATAVERSE_IDENTIFIER;
  const navigate = useNavigate();
  const location = useLocation();
  const [openAddData, setOpenAddData] = useState<boolean>(false);

  return (
    <div className="flex flex-wrap gap-2">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          onClick={() => navigate(item.path)}
          className={`flex items-center px-6 py-2 gap-2 transition-colors duration-300 animate-fade-in ${
            location.pathname === item.path
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Button>
      ))}
      {/* <div className="relative">
        <Button
          variant={location.pathname === "addData" ? "default" : "ghost"}
          id="dropdownAddDataButton"
          data-dropdown-toggle="dropdown"
          onClick={() => setOpenAddData((prev) => !prev)}
          // onClick={() => navigate(item.path)}
          className={`flex items-center px-6 py-2 gap-2 transition-colors duration-300 animate-fade-in ${
            location.pathname === "hello"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <CirclePlus />
          <span className="font-medium">Add Data</span>
        </Button>

        {openAddData && (
          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownAddDataButton"
            >
              <li>
                <a
                  href={`${dataverseUrl}/dataverse.xhtml?ownerId=1`}
                  target="_blank"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Add a Dataverse
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={`${dataverseUrl}/dataset.xhtml?ownerId=1`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Add a Dataset
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/uploadFile")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  Add a file
                </button>
              </li>
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Menu;
