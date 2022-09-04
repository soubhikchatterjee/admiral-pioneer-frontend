// Custom Components
import http from "helpers/http.helper";

export const GET_ALL_CART_ITEMS_LOADING = "GET_ALL_CART_ITEMS_LOADING";
export const GET_ALL_CART_ITEMS = "GET_ALL_CART_ITEMS";
export const GET_ALL_CART_ITEMS_ERROR = "GET_ALL_CART_ITEMS_ERROR";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

// Get all cart items
export const getAllCartItems = () => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_CART_ITEMS_LOADING,
      payload: true
    });
    const response = await http.get(`/products`);
    dispatch({
      type: GET_ALL_CART_ITEMS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEMS_ERROR,
      payload: error?.response?.data?.errors || error
    });
  } finally {
    dispatch({
      type: GET_ALL_CART_ITEMS_LOADING,
      payload: false
    });
  }
};

// Add a product to cart
export const addProductToCart = cartData => async dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: cartData
  });
};

export const reset = type => dispatch => {
  dispatch({
    type,
    payload: null
  });
};
