import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: true,
  error: null,
};

const singleProductReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    default:
      return state;
  }
};

export const SingleProductContext = createContext();

export const SingleProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(singleProductReducer, initialState);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const setSelectedProduct = (productId) => {
    const selectedProduct = state.products.find((product) => product._id === productId);
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: selectedProduct });
  };

  return (
    <SingleProductContext.Provider value={{ state, setSelectedProduct }}>
      {children}
    </SingleProductContext.Provider>
  );
};
