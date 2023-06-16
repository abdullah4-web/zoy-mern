import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CartContext } from '../CartContext';
import { ZoyContext } from '../ZoyContext';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PlaceOrderScreen from './PlaceOrder';
import Alert from 'react-bootstrap/Alert';

const stripePromise = loadStripe('pk_test_51NFsC8KTXQ5TRT44AwVQKjEFqFoQCDswXmGQQXclOr9SVgXkCPAp9HRE4IaKMXIgg21aTv2tjdgDG0PqXp0KvOss00pQm6aiPm');

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

const toFixed = (num, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return (Math.round(num * factor) / factor).toFixed(decimalPlaces);
};

const CheckoutForm = ({ shippingAddress, setPaymentResponse, setPaymentSuccess }) => {
  const { cartItems, dispatch: cartDispatch } = useContext(CartContext);
  const { state: zoyState } = useContext(ZoyContext);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, shippingAddress]);

  const calculateTotal = () => {
    let price = 0;
    let quantity = 0;
    cartItems.forEach((item) => {
      price += item.price * item.quantity;
      quantity += item.quantity;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);
    setShippingPrice(0); // Example: Set a fixed shipping price
    setTaxPrice((price * 0.15).toFixed(2)); // Example: Calculate tax as 10% of the price
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        address: {
          city: shippingAddress.city,
          postal_code: shippingAddress.postalCode,
          country: 'PK',
          line1: shippingAddress.street,
        },
        name: zoyState.user.name,
        email: zoyState.user.email,
      },
    });

    if (!error) {
      try {
        const response = await axios.post('/api/payment/charge', {
          amount: (totalPrice + shippingPrice + parseFloat(taxPrice)) * 100, // Multiply by 100 to convert to cents
          paymentMethodId: paymentMethod.id,
          shipping_address: shippingAddress,
          customer: {
            name: zoyState.user.name,
            email: zoyState.user.email,
          },
          line_items: cartItems.map((item) => ({
            title: item.title,
            price: item.price * 100, // Multiply by 100 to convert to cents
            quantity: item.quantity,
          })),
          shipping: shippingPrice * 100, // Multiply by 100 to convert to cents
          tax: parseFloat(taxPrice) * 100, // Multiply by 100 to convert to cents
        });

        if (response.data.success) {
          setPaymentResponse(response.data);
          setLoading(false);
          setPaymentSuccess(true);
          return;
        } else {
          throw new Error('Payment failed');
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
        setLoading(false);
      }
    } else {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Your Bill</h2>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">User Information</h5>
              <p className="card-text">Name: {zoyState.user.name}</p>
              <p className="card-text">Email: {zoyState.user.email}</p>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Shipping Address</h5>
              <p className="card-text">Street: {shippingAddress.address}</p>
              <p className="card-text">City: {shippingAddress.city}</p>
              <p className="card-text">Postal Code: {shippingAddress.postalCode}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cart Items</h5>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <img src={item.image} alt={item.title} style={{ width: '100px' }} />
                  <p className="card-text">Title: {item.title}</p>
                  <p className="card-text">Price: ${item.price}</p>
                </div>
              ))}
              <div>
                <p className="card-text">Total Quantity: {totalQuantity}</p>
                <p className="card-text">Total Price: ${totalPrice}</p>
                <p className="card-text">Shipping: ${shippingPrice}</p>
                <p className="card-text">Tax: ${taxPrice}</p>
                <p className="card-text">Grand Total: ${toFixed(totalPrice + shippingPrice + parseFloat(taxPrice), 2)}</p>
              </div>
            </div>
          </div>

          

<form onSubmit={handleSubmit}>
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Payment Details</h5>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '14px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
    </div>
  </div>
  <div className="text-center">
    <button type="submit" disabled={!stripe || loading} className="btn btn-primary">
      {loading ? 'Processing...' : 'Pay now'}
    </button>
  </div>
</form>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const { cartItems, shippingAddress } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  return (
    <div>
      {paymentSuccess ? (
        <PlaceOrderScreen paymentResponse={paymentResponse} />
      ) : (
        <>
          <div className="container py-5">
            <h1>Payment</h1>
            <hr />
            {shippingAddress ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  shippingAddress={shippingAddress}
                  setPaymentResponse={setPaymentResponse}
                  setPaymentSuccess={setPaymentSuccess}
                />
              </Elements>
            ) : (
              <Alert variant="danger">Please provide a valid shipping address</Alert>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
