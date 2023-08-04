import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      price: 100,
      category: "Category 1",
      manufacturer: "Lorem",
      unit: "250 g",
      origin: "HU",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 200,
      category: "Category 2",
      manufacturer: "Ipsum",
      unit: "1 litre",
      origin: "IL",
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      price: 300,
      category: "Category 3",
      manufacturer: "Sub",
      unit: "0.6 kg",
      origin: "US",
    },
  ],
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

export const { sortItems } = itemsSlice.actions;

export default itemsSlice.reducer;
