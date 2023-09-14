import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "items/fetchProducts",
  async (languageCode) => {
    const response = await axios.get(`http://localhost:5000/${languageCode}`);
    return response.data.products;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    sortItems: (state, action) => {
      const property = action.payload.property;
      const order = action.payload.order;
      state.sort((a, b) => {
        if (a[property] < b[property]) return order === "asc" ? -1 : 1;
        if (a[property] > b[property]) return order === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
});

export const getProduct = (state, id) => {
  return state.items.find((item) => item.id === id);
};
export const { sortItems } = itemsSlice.actions;

export default itemsSlice.reducer;
