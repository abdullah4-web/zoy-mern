import React, { createContext, useEffect, useReducer } from 'react';

// Create the initial state for the context
const initialState = {
  products: [],
  loading: true,
  error: null,
};

// Create the reducer function to update the context state
const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create the product context
export const ProductContext = createContext();

// Create the product context provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
};
