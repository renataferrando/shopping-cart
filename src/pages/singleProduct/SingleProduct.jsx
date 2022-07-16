import React, { useEffect, useState } from "react";
import { getProduct } from "../../redux/features/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import "./_single-product.scss";
import {
  addToCart,
  setQuantity,
  setSize,
} from "../../redux/features/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { loading } = useSelector((store) => store.loading);
  const { qtySelected } = useSelector((store) => store.cart);
  const { sizeSelected } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = (product) => {
    if (qtySelected === 0 && sizeSelected === null) {
      alert("select size");
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleQuantity = (e) => {
    dispatch(setQuantity(parseInt(e.target.value)));
  };
  const handleSize = (e) => {
    dispatch(setSize(parseInt(e.target.value)));
  };

  useEffect(() => {
    dispatch(setQuantity(0));
    dispatch(setSize(null));
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      <div className="single-product-wrapper">
        <div className="top">
          <div className="full-image"></div>
          <div className="top-right">
            <h2>{product.name}</h2>
            <span className="price">${product.price}</span>
            <p>
              Brand: <strong>{product.brand}</strong>
            </p>
            <div>
              <span className="size">Size</span>
              {product.size && (
                <select name="size" id="" onChange={handleSize}>
                  <option selected={true} disabled="disabled" value="">
                    -
                  </option>
                  {product.size.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              )}
              <span className="size">Qty</span>
              <select onChange={handleQuantity} name="qty" id="">
                <option selected={true} disabled="disabled" value="">
                  -
                </option>
                {Array.from(
                  { length: product.countInStock },
                  (_, index) => index + 1
                ).map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>{" "}
            </div>
            <Button
              onClick={() => handleAddToCart(product)}
              label="Add to cart"
              size="medium"
            />
          </div>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
