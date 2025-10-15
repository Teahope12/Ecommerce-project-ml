import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Product() {
  const { productid } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productid);
    if (product) {
      setSelectedProduct(product);
      setSelectedImage(product.images[0]?.url);
    }
  }, [productid, products]);

  if (!products || !products.length) {
    return <p>Loading products...</p>;
  }

  if (!selectedProduct) {
    return <p>Product not found!</p>;
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 py-12 mt-10 px-4 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row justify-around items-start md:items-center space-y-8 md:space-y-0 md:space-x-8 max-w-6xl mx-auto">
        {/* Thumbnail Gallery */}
        <motion.div
          className="flex flex-row md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {selectedProduct?.images?.map((image, index) => (
            <motion.img
              key={index}
              src={image.url || image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-24 h-16 md:w-36 md:h-44 cursor-pointer border-2 rounded-xl transition-all duration-300 ${
                selectedImage === (image.url || image)
                  ? "border-indigo-500 shadow-lg scale-105"
                  : "border-gray-300"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedImage(image.url || image)}
            />
          ))}
        </motion.div>

        {/* Main Image */}
        <motion.div
          className="w-full md:w-[50%]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {selectedImage && (
            <img
              className="w-full h-auto md:w-[40rem] md:h-[30rem] border-2 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
              src={selectedImage}
              alt={selectedProduct.name || "Product"}
            />
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="w-full md:w-[40%] flex flex-col space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-serif italic text-gray-800">
            {selectedProduct?.name}
          </h2>
          <p className="text-2xl font-bold text-indigo-600">
            ${selectedProduct?.price}
          </p>
          <p className="text-base text-gray-700">
            <span className="text-blue-600 font-semibold">Description:</span>
            <br />
            {selectedProduct?.description || "No description available."}
          </p>

          {/* Select Size Dropdown */}
          <div>
            <label className="block mb-2 text-base text-gray-700 font-semibold">
              Select Size:
            </label>
            <select
              className="border-2 border-gray-300 p-2 rounded-xl w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="" disabled>
                Choose a size
              </option>
              {selectedProduct.sizes?.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600 w-full md:w-auto shadow-md transition duration-300"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!selectedSize) {
                toast.warning("Please select a size before adding to cart!");
                return;
              }
              addToCart(selectedProduct._id, selectedSize);
              toast.success(
                `${selectedProduct.name} (Size: ${selectedSize}) added to cart!`
              );
            }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Product;
