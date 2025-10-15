import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import OrderProduct from "../component/OrderProduct";

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

        // Extract and flatten the cart items
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {flatOrders.map((item, index) => (
        <OrderProduct
          key={index}
          productId={item.productId}
          size={item.size}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
}

export default Orders;
