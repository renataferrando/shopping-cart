import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  productsLoading: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return axios
      .get(`http://localhost:3001/products`)
      .then((response) => response.data);
  }
);
export const getFilteredProducts = createAsyncThunk(
  "productsByBrand/getProductsByBrand",
  async (params) => {
    return axios
      .get(`http://localhost:3001/products?${params}`)
      .then((response) => response.data);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = [...action.payload];
      state.error = "";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.productsLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(getFilteredProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = [...action.payload];
      state.error = "";
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
      state.productsLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
