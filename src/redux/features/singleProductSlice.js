import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  loading: false,
  error: "",
};

export const getProduct = createAsyncThunk("products/getProduct", (id) => {
  return axios
    .get(`http://localhost:3001/products/${id}`)
    .then((response) => response.data);
});

const SingleproductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.product = [];
      state.error = action.error.message;
    });
  },
});

export default SingleproductSlice.reducer;
