import React from "react";
import "./_cart.scss";
import Drawer from "../drawer/Drawer";
import useWindowSize from "../../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../redux/features/cartSlice";

const Cart = ({ cartOpen, cartClose }) => {
  const [height, width] = useWindowSize();
  const isMobile = width < 391;
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteItem(item));
  };

  console.log(cartItems);
  return (
    <Drawer
      className="cart"
      position="right"
      width={!isMobile ? "desktop" : "mobile"}
      isOpen={cartOpen}
      onClose={cartClose}
      closeBtn={true}
      positionCloseRight
    >
      <h4>Your Cart</h4>
      {cartItems.map((item) => (
        <div className="cart-item">
          <div className="image"></div>
          <div>
            <h5>{item.name}</h5>
            <p>
              Price: <strong>${item.price}</strong>
            </p>
            <p>
              Brand: <strong>{item.brand}</strong>
            </p>
            <p>Size: {item.sizeSelected}</p>
            <p>Quantity: {item.productQty}</p>
          </div>
          <p
            className="delete"
            onClick={() => {
              handleDelete(item);
            }}
          >
            Delete
          </p>
        </div>
      ))}
    </Drawer>
  );
};

export default Cart;
