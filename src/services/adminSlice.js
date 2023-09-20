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
export const fetchAllTickets = createAsyncThunk(
  "admin/fetchTickets",
  async (adminId) => {
    if (adminId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/ticket/get/all/`,
          { params: { adminId: adminId }, withCredentials: true }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
);

export const updateTicket = createAsyncThunk(
  "/admin/updateTicket",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/ticket/update/${data.ticketId}`,
        data,
        { withCredentials: true }
      );
      await thunkAPI.dispatch(fetchAllTickets());

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: { ordersItems: [], ticketsItems: [] },
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
    builder.addCase(fetchAllTickets.fulfilled, (state, action) => {
      state.ticketsItems = action.payload;
      if (!Array.isArray(state.ordersItems)) {
        state.ticketsItems = [state.ticketsItems];
      }
    });

    builder.addCase(updateTicket.fulfilled, (state, action) => {
      //state.ordersItems = action.payload;
    });
  },
});

export default adminSlice.reducer;
