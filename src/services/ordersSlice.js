import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { verifyAdmin } from "../utils/utils";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (customerId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/orders/get/${customerId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (customerId) => {
    if (verifyAdmin(customerId)) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/orders/get/${customerId}`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("unauthorized");
    }
  }
);

export const sendOrder = createAsyncThunk(
  "/orders/sendOrder",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/orders/add/${data.customerId}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { ordersItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
      if (!Array.isArray(state.ordersItems)) {
        state.ordersItems = [state.ordersItems];
      }
    });

    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
    });
  },
});

export default ordersSlice.reducer;
