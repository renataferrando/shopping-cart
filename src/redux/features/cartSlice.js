import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  selectedQty: 0,
  sizeSelected: null,
  cartTotalQty: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.sizeSelected === state.sizeSelected
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQty += state.selectedQty;
      } else {
        const newProduct = {
          ...action.payload,
          productQty: state.selectedQty,
          sizeSelected: state.sizeSelected,
        };
        state.cartItems.push(newProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setQuantity(state, action) {
      state.selectedQty = action.payload;
    },
    setSize(state, action) {
      state.sizeSelected = action.payload;
    },
    deleteItem(state, action) {
      const index = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.id === action.payload.id &&
          cartItem.sizeSelected === action.payload.sizeSelected
      );
      state.cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, setQuantity, setSize, deleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
