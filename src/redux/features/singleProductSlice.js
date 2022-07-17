import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  productLoading: false,
  error: "",
};

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    return axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => response.data);
  }
);

const SingleproductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productLoading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.product = [];
      state.error = action.error.message;
    });
  },
});

export default SingleproductSlice.reducer;
