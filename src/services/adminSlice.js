import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { verifyAdmin } from "../utils/utils";

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchOrders",
  async (adminId) => {
    if (verifyAdmin(adminId)) {
      try {
        const response = await axios.get(`http://localhost:5000/orders/admin`, {
          params: { adminId: adminId },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw { error: "unathorized" };
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/admin/sendOrderStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/orders/update`,
        data,
        { withCredentials: true }
      );
      await thunkAPI.dispatch(fetchAllOrders());

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { ordersItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
      if (!Array.isArray(state.ordersItems)) {
        state.ordersItems = [state.ordersItems];
      }
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      //state.ordersItems = action.payload;
    });
  },
});

export default adminSlice.reducer;