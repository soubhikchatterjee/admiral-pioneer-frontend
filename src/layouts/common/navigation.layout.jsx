import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Custom Components
import * as cartAction from "store/cart/cart.action";

export default function Navigation() {
  const cartCount = useSelector(state => state.cart[cartAction.GET_CART_COUNT]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">
          Admiral Pioneer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products/add" className="nav-link">
                Add Product
              </NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <NavLink to="/cart" className="nav-link active">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {cartCount || 0}
                </span>
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </nav>
  );
}
