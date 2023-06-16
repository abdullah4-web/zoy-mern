import React, { createContext, useEffect, useReducer } from 'react';

export const JewelryContext = createContext();

const initialState = {
  jewelryProducts: [],
  loading: true,
  error: null,
};

const jewelryReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_JEWELRY_PRODUCTS':
      return {
        ...state,
        jewelryProducts: action.payload,
        loading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const JewelryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jewelryReducer, initialState);

  useEffect(() => {
    fetchJewelryProducts();
  }, []);

  const fetchJewelryProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const filteredProducts = data.filter(product => product.category === 'women\'s clothing');

      dispatch({ type: 'FETCH_JEWELRY_PRODUCTS', payload: filteredProducts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <JewelryContext.Provider value={state}>{children}</JewelryContext.Provider>
  );
};
