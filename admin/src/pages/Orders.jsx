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

                console.log(
                  `Product details for order ${order._id}:`,
                  productWithQuantity
                );

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
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">
                    {order.street}, {order.city}, {order.state}
                  </td>
                  <td className="border p-2 uppercase">{order.paymentMethod}</td>
                  <td className="border p-2">
                    <table className="w-full text-xs border">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border p-1">Image</th>
                          <th className="border p-1">Name</th>
                          <th className="border p-1">Price</th>
                          <th className="border p-1">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.productDetails.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-100">
                            <td className="border p-1">
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            </td>
                            <td className="border p-1">{product.name}</td>
                            <td className="border p-1">₹{product.price}</td>
                            <td className="border p-1">{product.quantity}</td>
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
