import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ZoyContext } from '../ZoyContext';

export default function AdminRoute({ children }) {
  const { state } = useContext(ZoyContext);
  const { user } = state;
  return user && user.isAdmin ? children : <Navigate to="/login" />;
}