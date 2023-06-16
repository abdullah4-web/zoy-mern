import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Filter from '../Filter';
import Loader from '../components/Loader';
import Rating from '../components/Rating';

const ProductDetail = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0); // New state for stock

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${_id}`);
      const data = await response.json();
      setProduct(data);
      setStock(data.stock); // Set the stock value
    };

    fetchProduct();
  }, [_id]);

  if (!product) {
    return <Loader />;
  }

  const addToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (product._id) {
        for (let i = 0; i < quantity; i++) {
          dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const renderCartItems = () => {
    if (!cartItems) {
      return null; // or you can show a loading indicator here
    }

    if (cartItems.length === 0) {
      return <p>No items in the cart</p>;
    }

    return (
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {product && (
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mt-5">
              <div className="card mb-3" style={{ border: 'none' }}>
                <img
                  className="card-img img-fluid"
                  src={product.image}
                  alt="Product"
                  style={{ width: '600px', height: '700px', objectFit: 'cover' }}
                  id="product-detail"
                />
              </div>
            </div>
            <div className="col-lg-6 mt-5">
              <div className="card h-60" style={{ border: 'none' }}>
                <div className="card-body d-flex flex-column">
                  <h1 className="h2" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {product.title}
                  </h1>
                  <h6 className="h3 py-2">Price: ${product.price}</h6>
                  <Rating rating={product.rating} numReviews={product.numReviews} />
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Category:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{product.category}</strong>
                      </p>
                    </li>
                  </ul>
                  <h6 style={{ fontFamily: 'Arial, sans-serif' }}>Description:</h6>
                  <p style={{ fontFamily: 'Arial, sans-serif' }}>{product.description}</p>
                  <h6>Stock: {stock}</h6> {/* Display the stock value */}

                  <form action="" method="GET">
                    <input type="hidden" name="product-title" value="Activewear" />
                    <div className="row justify-content-center">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item text-right">Quantity:</li>
                          <li className="list-inline-item">
                            <span className="btn btn-success" onClick={decreaseQuantity}>
                              -
                            </span>
                          </li>
                          <li className="list-inline-item">
                            <span className="badge bg-secondary">{quantity}</span>
                          </li>
                          <li className="list-inline-item">
                            <span className="btn btn-success" onClick={increaseQuantity}>
                              +
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button
                          onClick={addToCart}
                          className="btn btn-success btn-lg"
                          name="submit"
                          value="addtocart"
                          disabled={isLoading || quantity > stock} // Disable the button if quantity exceeds stock
                        >
                          {isLoading ? 'Adding to Cart...' : 'Add To Cart'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <Filter />
    </>
  );
};

export default ProductDetail;
