import React, { useState, useRef } from "react";
import "./_product-card.scss";

const ProductCard = ({
  title,
  price,
  firstImage,
  category,
  brand,
  secondImage,
  onClick,
}) => {
  const onHoverRef = useRef();
  const [image, setImage] = useState(false);
  const [isHover, setIsHover] = useState();

  const handleMouseEnter = (e) => {
    if (onHoverRef.current) {
      setImage(!image);
      setIsHover(!isHover);
    }
  };
  return (
    <div
      ref={onHoverRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      className="product-card"
      onClick={onClick}
    >
      <h4 className="title">{title}</h4>
      <img className="image" src={!image ? firstImage : secondImage} />
      <div>
        <span>{category}</span>
        {"  "}
        <span>{brand}</span>
      </div>
      <strong className="price">$ {price}</strong>
    </div>
  );
};

export default ProductCard;
