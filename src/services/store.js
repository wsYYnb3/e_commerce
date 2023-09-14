import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";
import categoriesReducer from "./categoriesSlice";
import ordersReducer from "./ordersSlice";
import adminReducer from "./adminSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
    items: itemsReducer,
    favorites: favoritesReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export const lastAction = (store) => (next) => (action) => {
  let result = next(action);
  store.getState().lastAction = action;
  return result;
};
