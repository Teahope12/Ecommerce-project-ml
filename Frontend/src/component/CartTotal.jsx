import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

function CartTotal() {
  const [totalcartvalue, setcartvalue] = useState(0);
  const { cart, cartvalue } = useContext(ShopContext);

  useEffect(() => {
    setcartvalue(cartvalue);
  }, [cart]);

  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-between items-center mt-6 p-6 bg-gradient-to-r from-indigo-100 via-pink-100 to-rose-100 rounded-2xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
        Total:
      </span>
      <span className="text-2xl font-bold text-green-600">
        ${totalcartvalue}
      </span>
    </motion.div>
  );
}

export default CartTotal;
