import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  qtySelected: 0,
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
        state.cartItems[itemIndex].productQty += state.qtySelected;
      } else {
        const newProduct = {
          ...action.payload,
          productQty: state.qtySelected,
          sizeSelected: state.sizeSelected,
        };
        state.cartItems.push(newProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setQuantity(state, action) {
      state.qtySelected = action.payload;
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
    getTotals(state, action) {
      let { total, productQty } = state.cartItems.reduce(
        (acc, item) => {
          const { price, productQty } = item;
          const itemTotal = price * productQty;
          acc.total += itemTotal;
          acc.productQty += productQty;
          return acc;
        },
        {
          total: 0,
          productQty: 0,
        }
      );
      state.cartTotalQty = productQty;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, setQuantity, setSize, deleteItem, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
