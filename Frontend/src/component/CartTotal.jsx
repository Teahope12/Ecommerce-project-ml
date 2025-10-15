import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";

function CartTotal() {
  const [totalcartvalue, setcartvalue] = useState(0);
  const { cart, cartvalue } = useContext(ShopContext);
  useEffect(() => {
    setcartvalue(cartvalue);
  }, [cart]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 border-t">
      <span className="text-xl font-bold mb-2 sm:mb-0">Total:</span>
      <span className="text-2xl font-bold text-green-500">
        ${totalcartvalue}
      </span>
    </div>
  );
}

export default CartTotal;
