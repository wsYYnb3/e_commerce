import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    items: itemsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
