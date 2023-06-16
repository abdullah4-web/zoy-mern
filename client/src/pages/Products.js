import React, { useContext, useEffect, useState } from 'react';
import { ZoyContext } from '../ZoyContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Products = () => {
  const { state, dispatch } = useContext(ZoyContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

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
    setSelectedCategory(category);
    dispatch({ type: 'FILTER_PRODUCTS', payload: { category } });
    setCurrentPage(1);
  };

  // Handle search input
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch({ type: 'SEARCH_PRODUCTS', payload: { searchTerm: value } });
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = state.filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(state.filteredProducts.length / productsPerPage);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== currentPage) {
      setCurrentPage(selectedPage);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="sidebar pl-4">
            <h1 className="h2 pb-4">Categories</h1>
            <ul className="list-group">
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === '' ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter('')}
              >
                All Products
              </li>
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === 'electronics' ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter('electronics')}
              >
                Electronics
              </li>
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === 'jewelery' ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter('jewelery')}
              >
                Jewelry
              </li>
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === "men's clothing" ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter("men's clothing")}
              >
                Men's Wearing
              </li>
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === "women's clothing" ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter("women's clothing")}
              >
                Women's Wearing
              </li>
              <li
                className={`list-group-item list-group-item-action ${
                  selectedCategory === "Mobile" ? 'active' : ''
                }`}
                onClick={() => handleCategoryFilter("Mobile")}
              >
                Mobile Phones
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="text-center mb-4">
            <h1 className="h2">Products</h1>
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="row justify-content-center">
            {currentProducts.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
            {state.filteredProducts.length === 0 && <Loader />}
          </div>
          <div className="row justify-content-center">
  <div className="col-12">
    <div className="pagination d-flex justify-content-center">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => selectPageHandler(currentPage - 1)}
        >
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => selectPageHandler(i + 1)}
          >
            <span className="page-link">{i + 1}</span>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => selectPageHandler(currentPage + 1)}
        >
          <span className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default Products;
