import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [image1, setImages1] = useState(null);
  const [image2, setImages2] = useState(null);
  const [image3, setImages3] = useState(null);
  const [image4, setImages4] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSizeClick = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image1) {
      toast.error("At least add 1 Image");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subcategory", subCategory);
      formData.append("price", productPrice);
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("bestseller", isBestseller);
      formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData);

      if (response.data.success) {
        toast.success("Product added Successfully");
        setProductName("");
        setProductDescription("");
        setProductCategory("Women");
        setSubCategory("Topwear");
        setProductPrice("");
        setSelectedSizes([]);
        setIsBestseller(false);
        setImages1(null);
        setImages2(null);
        setImages3(null);
        setImages4(null);
      } else {
        toast.error("Failed to add Product");
      }
    } catch (error) {
      toast.error("Failed to add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-3xl p-8 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 font-serif">
          Add Product
        </h2>

        {/* Image Upload */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((num) => {
            const imageState = [image1, image2, image3, image4][num - 1];
            const setImageState = [setImages1, setImages2, setImages3, setImages4][num - 1];
            return (
              <label
                key={num}
                className="flex flex-col items-center justify-center h-24 bg-gray-200 border rounded-xl cursor-pointer hover:bg-indigo-100 transition"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageState(e.target.files[0])}
                />
                <span className="text-sm text-gray-700">
                  {imageState ? imageState.name : "Upload"}
                </span>
              </label>
            );
          })}
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            className="w-full p-2 border rounded-xl"
            placeholder="Type here"
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            value={productDescription}
            className="w-full p-2 border rounded-xl"
            placeholder="Write content here"
            rows="3"
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        {/* Category & Subcategory */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Product Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-2 border rounded-xl"
            >
              <option>Women</option>
              <option>Men</option>
              <option>Kids</option>
              <option>None</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Sub Category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full p-2 border rounded-xl"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
              <option>None</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border rounded-xl"
            placeholder="25"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL", "10", "None"].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 border rounded-xl transition ${
                  selectedSizes.includes(size)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 hover:bg-indigo-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="mb-6">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={isBestseller}
              className="mr-2"
              onChange={(e) => setIsBestseller(e.target.checked)}
            />
            Mark as Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding, Please Wait..." : "ADD"}
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
};

export default AddProduct;
