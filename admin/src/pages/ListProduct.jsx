import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

function ListProduct() {
  const [list, setList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.items);
      } else {
        window.alert(response.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      window.alert("Error fetching products: " + error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.log();
      
      const response = await axios.post(backendUrl + "/api/product/remove", {
        id,
      });
      if (response.data.success) {
        window.alert("Product Deleted Successfully");
        fetchProduct();
      }
    } catch (error) {
      window.alert("svffsdgsdgfsfg" + error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Products List</h1>
      {/* Header for larger screens */}
      <div className="hidden lg:grid grid-cols-5 gap-4 text-center font-bold bg-gray-100 p-2 rounded-md mb-4">
        <div>Image</div>
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      {/* Product List */}
      {list.length > 0 ? (
        list.map((item, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-5 grid-cols-1 gap-4 items-center p-4 border rounded-md mb-2"
          >
            {/* Image */}
            <div className="flex justify-center lg:block">
              {item.images && item.images[0] ? (
                <img
                  src={item.images[0].url}
                  alt={item.name || "Product image"}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <p>No image</p>
              )}
            </div>

            {/* Name */}
            <div className="text-center lg:text-left text-gray-700">
              {item.name}
            </div>

            {/* Category */}
            <div className="text-center lg:text-left text-gray-700">
              {item.category}
            </div>

            {/* Price */}
            <div className="text-center lg:text-left text-gray-700 font-bold">
              Rs. {item.price}
            </div>

            {/* Action */}
            <div className="flex justify-center lg:block">
              <button
                className="text-red-500 hover:text-red-700 font-bold"
                onClick={() => deleteProduct(item._id)}
              >
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
}

export default ListProduct;
