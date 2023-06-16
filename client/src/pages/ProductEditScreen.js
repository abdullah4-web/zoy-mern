import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { ZoyContext } from '../ZoyContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(ZoyContext);
  const { user } = state;
  
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [title, setTitle] = useState('');
const [price, setPrice] = useState(0);
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [image, setImage] = useState('');
const [rating, setRating] = useState(0);
const [numReviews, setNumReviews] = useState(0);
const [stock, setStock] = useState(1); // Add the stock state variable


useEffect(() => {
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/products/${productId}`);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setCategory(data.category);
      setImage(data.image);
      setRating(data.rating);
      setNumReviews(data.numReviews);
      setStock(data.stock); // Set the stock value
      dispatch({ type: 'FETCH_SUCCESS' });
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(err),
      });
    }
  };
  fetchData();
}, [productId]);



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          title,
          price,
          description,
          category,
          image,
          rating,
          numReviews,
          stock, // Add the stock field
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  
  return (
    <Container className="small-container">
      <h1>Edit Product {productId}</h1>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="numReviews">
            <Form.Label>Number of Reviews</Form.Label>
            <Form.Control
              type="number"
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
  <Form.Label>Stock</Form.Label>
  <Form.Control
    type="number"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    required
  />
</Form.Group>

          <div className="mb-3">
            <Button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? <LoadingBox /> : 'Update'}
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
