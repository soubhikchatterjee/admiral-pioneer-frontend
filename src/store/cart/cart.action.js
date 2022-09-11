// Custom Components
import http from "helpers/http.helper";

export const GET_CART_ITEM = "GET_CART_ITEM";
export const GET_CART_COUNT = "GET_CART_COUNT";
export const GET_ALL_CART_ITEMS = "GET_ALL_CART_ITEMS";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const ADD_PRODUCT_TO_CART_ERRORS = "ADD_PRODUCT_TO_CART_ERRORS";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const REMOVE_PRODUCT_FROM_CART_ERRORS =
  "REMOVE_PRODUCT_FROM_CART_ERRORS";

// Get all cart items
export const getAllCartItems = () => async dispatch => {
  try {
    const response = await http.get(`/cart`);
    dispatch({
      type: GET_ALL_CART_ITEMS,
      payload: response.data
    });
    dispatch({
      type: GET_CART_COUNT,
      payload: response.data.reduce((prev, next) => prev + next.quantity, 0)
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEMS,
      payload: []
    });
  }
};

// Add a product to cart
export const addProductToCart = cartItem => async dispatch => {
  try {
    const response = await http.post(`/cart`, cartItem);
    dispatch(getAllCartItems());
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: response.data
    });
  } catch (error) {
    console.error(error?.response?.data);
    dispatch({
      type: ADD_PRODUCT_TO_CART_ERRORS,
      payload: error?.response?.data
    });
  }
};

// Remove a product to cart
export const removeProductFromCart = cartId => async dispatch => {
  try {
    const response = await http.delete(`/cart/${cartId}`);
    dispatch(getAllCartItems());
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART,
      payload: response.data
    });
  } catch (error) {
    console.error(error?.response?.data);
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART_ERRORS,
      payload: error?.response?.data
    });
  }
};
