import React from "react";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className=" w-fit  md:w-1/8 bg-gray-100 p-4 border-r h-screen">
      {/* Navigation Links */}
      <nav className="space-y-4 w-fit ">
        <NavLink
          to="/Add"
          className=" w-[104px] flex items-center  p-1 md:p-3  md:w-full bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <span className="md:mr-3 text-lg">➕</span> Add Items
        </NavLink>
        <NavLink
          to="/list"
          className="flex  w-[104px] items-center  p-1 md:p-3  md:w-full bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <span className="md:mr-3 text-lg">✅</span> List Items
        </NavLink>
        <NavLink
          to="/Orders"
          className="flex w-[104px]  items-center  p-1 md:p-3  md:w-full bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <span className="md:mr-3 text-lg">✅</span> Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
