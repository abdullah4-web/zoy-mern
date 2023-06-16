import React, { useContext, useEffect } from 'react';
import { ZoyContext } from '../ZoyContext';

const ProductComponent = () => {
  const { state, dispatch } = useContext(ZoyContext);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        dispatch({ type: 'FETCH_PRODUCTS', payload: data });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Filter products based on the selected category
  const handleCategoryFilter = (category) => {
    dispatch({ type: 'FILTER_PRODUCTS', payload: { category } });
  };

  return (
    <div>
      <h2>Product Component</h2>
      <button onClick={() => handleCategoryFilter('')}>All</button>
      <button onClick={() => handleCategoryFilter('electronics')}>
        Electronics
      </button>
      <button onClick={() => handleCategoryFilter('jewelery')}>
        Jewelery
      </button>
      {/* Render the filtered products */}
      {state.filteredProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>Category: {product.category}</p>
          {/* Add other product details */}
        </div>
      ))}
    </div>
  );
};

export default ProductComponent;
