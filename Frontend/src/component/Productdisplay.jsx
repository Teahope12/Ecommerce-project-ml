import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

function Product({ id, name, price }) {
  const [selectImage, setSelectImage] = useState(null);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setSelectImage(product.images[0]?.url);
    }
  }, [products, id]);

  return (
    <Link to={`/product/${id}`}>
      <motion.div
        className="w-[15rem] h-[22rem] m-4 bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 rounded-2xl shadow-md flex flex-col justify-between items-center overflow-hidden hover:shadow-lg transition duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <img
          className="w-[15rem] h-64 object-cover rounded-xl"
          src={selectImage}
          alt={name}
        />
        <h3 className="font-serif font-semibold text-center text-gray-800 mt-2">
          {name}
        </h3>
        <p className="pb-4 text-indigo-600 font-bold">${price}</p>
      </motion.div>
    </Link>
  );
}

export default Product;
