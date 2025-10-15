import React from "react";
import Hero from "../component/Hero";
import LeadingProduct from "../component/LeadingProduct";
import Policy from "../component/Policy";
import BestSeller from "../component/BestSeller";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 py-12 mt-10 rounded-3xl shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LeadingProduct />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BestSeller />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Policy />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
