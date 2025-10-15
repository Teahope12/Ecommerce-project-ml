import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 p-10 mt-16 mb-16 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row justify-evenly gap-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">FOREVER.</h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">COMPANY</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-600 transition">
                About us
              </Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-indigo-600 transition">
                Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-indigo-600 transition"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">GET IN TOUCH</h2>
          <p className="text-gray-700 text-sm">+1-212-456-7890</p>
          <p className="text-gray-700 text-sm">contact@foreveryou.com</p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
