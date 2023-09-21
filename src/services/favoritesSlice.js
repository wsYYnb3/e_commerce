import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk(
  "wishlist/fetchFavorites",
  async (customerId) => {
    if (customerId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/wishlist/get/${customerId}`
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "/wishlist/addToFavorites",
  async (data, thunkAPI) => {
    console.log("data in fetch", data);
    if (data.customerId) {
      try {
        console.log(data);
        const response = await axios.post(
          `http://localhost:5000/wishlist/add/${data.customerId}`,
          data
        );
        await thunkAPI.dispatch(fetchFavorites(data.customerId));

        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "wishlist/removeFromFavorites",
  async (data) => {
    if (data.customerId) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/wishlist/update`,
          { data }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favoritesItems: [], favoritesCount: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoritesItems = action.payload || [];
      state.favoritesCount = state.favoritesItems.length;
    });

    builder
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const { productId } = action.meta.arg;
        if (!productId) return;
        const itemIndex = state.favoritesItems.findIndex(
          (item) => item.product_id === productId
        );

        if (itemIndex === -1) {
          state.favoritesItems.push(action.payload);
        }
        state.favoritesCount = state.favoritesItems.length;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        const { productId } = action.meta.arg;
        const index = state.favoritesItems.findIndex(
          (item) => item.product.id === productId
        );

        if (index >= 0) {
          state.favoritesItems.splice(index, 1);
        }
        state.favoritesCount = state.favoritesItems.length;
      });
  },
});

export default favoritesSlice.reducer;
