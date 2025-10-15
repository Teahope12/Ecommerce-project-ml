import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [currentForm, setCurrentForm] = useState("Sign Up");
  const { backendUrl, Ctoken, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const SubmitEvent = async (e) => {
    e.preventDefault();
    try {
      if (currentForm === "SignUp") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });

        const { success, message, token } = response.data;

        if (!success) {
          window.alert(message || "An error occurred. Please try again.");
          return;
        } else {
          setToken(token);

          window.alert(message || "An error occurred. Please try again.");
          localStorage.setItem("token", token);
          return;
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });

        const { success, message, token } = response.data;
        if (!success) {
          window.alert(message || "An error occurred. Please try again.");
          return;
        } else {
          setToken(token);
          localStorage.setItem("token", token);

          navigate("/");

          return;
        }
      }
    } catch (error) {
      window.alert(error.response.data.message || "Something Went Wrong");
    }
   
  };
  useEffect(()=>
    {
      if(Ctoken){navigate('/')};
    },[Ctoken])
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {currentForm}
        </h2>
        <form
          onSubmit={(e) => {
            SubmitEvent(e);
          }}
        >
          {currentForm === "SignUp" && (
            <>
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
                  onChange={(e) => handleNameChange(e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
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
              onChange={(e) => handleEmailChange(e)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
               focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              onChange={(e) => handlePasswordChange(e)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm
             hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {currentForm}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
