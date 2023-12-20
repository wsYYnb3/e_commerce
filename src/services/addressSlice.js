import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchBillingAddress = createAsyncThunk(
  "address/fetchBillingAddress",
  async (customerId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/address/get/billing/${customerId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchShippingAddress = createAsyncThunk(
  "address/fetchShippingAddress",
  async (customerId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/address/get/shipping/${customerId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: { shippingAddresses: [], billingAddresses: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBillingAddress.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.billingAddresses = action.payload.map(
          (item) => item.billing_address
        );
      } else {
        state.billingAddresses = [action.payload.billing_address];
      }
    });

    builder.addCase(fetchShippingAddress.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.shippingAddresses = action.payload.map(
          (item) => item.shipping_address
        );
      } else {
        state.shippingAddresses = [action.payload.shipping_address];
      }
    });
  },
});

export default addressSlice.reducer;
