import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

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
        console.log(response.data);
        
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
    return <div className="p-4 text-gray-500 text-center">Loading product...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center border rounded-lg shadow-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300 mb-4">
      {/* Product Image */}
      <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={productData.product.images[0]?.url}
          alt={productData.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-0 md:ml-6 mt-3 md:mt-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {productData.name}
        </h2>

        <div className="flex flex-wrap gap-4 mt-2 text-gray-700">
          <p>
            <span className="font-medium">Size:</span> {size}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {quantity}
          </p>
          <p>
            <span className="font-medium">Price:</span> ₹{productData.product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
