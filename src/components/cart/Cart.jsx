import React from "react";
import "./_cart.scss";
import Drawer from "../drawer/Drawer";
import useWindowSize from "../../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../redux/features/cartSlice";
import { getTotals } from "../../redux/features/cartSlice";
import { useEffect } from "react";

const Cart = ({ cartOpen, cartClose }) => {
  const [height, width] = useWindowSize();
  const isMobile = width < 391;
  const { cartItems, cartTotalAmount } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteItem(item));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

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
          <div className="price">
            <p className="item-price">
              ${""} {item.productQty * item.price}
            </p>
            <p
              className="delete"
              onClick={() => {
                handleDelete(item);
              }}
            >
              Delete
            </p>
          </div>
        </div>
      ))}
      <div className="subtotal">
        <p>Subtotal: ${cartTotalAmount}</p>
      </div>
    </Drawer>
  );
};

export default Cart;
