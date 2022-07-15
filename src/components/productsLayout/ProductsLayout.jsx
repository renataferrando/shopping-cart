import React from "react";
import "./_products-layout.scss";

const ProductsLayout = ({ children }) => {
  return (
    <div className="product-layout">
      <div className="products">{children}</div>
    </div>
  );
};

export default ProductsLayout;
