import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import OrderProduct from "../component/OrderProduct";
import { motion } from "framer-motion";

function Orders() {
  const navigate = useNavigate();
  const { Ctoken, backendUrl } = useContext(ShopContext);
  const [flatOrders, setFlatOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!Ctoken) {
        console.log("Token not found. Redirecting to login page.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/order/userorder`,
          {},
          {
            headers: {
              token: Ctoken,
            },
          }
        );

        const orderDetails = response.data.data;
        const flattened = [];

        orderDetails.forEach((order) => {
          const cartItems = Object.values(order.cart);
          cartItems.forEach((productGroup) => {
            Object.entries(productGroup).forEach(([productId, sizes]) => {
              Object.entries(sizes).forEach(([size, quantity]) => {
                flattened.push({ productId, size, quantity });
              });
            });
          });
        });

        setFlatOrders(flattened);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data || error.message
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 py-12 mt-10 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center text-gray-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your Orders
        </motion.h2>

        {flatOrders.length === 0 ? (
          <motion.p
            className="text-center text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            You haven't placed any orders yet.
          </motion.p>
        ) : (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {flatOrders.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <OrderProduct
                  productId={item.productId}
                  size={item.size}
                  quantity={item.quantity}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Orders;
