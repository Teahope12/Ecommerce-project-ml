import React from "react";
import { motion } from "framer-motion";

function Policy() {
  const policies = [
    {
      title: "Easy Exchange",
      description: "Exchange your items hassle-free within 7 days of delivery.",
      image: "/exchange.png",
    },
    {
      title: "7 Day Easy Return",
      description: "Changed your mind? Return it within 7 days, no questions asked.",
      image: "/return.png",
    },
    {
      title: "Best Customer Support",
      description: "Our team is here 24/7 to assist you with anything you need.",
      image: "/contact.png",
    },
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 p-10 mt-16 mb-16 rounded-3xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-evenly items-center gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={policy.image}
              alt={policy.title}
              className="w-24 h-24 mb-4 rounded-xl"
            />
            <h1 className="text-lg font-semibold text-gray-800 italic mb-2">
              {policy.title}
            </h1>
            <p className="text-sm text-gray-600">{policy.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Policy;
