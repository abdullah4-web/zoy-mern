import React, { createContext, useReducer } from 'react';

// Create the initial state
const initialState = {
  products: [],
  filteredProducts: [],
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null,
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case 'FILTER_PRODUCTS':
      const { category } = action.payload;
      const filtered = category
        ? state.products.filter((product) => product.category === category)
        : state.products;
      return {
        ...state,
        filteredProducts: filtered,
      };
    case 'SEARCH_PRODUCTS':
      const { searchTerm } = action.payload;
      const searched = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...state,
        filteredProducts: searched,
      };
    case 'USER_SIGNIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_SIGNOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// Create the ZoyContext
export const ZoyContext = createContext();

// Create the ZoyContextProvider component
export const ZoyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ZoyContext.Provider value={{ state, dispatch }}>
      {children}
    </ZoyContext.Provider>
  );
};
