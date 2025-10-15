import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Product from "./Productdisplay";
import { motion } from "framer-motion";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [BestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellerProducts = products.filter(
      (product) => product.bestSeller === true
    );
    setBestSeller(bestSellerProducts);
  }, [products]);

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 mt-10 py-12 px-4 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-red-800 font-semibold text-3xl font-serif italic mb-2">
          Best Seller
        </h1>
        <p className="text-green-900 text-base max-w-xl mx-auto">
          Discover our most loved pieces, handpicked by customers and curated
          for style and comfort.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center mt-10 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {BestSeller.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl shadow-lg bg-white p-4"
          >
            <Product
              id={product._id}
              name={product.name}
              price={product.price}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default BestSeller;
