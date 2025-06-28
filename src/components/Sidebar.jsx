import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const linkClasses =
    "flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300";

  return (
    <div
      className={`h-screen bg-orange-600 rounded-r-2xl text-white p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-23" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      {/* <div className="collapse"> */}
        <button
          onClick={toggleSidebar}
          className="mb-6 focus:outline-none hover:bg-gray-700 p-2 rounded"
        >
          <MenuIcon className="text-gray-800"/>
        </button>
      {/* </div> */}
      {/* Nav Links */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? " text-gray-800" : ""}`
        }
      >
        <ArrowBackIcon />
        {!collapsed && <span>Back</span>}
      </NavLink>

      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${linkClasses} mt-4 ${
            isActive ? "bg-white text-gray-800" : "hover:bg-gray-700"
          }`
        }
      >
        <HomeIcon/>
        {!collapsed && <span>Home</span>}
      </NavLink>

      <NavLink
        to="/form"
        className={({ isActive }) =>
          `${linkClasses} mt-4 ${
            isActive ? "bg-white text-gray-800" : "hover:bg-gray-700"
          }`
        }
      >
        <PersonAddIcon />
        {!collapsed && <span>Submit</span>}
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${linkClasses} mt-4 ${
            isActive ? "bg-white text-gray-800" : "hover:bg-gray-700"
          }`
        }
      >
        <InfoIcon />
        {!collapsed && <span>About</span>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
