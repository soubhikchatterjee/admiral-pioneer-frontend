// Custom Components
import http from "helpers/http.helper";

// Custom Components
export const GET_ALL_TAX = "GET_ALL_TAX";

// Get all cart items
export const getAllTax = () => async dispatch => {
  try {
    const response = await http.get(`/tax`);
    dispatch({
      type: GET_ALL_TAX,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_ALL_TAX,
      payload: []
    });
  }
};
