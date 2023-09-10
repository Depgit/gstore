import React from 'react';
import PropTypes from 'prop-types';
import './card.css'; 

function Card({ product }) {
  return (
    <div className="product-card">
      <img src={`https://green--public.s3.amazonaws.com/${product?.image_url}`} alt={product?.title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{product?.title}</h3>
        <p className="product-price">${product?.price}</p>
        <p className="product-price">{product?.description}</p>
        <button className="product-button">Add to Cart</button>
        <button className="product-button">Buy </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
