import React, { useState } from "react";
import CartTotal from "../component/CartTotal";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useContext } from "react";

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
  const [loading, setLoading] = useState(false); // For handling API request state
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
      // Here, you would send orderData to your backend API

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {
          headers: {
            token: Ctoken,
          },
        }
      );
      console.log("Order Data:", Ctoken);
      alert("Order Placed Successfully");
      if (response.status === 201) {
        console.log("Order Placed Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error("Order failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Information Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">DELIVERY INFORMATION</h2>
          <form onSubmit={OrderPlaced} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Street"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Zipcode"
                required
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Cart Totals and Payment Methods */}
            <h2 className="text-xl font-bold my-4">CART TOTALS</h2>
            <CartTotal />

            {/* Payment Method Section */}
            <h2 className="text-xl font-bold my-4">PAYMENT METHOD</h2>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className={`flex items-center justify-center w-32 h-12 border rounded bg-gray-100 ${
                  paymentMethod === "strip" ? "bg-green-400" : ""
                }`}
                onClick={() => setPaymentMethod("strip")}
              >
                <img
                  src="/assets/images/strip.png"
                  alt="Stripe"
                  className="w-16"
                />
              </button>
              <button
                type="button"
                className={`flex items-center justify-center w-32 h-12 border rounded bg-gray-100 ${
                  paymentMethod === "razor" ? "bg-green-400" : ""
                }`}
                onClick={() => setPaymentMethod("razor")}
              >
                <img
                  src="https://razorpay.com/assets/razorpay-glyph.svg"
                  alt="Razorpay"
                  className="w-16"
                />
              </button>
              <button
                type="button"
                className={`flex items-center justify-center w-32 h-12 border rounded bg-gray-100 ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                CASH ON DELIVERY
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
