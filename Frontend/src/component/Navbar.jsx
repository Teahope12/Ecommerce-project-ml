import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setToken, Ctoken, setCart } = useContext(ShopContext);
  const Navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="text-lg md:text-2xl font-bold ml-2 md:ml-10">
          <Link className="hover:text-gray-300" to="/">
            Tiyasha Ghosh
          </Link>
        </div>

        <div className="hidden text-lg font-semibold md:flex space-x-4 mr-10">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link
            to="/collection"
            className="hover:text-gray-300 transition duration-300"
          >
            Collections
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
        </div>

        <div className="flex items-center mr-4 row-auto">
        
          <div className="group relative cursor-pointer">
            <img
              src="/user.png"
              className="w-10 hover:cursor-pointer p-2"
              alt="user"
              onClick={() => {
                Navigate("/login");
              }}
            />
            <div className="dropdown-content group-hover:block hidden absolute right-0 bg-white shadow-lg rounded-lg">
              <p className="w-28 p-3 text-center cursor-pointer hover:bg-slate-500 hover:text-white font-bold">
                My Profile
              </p>
              <p
                className="p-3 text-center cursor-pointer hover:bg-slate-500 hover:text-white font-bold"
                onClick={() => {
                  Navigate("/orders");
                }}
              >
                Orders
              </p>
              <p
                className="p-3 text-center cursor-pointer hover:bg-slate-500 hover:text-white font-bold"
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
              className="w-16 p-2 hover:cursor-pointer"
              alt="cart"
            />
            <p className="absolute right-[12px] bottom-[12px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartCount()}
            </p>
          </Link>
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block px-4 py-2 font-bold text-center hover:text-white hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 font-bold text-center hover:text-white hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/collection"
            className="block px-4 py-2 font-bold text-center hover:text-white hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 font-bold text-center hover:text-white hover:bg-gray-600"
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
