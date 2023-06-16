import React, { useContext, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ZoyContext } from '../ZoyContext'; 
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import './ProfileScreen.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, successMessage: action.payload };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorMessage: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, successMessage: '', errorMessage: '' };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(ZoyContext);
  const { user } = state;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate, successMessage, errorMessage }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
    successMessage: '',
    errorMessage: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_MESSAGES' }); // Clear previous messages

    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: 'User updated successfully',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: 'UPDATE_FAIL',
        payload: getError(err),
      });
    }
  };

  return (
    <div className="container profile-container">
      <h1 className="my-3">User Profile</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" className="update-button" disabled={loadingUpdate}>
            {loadingUpdate ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
}
