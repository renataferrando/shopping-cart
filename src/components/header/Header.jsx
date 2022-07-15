import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

import "./_header.scss";

const Header = () => {
  const [cartOpen, setCartOpen] = useState();
  const { cartItems } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <p className="logo" onClick={() => navigate(`/`)}>
          ADMIN
        </p>
        <nav>
          <a className="nav-links" onClick={() => navigate(`/products`)}>
            PRODUCTS
          </a>
        </nav>
        <div className="cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-bag"
            viewBox="0 0 16 16"
            onClick={() => {
              setCartOpen(true);
            }}
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
          {cartItems.length !== 0 && (
            <div className="item-indicator">{cartItems.length}</div>
          )}
        </div>
      </div>
      <Cart cartOpen={cartOpen} cartClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
