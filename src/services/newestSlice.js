import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import image1 from "../images/product1.webp";
import image2 from "../images/product2.jpg";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "items/fetchProducts",
  async (languageCode) => {
    const response = await axios.get(`http://localhost:5000/${languageCode}`);
    return response.data.products;
  }
);

const itemsSlice = createSlice({
  /* name: "items",
  initialState: [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      price: 200,
      category: "Category 1",
      manufacturer: "Lorem",
      unit: "250 g",
      origin: "HU",
      date_added: Date.parse("2023.08.11"),
      slug: "best-product-healthy-organic-raw-vegan",
      images: [
        { src: image1, alt: "Image 1" },
        { src: image2, alt: "Image 2" },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 100,
      category: "Category 2",
      manufacturer: "Ipsum",
      unit: "1 litre",
      origin: "IL",
      date_added: Date.parse("2022.07.11"),
      slug: "best-product-healthy-organic-raw-vegan",
      images: [
        { src: image1, alt: "Image 1" },
        { src: image2, alt: "Image 2" },
      ],
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
      date_added: Date.parse("2023.07.11"),
      slug: "best-product-healthy-organic-raw-vegan",
      images: [
        { src: image1, alt: "Image 1" },
        { src: image2, alt: "Image 2" },
      ],
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      price: 100,
      category: "Category 4",
      manufacturer: "Sub",
      unit: "2 kg",
      origin: "US",
      date_added: Date.parse("2020.07.11"),
      slug: "best-product-healthy-organic-raw-vegan",
      images: [
        { src: image1, alt: "Image 1" },
        { src: image2, alt: "Image 2" },
      ],
    },
    {
      id: 5,
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      price: 10,
      category: "Category 6",
      manufacturer: "Sub",
      unit: "100 g",
      origin: "US",
      date_added: Date.parse("2023.02.11"),
      slug: "best-product-healthy-organic-raw-vegan",
      images: [
        { src: image1, alt: "Image 1" },
        { src: image2, alt: "Image 2" },
      ],
    },
  ],*/
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
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

export const getProduct = (state, id) => {
  return state.items.find((item) => item.id === id);
};
export const { sortItems } = itemsSlice.actions;

export default itemsSlice.reducer;
