import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../services/cartSlice";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";

const getOrCreateCustomerId = () => {
  let customerId = localStorage.getItem("guestCustomerId") || uuidv4();
  localStorage.setItem("guestCustomerId", customerId);
  return customerId;
};

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [cart, setCart] = useState([cartItems]);
  console.log(cartItems, "cartItems");
  const customerId = user?.id || getOrCreateCustomerId();
  console.log(customerId, "customerId");
  useEffect(() => {
    dispatch(fetchCart(customerId));
  }, [dispatch, customerId]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
export const CartContext = React.createContext();
