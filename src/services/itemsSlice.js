import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import image1 from "../images/product1.webp";
import image2 from "../images/product2.jpg";
import axios from "axios";
import { createSelector } from "reselect";

export const getFiveNewestProducts = createSelector(
  (state) => state.items.items,
  (items) => {
    if (!items) return [];

    return [...items]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }
);

export const fetchProducts = createAsyncThunk(
  "items/fetchProducts",
  async (languageCode) => {
    const response = await axios.get(`http://localhost:5000/products`);
    return response.data;
  }
);

export const fetchNewestProducts = createAsyncThunk(
  "items/fetchNewestProducts",
  async (languageCode) => {
    const response = await axios.get(`http://localhost:5000/${languageCode}`);
    return response.data.newestProducts;
  }
);
export const fetchProductById = createAsyncThunk(
  "items/fetchProductById",
  async (productId) => {
    const response = await axios
      .get(`http://localhost:5000/products/${productId}`)
      .catch((e) => console.error("Error fetching product by ID:", e));
    return response.data;
  }
);
const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    selectedProduct: null,
    error: null,
  },
  reducers: {
    sortItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNewestProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewestProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNewestProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProduct = (state, id) => {
  return state.items.find((item) => item.id === id);
};
export const { sortItems } = itemsSlice.actions;

export default itemsSlice.reducer;
