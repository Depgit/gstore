import React, { useState } from 'react';
import './button.css';

const Button = ({ name, onClick , type}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    console.log({onClick})
    onClick();
  };

  return (
    <button className={`glass-button ${clicked ? 'clicked' : ''}`} type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
