import { createContext, useContext, useState } from "react";

// CartContext create kiya
export const CartContext = createContext();  // 👈 ab ye export ho gaya

// Custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    setCart((prev) => prev.filter((i) => i.name !== item.name));
  };

  // Cart ka total count (helper)
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}
