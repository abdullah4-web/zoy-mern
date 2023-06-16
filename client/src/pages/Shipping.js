import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { ZoyContext } from '../ZoyContext';
import './Shipping.css';
import CheckoutSteps from "../components/CheckoutSteps";


const Shipping = () => {
  const navigate = useNavigate();
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: zoyState } = useContext(ZoyContext);

  const cartItems = cartState?.cartItems || [];
  const {
    fullName = zoyState.user?.fullName || '',
    address = '',
    city = '',
    postalCode = '',
    country = '',
  } = cartState?.shippingAddress || {};

  const [inputFullName, setInputFullName] = useState(fullName);
  const [inputAddress, setInputAddress] = useState(address);
  const [inputCity, setInputCity] = useState(city);
  const [inputPostalCode, setInputPostalCode] = useState(postalCode);
  const [inputCountry, setInputCountry] = useState(country);

  useEffect(() => {
    if (!zoyState.user) {
      navigate('/login?redirect=/shipping');
    } else {
      setInputFullName(zoyState.user.fullName || '');
    }
  }, [zoyState.user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    cartDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName: inputFullName,
        address: inputAddress,
        city: inputCity,
        postalCode: inputPostalCode,
        country: inputCountry,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName: inputFullName,
        address: inputAddress,
        city: inputCity,
        postalCode: inputPostalCode,
        country: inputCountry,
      })
    );
    navigate('/payment');
  };

  return (
    <div className="container shipping-container">
    <CheckoutSteps step1 step2></CheckoutSteps>
    <h1 className="my-3">Shipping Address</h1>
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          value={inputFullName}
          onChange={(e) => setInputFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          value={inputPostalCode}
          onChange={(e) => setInputPostalCode(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          value={inputCountry}
          onChange={(e) => setInputCountry(e.target.value)}
          required
        />
      </div>
      <div className="d-grid mt-4">
        <button className="btn-primary" type="submit">
          Continue
        </button>
      </div>
    </form>
  </div>
  );
};

export default Shipping;
