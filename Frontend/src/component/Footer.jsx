import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-2 p-14 mt-16 mb-16 items-center">
      <div className=" flex flex-col lg:flex-row justify-evenly ">
        {/* Left Section */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">FOREVER.</h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-4">COMPANY</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:underline">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-4">GET IN TOUCH</h2>
          <p className="text-gray-700 text-sm">+1-212-456-7890</p>
          <p className="text-gray-700 text-sm">contact@foreveryou.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
