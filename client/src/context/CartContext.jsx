import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart as addCartAPI,
  addCustomPizza as addCustomPizzaAPI,
  updateCart,
  updateCartSize as updateSizeAPI,
  removeItem,
  clearCart,
} from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Fetch Cart
  // ===========================

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();

      if (data.success) {
        setCart(data.cart?.items || []);
      }
    } catch (err) {
      console.log("Fetch Cart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ===========================
  // Normal Pizza
  // ===========================

  const addToCart = async (
    pizzaId,
    size = "Medium",
    quantity = 1
  ) => {
    try {
      const data = await addCartAPI({
        pizzaId,
        size,
        quantity,
      });

      if (data.success) {
        await fetchCart();
      }
    } catch (err) {
      console.log("Add Cart Error:", err);
    }
  };

  // ===========================
  // Custom Pizza
  // ===========================

  const addCustomPizza = async (pizzaData) => {
    try {
      const data = await addCustomPizzaAPI(pizzaData);

      if (data.success) {
        await fetchCart();
        return data;
      }
    } catch (err) {
      console.log("Custom Pizza Error:", err);
      throw err;
    }
  };

  // ===========================
  // Update Quantity
  // ===========================

  const updateQuantity = async (itemId, quantity) => {
  try {
    const data = await updateCart(itemId, quantity);

    if (data.success) {
      await fetchCart();
    }
  } catch (err) {
    console.log("Update Quantity Error:", err);
  }
};

  // ===========================
  // Update Size
  // ===========================

  const updateSize = async (itemId, size) => {
    try {
      const data = await updateSizeAPI({
        itemId,
        size,
      });

      if (data.success) {
        await fetchCart();
      }
    } catch (err) {
      console.log("Update Size Error:", err);
    }
  };
    // ===========================
  // Remove Item
  // ===========================

  const removeFromCart = async (id) => {
    try {
      const data = await removeItem(id);

      if (data.success) {
        await fetchCart();
      }
    } catch (err) {
      console.log("Remove Cart Error:", err);
    }
  };

  // ===========================
  // Clear Cart
  // ===========================

  const clearUserCart = async () => {
    try {
      const data = await clearCart();

      if (data.success) {
        setCart([]);
      }
    } catch (err) {
      console.log("Clear Cart Error:", err);
    }
  };

  // ===========================
  // Cart Totals
  // ===========================

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,

        // Normal Pizza
        addToCart,

        // Custom Pizza
        addCustomPizza,

        // Cart Operations
        updateQuantity,
        updateSize,
        removeFromCart,
        clearUserCart,

        // Totals
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}