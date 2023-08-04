import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import itemsReducer from "./itemsSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    items: itemsReducer,
  },
});
