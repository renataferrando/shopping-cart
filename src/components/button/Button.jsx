import React from "react";
import classNames from "classnames";
import "./_button.scss";

const Button = ({ className, onClick, label, type, size, disabled, ...r }) => {
  const classes = classNames("btn", className, {
    "--disabled": disabled,
    [`--${size}`]: size,
  });
  return (
    <button className={classes} type={type} onClick={onClick} {...r}>
      {label}
    </button>
  );
};

export default Button;
