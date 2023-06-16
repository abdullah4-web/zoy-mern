import React, { useContext } from 'react';
import { FilterContext } from './FilterContext';
import { Link } from 'react-router-dom';
import Loader from './components/Loader';
import Rating from './components/Rating';

const Filter = () => {
  const { loading, filteredProducts } = useContext(FilterContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="container py-5">
      <div className="row text-center pt-3">
        <div className="col-lg-6 m-auto">
          <h1 className="h1">Recent Products of Electronics</h1>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-12 col-md-4 p-3 d-flex flex-column align-items-center" key={product._id}>
            <Link to={`/products/${product._id}`} className="text-decoration-none">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={product.image}
                  className="rounded-circle img-fluid border"
                  alt={product.title}
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <h5 className="mt-3 mb-3">{product.title.slice(0, 30)}</h5>
              <div className="text-center">
              <Rating rating={product.rating} numReviews={product.numReviews} />
                <button className="btn btn-success">Shop Now</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filter;
