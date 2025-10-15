import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [currentForm, setCurrentForm] = useState("Sign Up");
  const { backendUrl, Ctoken, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Ctoken) navigate("/");
  }, [Ctoken]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const SubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        currentForm === "SignUp"
          ? "/api/user/register"
          : "/api/user/login";

      const payload =
        currentForm === "SignUp"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(backendUrl + endpoint, payload);
      const { success, message, token } = response.data;

      if (!success) {
        window.alert(message || "An error occurred. Please try again.");
        return;
      }

      setToken(token);
      localStorage.setItem("token", token);
      window.alert(message || "Welcome!");
      if (currentForm === "Login") navigate("/");
    } catch (error) {
      window.alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {currentForm}
        </h2>
        <form onSubmit={SubmitEvent}>
          {currentForm === "SignUp" && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleNameChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
               focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Forgot Password?
            </a>
            <p
              className="text-sm text-indigo-600 cursor-pointer hover:text-indigo-800"
              onClick={() =>
                setCurrentForm(currentForm === "SignUp" ? "Login" : "SignUp")
              }
            >
              {currentForm === "SignUp"
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md
             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition duration-300"
          >
            {currentForm}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;
