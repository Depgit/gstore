import React, { useState } from 'react';
import './input.css';

const GlassInput = ({ value, onChange, placeholder, type, width }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default GlassInput;
