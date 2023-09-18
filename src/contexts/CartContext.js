import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../services/cartSlice";
import { useUser } from "@clerk/clerk-react";

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const [cart, setCart] = useState([cartItems]);
  const customerId = user?.id;
  useEffect(() => {
    dispatch(fetchCart(customerId));
  }, [dispatch]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
export const CartContext = React.createContext();
