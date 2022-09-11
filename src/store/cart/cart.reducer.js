import * as actions from "./cart.action";

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_CART_ITEMS:
      return {
        ...state,
        [actions.GET_ALL_CART_ITEMS]: action.payload
      };
    case actions.GET_CART_COUNT:
      return {
        ...state,
        [actions.GET_CART_COUNT]: action.payload
      };

    default:
      return state;
  }
};

export default productsReducer;
