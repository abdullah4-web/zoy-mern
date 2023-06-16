import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const AddToCartButton = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <button onClick={addToCart} className="btn btn-success">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
