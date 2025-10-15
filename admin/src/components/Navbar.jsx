import React from "react";
import { motion } from "framer-motion";

function Navbar({ setToken }) {
  return (
    <motion.nav
      className="bg-gradient-to-r from-indigo-100 via-pink-100 to-rose-100 sticky top-0 w-screen z-50 rounded-b-3xl shadow-md"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6 py-4">
        {/* Branding */}
        <h1 className="text-2xl font-semibold font-serif text-gray-800">
          Tiyasha Admin
        </h1>

        {/* Logout Button */}
        <motion.button
          onClick={() => setToken("")}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-600 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
