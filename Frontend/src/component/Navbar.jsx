import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setToken, Ctoken, setCart } = useContext(ShopContext);
  const Navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-100 via-pink-100 to-rose-100 shadow-md rounded-b-2xl">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 text-gray-800">
        <div className="text-lg md:text-2xl font-bold ml-2 md:ml-10">
          <Link className="hover:text-indigo-500 transition duration-300" to="/">
            Tiyasha Ghosh
          </Link>
        </div>

        <div className="hidden text-lg font-medium md:flex space-x-6 mr-10">
          <Link to="/" className="hover:text-indigo-500 transition duration-300 transform hover:scale-105">
            Home
          </Link>
          <Link to="/collection" className="hover:text-indigo-500 transition duration-300 transform hover:scale-105">
            Collections
          </Link>
          <Link to="/contact" className="hover:text-indigo-500 transition duration-300 transform hover:scale-105">
            Contact
          </Link>
          <Link to="/about" className="hover:text-indigo-500 transition duration-300 transform hover:scale-105">
            About
          </Link>
        </div>

        <div className="flex items-center mr-4 space-x-4">
          <div className="group relative">
            <img
              src="/user.png"
              className="w-10 p-2 rounded-full hover:ring-2 hover:ring-indigo-300 transition duration-300"
              alt="user"
              onClick={() => Navigate("/login")}
            />
            <div className="dropdown-content group-hover:block hidden absolute right-0 mt-2 bg-white text-gray-700 shadow-lg rounded-xl transition-all duration-300 ease-in-out">
              <p className="w-28 p-3 text-center cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 font-semibold">
                My Profile
              </p>
              <p
                className="p-3 text-center cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 font-semibold"
                onClick={() => Navigate("/orders")}
              >
                Orders
              </p>
              <p
                className="p-3 text-center cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 font-semibold"
                onClick={() => {
                  if (Ctoken) {
                    localStorage.removeItem("token");
                    setToken("");
                    setCart({});
                    window.alert("Logged Out Successfully");
                  } else {
                    Navigate("/login");
                  }
                }}
              >
                {Ctoken ? "Logout" : "Login"}
              </p>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img
              src="/cart.webp"
              className="w-12 p-2 hover:scale-110 transition-transform duration-300"
              alt="cart"
            />
            <p className="absolute right-[10px] bottom-[10px] w-5 h-5 bg-indigo-300 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount()}
            </p>
          </Link>
        </div>

        <button
          className="md:hidden text-3xl text-gray-700 focus:outline-none hover:text-indigo-500 transition duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-100 via-pink-100 to-rose-100 text-gray-800 rounded-b-2xl">
          <Link
            to="/"
            className="block px-4 py-2 font-semibold text-center hover:bg-indigo-200 hover:text-indigo-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 font-semibold text-center hover:bg-indigo-200 hover:text-indigo-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/collection"
            className="block px-4 py-2 font-semibold text-center hover:bg-indigo-200 hover:text-indigo-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 font-semibold text-center hover:bg-indigo-200 hover:text-indigo-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
