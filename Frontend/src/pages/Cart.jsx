import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../component/CartTotal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { products, cart, cartvalue, updatecart } = useContext(ShopContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const temp = [];
    for (const item in cart) {
      for (const sizel in cart[item]) {
        temp.push({
          id: item,
          size: sizel,
          quantity: cart[item][sizel],
        });
      }
    }
    setSelectedProduct(temp);
  }, [cart]);

  const handlePlaceOrder = () => {
    const totalcartvalue = cartvalue();
    if (totalcartvalue === 0) {
      toast.error("Empty Cart");
    } else {
      Navigate("/placeorder");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 mt-10 py-12 rounded-3xl shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 animate-slide-up">
          Your Cart
        </h1>

        {selectedProduct.length === 0 ? (
          <p className="text-center text-lg text-gray-600 animate-fade-in">
            Your cart is currently empty.
          </p>
        ) : (
          selectedProduct.map((sitems, index) => {
            const productdetails = products.find(
              (product) => product._id === sitems.id
            );
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-6 animate-fade-in"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={productdetails.images[0]?.url}
                    alt={productdetails.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md transform transition duration-300 hover:scale-105"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {productdetails.name}
                    </h2>
                    <p className="text-gray-600">${productdetails.price}</p>
                    <p className="text-gray-600">Size: {sitems.size}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                  <input
                    type="number"
                    min={1}
                    defaultValue={sitems.quantity}
                    className="w-16 p-2 border rounded text-center shadow-sm"
                    onChange={(e) => {
                      updatecart(
                        productdetails._id,
                        sitems.size,
                        Number(e.target.value)
                      );
                    }}
                  />
                  <button
                    onClick={() =>
                      updatecart(productdetails._id, sitems.size, 0)
                    }
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded shadow transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}

        <CartTotal />

        <div className="flex justify-center mt-8 animate-slide-up">
          <button
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
            onClick={handlePlaceOrder}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
