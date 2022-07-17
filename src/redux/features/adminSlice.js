import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  newProducts: [],
};

export const createNewProducts = createAsyncThunk(
  "newProducts/createNewProducts",
  async (data) => {
    axios
      .post("http://localhost:3001/products", data)
      .then((response) => response);
  }
);

const newProductSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {
    resetPostState(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createNewProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newProducts = action.payload;
      })
      .addCase(createNewProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetPostState } = newProductSlice.actions;

export default newProductSlice.reducer;
