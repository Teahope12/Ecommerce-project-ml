import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Product from "../component/Productdisplay";
import { motion } from "framer-motion";

function Collection() {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [sortOrder, setSortOrder] = useState("Low to High");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageSearchLoading, setImageSearchLoading] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (e, filterType) => {
    const { value, checked } = e.target;
    if (filterType === "category") {
      setCategory(checked ? [...category, value] : category.filter((c) => c !== value));
    } else if (filterType === "subcategory") {
      setType(checked ? [...type, value] : type.filter((t) => t !== value));
    }
  };

  useEffect(() => {
    let filtered = products.filter((product) => {
      const categoryMatch = category.length ? category.includes(product.category) : true;
      const typeMatch = type.length ? type.includes(product.subcategory) : true;
      return categoryMatch && typeMatch;
    });
    setFilteredProducts(filtered);
  }, [products, category, type]);

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === "Low to High" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  }, [sortOrder]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleImageSearch = async () => {
    if (!imageFile) return;
    setImageSearchLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", imageFile);
      const resp = await fetch(`http://localhost:3000/api/product/search-image?k=8`, {
        method: "POST",
        body: fd,
      });
      if (!resp.ok) throw new Error("Image search failed");
      const json = await resp.json();
      setFilteredProducts(json.products || []);
    } catch (err) {
      console.error(err);
      alert("Error during image search");
    } finally {
      setImageSearchLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 mt-10 py-12 rounded-3xl shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/4 p-4"
        >
          <h1 className="p-2 font-semibold text-xl text-gray-800">FILTERS</h1>

          <div className="border-2 p-4 rounded-xl bg-white shadow-sm">
            <h2 className="font-semibold text-gray-700">CATEGORIES</h2>
            {["Men", "Women", "Kids"].map((cat) => (
              <div key={cat}>
                <input type="checkbox" id={cat} value={cat} onChange={(e) => handleFilterChange(e, "category")} />
                <label htmlFor={cat} className="ml-2 text-gray-600">{cat}</label>
              </div>
            ))}
          </div>

          <div className="border-2 p-4 mt-4 rounded-xl bg-white shadow-sm">
            <h2 className="font-semibold text-gray-700">TYPE</h2>
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <div key={sub}>
                <input type="checkbox" id={sub} value={sub} onChange={(e) => handleFilterChange(e, "subcategory")} />
                <label htmlFor={sub} className="ml-2 text-gray-600">{sub}</label>
              </div>
            ))}
          </div>

          <div className="border-2 p-4 mt-4 rounded-xl bg-white shadow-sm">
            <h2 className="font-semibold text-gray-700">IMAGE SEARCH</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <motion.img
                src={preview}
                alt="preview"
                className="mt-2 max-w-full h-32 object-contain border p-1 rounded"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
            <button
              onClick={handleImageSearch}
              disabled={!imageFile || imageSearchLoading}
              className="mt-2 p-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded transition duration-300"
            >
              {imageSearchLoading ? "Searching..." : "Search by Image"}
            </button>
            <button
              onClick={() => { setImageFile(null); setPreview(null); }}
              className="mt-2 ml-2 p-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-300"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-3/4 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-xl text-gray-800">PRODUCTS</h1>
            <select
              name="sort"
              className="border-2 p-2 rounded shadow-sm"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Low to High">Sort By: Low to High</option>
              <option value="High to Low">Sort By: High to Low</option>
            </select>
          </div>

          <motion.div
            className="grid ml-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="animate-fade-in"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Product id={product._id} name={product.name} price={product.price} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Collection;
