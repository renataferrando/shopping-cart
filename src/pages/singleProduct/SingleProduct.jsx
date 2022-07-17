import React, { useEffect } from "react";
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
  const { product, productLoading } = useSelector((store) => store.product);
  const { qtySelected } = useSelector((store) => store.cart);
  const { sizeSelected } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = (product) => {
    if (qtySelected === 0 || sizeSelected === null) {
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
      {productLoading && <Loading />}
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
                    <option key={item}>{item}</option>
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
                  <option key={item} value={item}>
                    {item}
                  </option>
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
