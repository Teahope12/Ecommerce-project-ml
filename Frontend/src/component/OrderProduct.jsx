import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

function OrderProduct({ productId, size, quantity }) {
  const { backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/listsingle`,
          { _id: productId }
        );
        setProductData(response.data);
      } catch (error) {
        console.error(
          "Error fetching product:",
          error.response?.data || error.message
        );
      }
    };

    fetchProduct();
  }, [productId, backendUrl]);

  if (!productData) {
    return (
      <motion.div
        className="p-4 text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Loading product...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-100 via-pink-100 to-rose-100 rounded-3xl shadow-md p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
        <img
          src={productData.product.images[0]?.url}
          alt={productData.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0">
        <h2 className="text-xl font-semibold text-gray-800 font-serif">
          {productData.name}
        </h2>

        <div className="flex flex-wrap gap-4 mt-2 text-gray-700 text-sm">
          <p>
            <span className="font-medium text-gray-800">Size:</span> {size}
          </p>
          <p>
            <span className="font-medium text-gray-800">Quantity:</span>{" "}
            {quantity}
          </p>
          <p>
            <span className="font-medium text-gray-800">Price:</span> ₹
            {productData.product.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderProduct;
