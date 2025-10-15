import React, { useState, useContext } from "react";
import CartTotal from "../component/CartTotal";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { motion } from "framer-motion";

function PlaceOrder() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const { cart, backendUrl, Ctoken } = useContext(ShopContext);
  const navigate = useNavigate();

  const OrderPlaced = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      paymentMethod,
      cart,
    };

    try {
      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {
          headers: {
            token: Ctoken,
          },
        }
      );
      alert("Order Placed Successfully");
      if (response.status === 201) {
        setLoading(false);
        navigate("/orders");
      }
    } catch (error) {
      console.error("Order failed:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 py-12 mt-10 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Delivery Information Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Delivery Information
            </h2>
            <form onSubmit={OrderPlaced} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Street"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Zipcode"
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {/* Cart Totals */}
              <h2 className="text-xl font-bold my-4 text-gray-800">Cart Totals</h2>
              <CartTotal />

              {/* Payment Method Section */}
              <h2 className="text-xl font-bold my-4 text-gray-800">Payment Method</h2>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {[
                  { method: "strip", label: "Stripe", src: "../public/stripe.png" },
                  { method: "razor", label: "Razorpay", src: "https://razorpay.com/assets/razorpay-glyph.svg" },
                  { method: "cod", label: "CASH ON DELIVERY" },
                ].map((option) => (
                  <button
                    key={option.method}
                    type="button"
                    className={`flex items-center justify-center w-32 h-12 border rounded-xl bg-gray-100 transition duration-300 ${
                      paymentMethod === option.method ? "bg-green-300" : ""
                    }`}
                    onClick={() => setPaymentMethod(option.method)}
                  >
                    {option.src ? (
                      <img src={option.src} alt={option.label} className="w-16" />
                    ) : (
                      option.label
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PlaceOrder;
