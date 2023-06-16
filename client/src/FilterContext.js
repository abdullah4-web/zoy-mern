import React, { createContext, useEffect, useReducer } from 'react';

// Create the FilterContext
export const FilterContext = createContext();

// Define the initial state
const initialState = {
  loading: true,
  products: [],
  filteredProducts: [],
};

// Define the reducer function
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case 'FILTER_BY_CATEGORY':
      const filteredProducts = state.products.filter(
        (product) => product.category === 'electronics'
      );
      return {
        ...state,
        filteredProducts,
      };
    default:
      return state;
  }
};

// Create the FilterContextProvider component
export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        dispatch({ type: 'FETCH_PRODUCTS', payload: data });
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER_BY_CATEGORY' });
  }, [state.products]);

  return (
    <FilterContext.Provider value={state}>
      {children}
    </FilterContext.Provider>
  );
};
