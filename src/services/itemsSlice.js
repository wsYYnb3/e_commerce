import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
export const fetchSearchResults = createAsyncThunk(
  "items/fetchSearchResults",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { query, language } = params;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?q=${query}&lang=${language}`
      );
      if (!response.data || response.data.length === 0) {
        return rejectWithValue("No results found.");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred.");
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    searchResults: [],
    status: "idle",
    selectedProduct: null,
    error: null,
  },
  reducers: {
    sortItems: (state, action) => {
      state.items = action.payload;
    },
    sortSearch: (state, action) => {
      state.searchResults = action.payload;
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
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
        console.log(state.searchResults);
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.searchResults = [];
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.searchResults = [];
        state.error = action.error.message;
      });
  },
});

export const getProduct = (state, id) => {
  return state.items.find((item) => item.id === id);
};
export const { sortItems, sortSearch } = itemsSlice.actions;

export default itemsSlice.reducer;
