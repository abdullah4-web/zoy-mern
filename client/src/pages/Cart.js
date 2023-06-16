import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import {  useNavigate } from 'react-router-dom';
import EmptyCart from '../components/EmptyCart';


const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return <div><EmptyCart /></div>;
  }

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));

  const calculateShippingPrice = (price) => {
    if (price > 100) {
      return round2(0);
    } else {
      return round2(10);
    }
  };
  const shippingPrice = calculateShippingPrice(itemsPrice);

  const calculateTaxPrice = (price) => {
    const taxRate = 0.15; // Change this if needed
    return round2(taxRate * price);
  };
  const taxPrice = calculateTaxPrice(itemsPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item._id === productId);
    if (cartItem.quantity < cartItem.stock) {
      increaseQuantity(productId);
    }
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      decreaseQuantity(productId);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/shipping'); // Navigate to the shipping page
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ color: 'green' }}>Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              // Adjust the quantity if it exceeds the stock
              const quantity = item.quantity > item.stock ? item.stock : item.quantity;
              const itemTotal = round2(item.price * quantity);

              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.image} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-success btn-sm me-1" onClick={() => handleDecreaseQuantity(item._id, quantity)}>
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="btn btn-success btn-sm ms-1"
                        onClick={() => handleIncreaseQuantity(item._id)}
                        disabled={quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>{itemTotal}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>Items Price:</span>
                  <span>${itemsPrice}</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>Shipping Price:</span>
                  <span>${shippingPrice}</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>Tax Price:</span>
                  <span>${taxPrice}</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
              </li>
              <li className="list-group-item">
                <button className="btn btn-primary btn-block" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </li>
              <li className="list-group-item">
                <button className="btn btn-danger btn-block" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
