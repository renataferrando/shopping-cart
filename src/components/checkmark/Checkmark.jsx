import React from "react";

import "./checkmark.scss";

const Checkmark = ({
  name,
  register,
  label,
  checked,
  onChange,
  value,
  disabled,
}) => {
  return (
    <label className="label">
      {label}
      <input
        className="input"
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
        register={register}
        disabled={disabled}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkmark;
