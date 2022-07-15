import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import singleProductReducer from "./features/singleProductSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    loading: productReducer,
    brands: productReducer,
    product: singleProductReducer,
    loading: singleProductReducer,
    cart: cartReducer,
  },
});

export default store;
