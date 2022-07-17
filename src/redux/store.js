import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import singleProductReducer from "./features/singleProductSlice";
import cartReducer from "./features/cartSlice";
import adminReducer from "./features/adminSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    newProducts: adminReducer,
  },
});

export default store;
