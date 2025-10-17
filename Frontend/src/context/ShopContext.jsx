import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [Ctoken, setToken] = useState(null);
  const backendUrl = "https://ecommerce-project-ml-backend.onrender.com";
  const navigate = useNavigate();

  // 🛒 Count total items in cart
  const cartCount = () => {
    let count = 0;
    for (const item in cart) {
      for (const size in cart[item]) {
        count += cart[item][size];
      }
    }
    return count;
  };

  // ➕ Add item to cart
  const addToCart = async (id, size) => {
    const cartcopy = structuredClone(cart);

    if (!size) {
      toast.error("Please select a size");
      return null;
    }

    if (cartcopy[id]) {
      cartcopy[id][size] = (cartcopy[id][size] || 0) + 1;
    } else {
      cartcopy[id] = { [size]: 1 };
    }

    setCart(cartcopy);
    toast.success("Item added to cart!");
    return null;
  };

  // 💰 Calculate total cart value
  const cartvalue = () => {
    let totalprice = 0;
    for (const ids in cart) {
      for (const size in cart[ids]) {
        const product = products.find((p) => p._id === ids);
        if (product) {
          totalprice += product.price * cart[ids][size];
        }
      }
    }
    return totalprice;
  };

  // 🔄 Update cart quantity or remove item
  const updatecart = async (id, size, quantity) => {
    const cartCopy = structuredClone(cart);

    if (quantity === 0) {
      if (cartCopy[id]?.[size]) {
        delete cartCopy[id][size];
        if (Object.keys(cartCopy[id]).length === 0) {
          delete cartCopy[id];
        }
      }
    } else {
      if (!cartCopy[id]) cartCopy[id] = {};
      cartCopy[id][size] = quantity;
    }

    setCart(cartCopy);
    toast.info("Cart updated");
    return null;
  };

  // 📦 Fetch product list
  const productList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(response.data.items);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  // 🔄 Load products on mount
  useEffect(() => {
    productList();
  }, []);

  // 🔐 Restore token from localStorage
  useEffect(() => {
    if (!Ctoken && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [Ctoken]);

  return (
    <ShopContext.Provider
      value={{
        products,
        addToCart,
        cart,
        cartCount,
        cartvalue,
        updatecart,
        backendUrl,
        Ctoken,
        setToken,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
