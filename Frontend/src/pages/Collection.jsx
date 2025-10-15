import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Product from "../component/Productdisplay";

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

  // Filter checkboxes
  const handleFilterChange = (e, filterType) => {
    const { value, checked } = e.target;
    if (filterType === "category") {
      setCategory(checked ? [...category, value] : category.filter((c) => c !== value));
    } else if (filterType === "subcategory") {
      setType(checked ? [...type, value] : type.filter((t) => t !== value));
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = products.filter((product) => {
      const categoryMatch = category.length ? category.includes(product.category) : true;
      const typeMatch = type.length ? type.includes(product.subcategory) : true;
      return categoryMatch && typeMatch;
    });
    setFilteredProducts(filtered);
  }, [products, category, type]);

  // Apply sorting
  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === "Low to High" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  }, [sortOrder]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Handle image search
  const handleImageSearch = async () => {
    if (!imageFile) return;

    setImageSearchLoading(true);

    try {
      const fd = new FormData();
      fd.append("image", imageFile);

      // Change the URL to your image search endpoint
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
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 p-4">
        <h1 className="p-2 font-semibold text-xl">FILTERS</h1>

        {/* Category Filter */}
        <div className="border-2 p-4">
          <h2 className="font-semibold">CATEGORIES</h2>
          {["Men", "Women", "Kids"].map((cat) => (
            <div key={cat}>
              <input type="checkbox" id={cat} value={cat} onChange={(e) => handleFilterChange(e, "category")} />
              <label htmlFor={cat} className="ml-2">{cat}</label>
            </div>
          ))}
        </div>

        {/* Type Filter */}
        <div className="border-2 p-4 mt-4">
          <h2 className="font-semibold">TYPE</h2>
          {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
            <div key={sub}>
              <input type="checkbox" id={sub} value={sub} onChange={(e) => handleFilterChange(e, "subcategory")} />
              <label htmlFor={sub} className="ml-2">{sub}</label>
            </div>
          ))}
        </div>

        {/* Image Search */}
        <div className="border-2 p-4 mt-4">
          <h2 className="font-semibold">IMAGE SEARCH</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="preview" className="mt-2 max-w-full h-32 object-contain border p-1" />}
          <button
            onClick={handleImageSearch}
            disabled={!imageFile || imageSearchLoading}
            className="mt-2 p-2 bg-blue-600 text-white rounded"
          >
            {imageSearchLoading ? "Searching..." : "Search by Image"}
          </button>
          <button
            onClick={() => { setImageFile(null); setPreview(null); }}
            className="mt-2 ml-2 p-2 bg-gray-300 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="w-full md:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-xl">PRODUCTS</h1>
          <select name="sort" className="border-2 p-2" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Low to High">Sort By: Low to High</option>
            <option value="High to Low">Sort By: High to Low</option>
          </select>
        </div>

        <div className="grid ml-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.map((product) => (
            <Product key={product._id} id={product._id} name={product.name} price={product.price} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
