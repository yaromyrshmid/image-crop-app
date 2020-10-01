import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({
  htmlFor,
  type,
  id,
  name,
  label,
  error,
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
      <p className="input-errorText">{error || " "}</p>
    </>
  );
};

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  error: "",
};

export default Input;
