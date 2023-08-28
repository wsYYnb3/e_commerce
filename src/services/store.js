import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";
import categoriesReducer from "./categoriesSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    items: itemsReducer,
    favorites: favoritesReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
