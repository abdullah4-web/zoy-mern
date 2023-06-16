import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { ZoyContext } from '../ZoyContext';
import { Alert } from 'react-bootstrap';

const Login = () => {
  const { dispatch } = useContext(ZoyContext);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post('/api/users/signin', user);

      const data = res.data;
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      navigate(redirect || '/shipping');
      setSuccess('Login successful');
    } catch (error) {
      console.log('Error:', error.response.status, error.response.data.message);
      setError('Login failed');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Sign In</button>
          <div className="registration-link">
            New user? <Link to="/siginup">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
