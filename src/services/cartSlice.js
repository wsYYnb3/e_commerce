import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getOrCreateCustomerId } from "../utils/utils.js";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (customerId, thunkAPI) => {
    try {
      customerId = customerId || getOrCreateCustomerId();
      const response = await axios.get(`/api/cart/get/${customerId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async (data, thunkAPI) => {
    try {
      data.customerId = data.customerId || getOrCreateCustomerId();
      const productId = data.id;
      const postData = {
        ...data,
        productId,
      };
      delete postData.id;

      const response = await axios.post(
        `/api/cart/add/${data.customerId}`,
        postData,
        { withCredentials: true }
      );
      await thunkAPI.dispatch(fetchCart(data.customerId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, thunkAPI) => {
    try {
      data.customer_id = data.customer_id || getOrCreateCustomerId();
      const response = await axios.delete(`/api/cart/update`, {
        data: { customer_id: data.customer_id, product_id: data.product_id },
        withCredentials: true,
      });
      await thunkAPI.dispatch(fetchCart(data.customer_id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (customerId, thunkAPI) => {
    try {
      customerId = customerId || getOrCreateCustomerId();
      const response = await axios.delete(`/api/cart/clear`, {
        data: { customerId },
        withCredentials: true,
      });
      await thunkAPI.dispatch(fetchCart(customerId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const adjustQuantity = createAsyncThunk(
  "cart/adjustQuantity",
  async (data, thunkAPI) => {
    try {
      data.customerId = data.customerId || getOrCreateCustomerId();
      const response = await axios.put(
        `/api/cart/update`,
        {
          customer_id: data.customerId,
          product_id: data.productId,
          quantity: data.quantity,
        },
        { withCredentials: true }
      );
      await thunkAPI.dispatch(fetchCart(data.customerId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], cartCount: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartCount = state.cartItems.length;
    });

    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const { product_id, quantity } = action.payload;

        if (product_id === undefined || product_id === null) {
          return;
        }

        const itemIndex = state.cartItems.findIndex(
          (item) => item && item.product_id === product_id
        );

        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += quantity;
        } else {
          state.cartItems.push(action.payload);
        }

        state.cartCount = state.cartItems.length;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { product_id } = action.meta.arg;
        const index = state.cartItems.findIndex(
          (item) => item.product.id === product_id
        );

        if (index >= 0) {
          state.cartItems.splice(index, 1);
        }
        state.cartCount = state.cartItems.length;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartCount = state.cartItems.length;
      })
      .addCase(adjustQuantity.fulfilled, (state, action) => {
        const { product_id, quantity } = action.payload;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product_id === product_id
        );

        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity = quantity;
        }
        state.cartCount = state.cartItems.length;
      });
  },
});

export default cartSlice.reducer;
