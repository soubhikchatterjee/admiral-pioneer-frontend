// Custom Components
import http from "helpers/http.helper";

export const GET_ALL_PRODUCTS_LOADING = "GET_ALL_PRODUCTS_LOADING";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_PRODUCTS_ERROR = "GET_ALL_PRODUCTS_ERROR";

export const ADD_PRODUCT_LOADING = "ADD_PRODUCT_LOADING";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";

// Get all Products
export const getAllProducts = () => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_LOADING,
      payload: true
    });
    const response = await http.get(`/products`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_ERROR,
      payload: error?.response?.data?.errors || error
    });
  } finally {
    dispatch({
      type: GET_ALL_PRODUCTS_LOADING,
      payload: false
    });
  }
};

// Add a new product
export const addProduct = postData => async dispatch => {
  try {
    dispatch({
      type: ADD_PRODUCT_LOADING,
      payload: true
    });
    const response = await http.post(`/products`, postData);
    dispatch({
      type: ADD_PRODUCT,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_ERROR,
      payload: error?.response?.data?.message?.details || error.message
    });
  } finally {
    dispatch({
      type: ADD_PRODUCT_LOADING,
      payload: false
    });
  }
};

export const reset = type => dispatch => {
  dispatch({
    type,
    payload: null
  });
};
