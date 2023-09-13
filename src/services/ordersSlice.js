import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (customerId) => {
    try {
      console.log("orders fetching");
      const response = await axios.get(
        `http://localhost:5000/orders/get/${customerId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const sendOrder = createAsyncThunk(
  "/orders/sendOrder",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/orders/add/${data.customerId}`,
        data
      );
      await thunkAPI.dispatch(fetchOrders(data.customerId));
      console.log(response);
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
