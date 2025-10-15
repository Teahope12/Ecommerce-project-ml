import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navItems = [
    { path: "/Add", label: "Add Items", icon: "➕" },
    { path: "/list", label: "List Items", icon: "📋" },
    { path: "/Orders", label: "Orders", icon: "📦" },
  ];

  return (
    <motion.aside
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 p-6 h-screen w-fit md:w-1/6 rounded-r-3xl shadow-md"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.nav
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            <NavLink
              to={item.path}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:bg-indigo-100 transition duration-300 text-gray-800 font-medium"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </motion.aside>
  );
};

export default Sidebar;
