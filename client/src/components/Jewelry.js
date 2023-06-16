import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JewelryContext } from '../JewelryContext';
import Loader from './Loader';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

const Jewelry = () => {
  const { jewelryProducts, loading, error } = useContext(JewelryContext);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const displayedProducts = jewelryProducts.slice(0, 3); // Slice the array to show only three products

  return (
    <>
      <section className="bg-light">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Featured Product</h1>
              <p className="lead">
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
          <div className="row">
            {displayedProducts.map((product) => (
              <div key={product._id} className="col-12 col-md-4 mb-4">
                <div className="card h-78">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      className="card-img-top jewelry-image"
                      alt="Product"
                      style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                    />
                  </Link>
                  <div className="card-body">
                    <ul className="list-unstyled d-flex justify-content-between">
                      <li className="text-muted text-right">
                        <strong>${product.price}</strong>
                      </li>
                    </ul>
                    <Link to={`/products/${product._id}`} className="h2 text-decoration-none text-dark">
                      {truncateText(product.title, 18)}
                    </Link>
                    <p className="card-text">{truncateText(product.description, 100)}</p>
                    <p className="text-muted"><Rating rating={product.rating} numReviews={product.numReviews} /></p>
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-8 text-center">
                        <Link to={`/products/${product._id}`} className="btn btn-success">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jewelry;
