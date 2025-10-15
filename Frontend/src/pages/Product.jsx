import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

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
    <div className="flex flex-col md:flex-row justify-around items-start md:items-center mt-10 space-y-8 md:space-y-0 md:space-x-8 px-4">
      {/* Thumbnail Gallery */}
      <div className="flex flex-row md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2">
        {selectedProduct?.images?.map((image, index) => (
          <img
            key={index}
            src={image.url || image} // handle object or string
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-16 md:w-36 md:h-44 cursor-pointer border-2 rounded transition-all duration-200 ${
              selectedImage === (image.url || image)
                ? "border-indigo-500 shadow-lg scale-105"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(image.url || image)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="w-full md:w-[50%]">
        {selectedImage && (
          <img
            className="w-full h-auto md:w-[40rem] md:h-[30rem] border-2 rounded shadow hover:scale-105 transition-transform duration-300"
            src={selectedImage}
            alt={selectedProduct.name || "Product"}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="w-full md:w-[40%] flex flex-col space-y-4">
        <h2 className="text-2xl md:text-3xl font-serif italic">
          {selectedProduct?.name}
        </h2>
        <p className="text-lg md:text-2xl font-bold text-indigo-600">
          ${selectedProduct?.price}
        </p>
        <p className="text-sm md:text-base text-gray-700">
          <span className="text-blue-600 font-semibold">Description:</span>
          <br />
          {selectedProduct?.description || "No description available."}
        </p>

        {/* Select Size Dropdown */}
        <div>
          <label className="block mb-2 text-sm md:text-base text-gray-700 font-semibold">
            Select Size:
          </label>
          <select
            className="border-2 border-gray-300 p-2 rounded w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
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
        <button
  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 w-full md:w-auto"
  onClick={() => {
    if (!selectedSize) {
      // Optional: show a warning toast if size is not selected
      toast.warning("Please select a size before adding to cart!");
      return;
    }
    addToCart(selectedProduct._id, selectedSize);
    toast.success(`${selectedProduct.name} (Size: ${selectedSize}) added to cart!`);
  }}
>
  Add to Cart
</button>
      </div>
    </div>
  );
}

export default Product;
