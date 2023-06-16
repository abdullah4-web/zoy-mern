import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const truncatedTitle =
    product.title.length > 19 ? product.title.slice(0, 19) + '...' : product.title;

  return (
    <Link to={`/products/${product._id}`} className="centered-button">
      <div className="product-card">
        <div className="card h-100 mb-3 product-card">
          <img className="card-img-top product-image" src={product.image} alt={product.title} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title product-title">{truncatedTitle}</h5>
            <p className="card-text text-center text-bold product-price">${product.price}</p>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Link to={`/products/${product._id}`} className="btn btn-success btn-sm read-more-btn">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
