import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { CartContext } from '../CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import { ZoyContext } from '../ZoyContext';

const PlaceOrderScreen = ({ paymentResponse }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { cartItems = [], shippingAddress, dispatch: ctxDispatch } = useContext(CartContext);
  const { state: zoyState } = useContext(ZoyContext);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
  
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentResult: {
            id: paymentResponse.id,
            status: paymentResponse.status,
            update_time: paymentResponse.update_time,
            email_address: paymentResponse.email_address,
          },
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          isPaid: paymentResponse.success ? true : false, // Set isPaid based on payment success
        },
        {
          headers: {
            authorization: `Bearer ${zoyState.user.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CLEAR_CART' });
      setLoading(false);
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };
  
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    if (!paymentResponse) {
      navigate('/payment');
    }
  }, [navigate, paymentResponse]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <p>
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <p>
                <strong>Method:</strong> Stripe / Card
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Order Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={1}>
                        <img src={item.image} alt={item.name} className="img-fluid" />
                      </Col>
                      <Col>
                        <p>{item.name}</p>
                      </Col>
                      <Col md={4}>
                        <p>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    className="btn-block"
                    disabled={loading}
                    onClick={placeOrderHandler}
                  >
                    {loading ? <LoadingBox /> : 'Place Order'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
