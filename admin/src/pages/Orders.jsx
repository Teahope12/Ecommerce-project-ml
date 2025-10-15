import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/listadmin`);
        const ordersArray = response.data.order;

        const ordersWithProducts = await Promise.all(
          ordersArray.map(async (order) => {
            const productDetails = await Promise.all(
              order.cart.map(async (item) => {
                const productId = Object.keys(item)[0];
                const quantity = item[productId].S;

                const productResponse = await axios.post(
                  `${backendUrl}/api/product/listsingle`,
                  { _id: productId }
                );

                const productWithQuantity = {
                  ...productResponse.data.product,
                  quantity,
                };

                return productWithQuantity;
              })
            );

            return {
              ...order,
              productDetails
            };
          })
        );

        setOrders(ordersWithProducts);
        
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="p-6 font-sans bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 rounded-3xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 font-serif">
        Admin Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm rounded-xl overflow-hidden shadow">
            <thead className="bg-white text-gray-700 font-semibold">
              <tr>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Payment</th>
                <th className="border p-3">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-indigo-50 transition duration-200">
                  <td className="border p-3">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="border p-3">{order.email}</td>
                  <td className="border p-3">
                    {order.street}, {order.city}, {order.state}
                  </td>
                  <td className="border p-3 uppercase text-indigo-600 font-medium">
                    {order.paymentMethod}
                  </td>
                  <td className="border p-3">
                    <table className="w-full text-xs border rounded-xl overflow-hidden">
                      <thead className="bg-indigo-100 text-gray-700">
                        <tr>
                          <th className="border p-2">Image</th>
                          <th className="border p-2">Name</th>
                          <th className="border p-2">Price</th>
                          <th className="border p-2">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.productDetails.map((product) => (
                          <tr key={product._id} className="hover:bg-pink-100 transition duration-200">
                            <td className="border p-2">
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-xl"
                              />
                            </td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">₹{product.price}</td>
                            <td className="border p-2">{product.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
