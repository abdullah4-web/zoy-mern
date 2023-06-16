import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { NavDropdown, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "./NavBar";
import { CartContext } from "../CartContext";
import { ZoyContext } from "../ZoyContext";
import "./Header.css";

function Header() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { state, dispatch } = useContext(ZoyContext);

  const handleToggleClick = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    const handleNavLinkClick = () => {
      if (isMobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    // Attach event listeners
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavLinkClick);
    });

    // Cleanup the event listeners when component unmounts
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavLinkClick);
      });
    };
  }, [isMobileNavOpen]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    
    window.location.href = "/login";
  };

  return (
    <>
      <NavBar />
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <NavLink exact to="/" className="navbar-brand text-success logo h1 align-self-center">
            Zoy Shop
          </NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={handleToggleClick}
            aria-controls="templatemo_main_nav"
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between ${
              isMobileNavOpen ? "show" : ""
            }`}
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto text-center">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/about" className="nav-link">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/products" className="nav-link">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/contact" className="nav-link">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  {state.user ? (
                    <>
                      {state.user.isAdmin ? (
                        <NavDropdown
                          title="Admin"
                          id="admin-nav-dropdown"
                          className="desktop-dropdown"
                          onClick={handleToggleClick} // Close mobile nav on dropdown click
                        >
                          <LinkContainer to="/admin/dashboard">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/products">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/orders">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/users">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                      ) : (
                        <NavDropdown
                          title={state.user.name}
                          id="basic-nav-dropdown"
                          className="desktop-dropdown"
                          onClick={handleToggleClick} // Close mobile nav on dropdown click
                        >
                          <LinkContainer to="/profile">
                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                      )}
                    </>
                  ) : (
                    
                      <li className="nav-item">
                    <NavLink className="nav-link" to="/login" >
                      Sign In
                      
                    </NavLink>
                    </li>
                    
                  )}
                </li>
                <li className="nav-item">
                  <NavLink exact to="/cart" className="nav-icon position-relative text-decoration-none" onClick={handleToggleClick}>
                    <i className="fa fa-fw fa-cart-arrow-down fa-sm text-dark mr-1"></i>
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                        {cartItemCount}
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
