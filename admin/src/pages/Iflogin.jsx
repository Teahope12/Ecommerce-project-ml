import React from "react";
import AddProduct from "./AddProduct";
import ListProduct from "./ListProduct";
import Orders from "./Orders";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

function Iflogin({ setToken }) {
  return (
    <>
      <ToastContainer />
      <Navbar setToken={setToken} />

      <motion.div
        className="flex flex-row bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 min-h-screen rounded-3xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/Add" element={<AddProduct />} />
            <Route path="/list" element={<ListProduct />} />
            <Route path="/Orders" element={<Orders />} />
          </Routes>
        </div>
      </motion.div>
    </>
  );
}

export default Iflogin;
