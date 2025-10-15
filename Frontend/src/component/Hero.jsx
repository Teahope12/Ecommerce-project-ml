import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      className="flex justify-center mt-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-6xl bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 rounded-3xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Text Section */}
        <motion.div
          className="flex flex-col items-start font-serif space-y-2 md:pl-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-lg md:text-xl text-gray-700">___Our BestSeller</h1>
          <p className="text-xl md:text-3xl font-bold text-gray-800">
            Explore the world of fashion
          </p>
          <p className="text-lg md:text-xl text-indigo-600">Shop Now____</p>
        </motion.div>

        {/* Image Section */}
        <motion.img
          src="/Hero.jpg"
          alt="model"
          className="md:w-[28rem] md:h-[28rem] w-48 h-48 object-cover rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
