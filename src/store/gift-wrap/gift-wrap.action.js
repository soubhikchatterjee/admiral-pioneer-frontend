// Custom Components
import http from "helpers/http.helper";

// Custom Components
export const GET_ALL_GIFT_WRAP = "GET_ALL_GIFT_WRAP";

// Get all cart items
export const getAllGiftWrap = () => async dispatch => {
  try {
    const response = await http.get(`/gift-wrap`);
    dispatch({
      type: GET_ALL_GIFT_WRAP,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_ALL_GIFT_WRAP,
      payload: []
    });
  }
};
