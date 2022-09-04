import * as actions from "./products.action";

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_PRODUCTS_LOADING:
      return {
        ...state,
        [actions.GET_ALL_PRODUCTS_LOADING]: action.payload
      };
    case actions.GET_ALL_PRODUCTS:
      return {
        ...state,
        [actions.GET_ALL_PRODUCTS]: action.payload
      };
    case actions.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        [actions.GET_ALL_PRODUCTS_ERROR]: action.payload
      };

    case actions.ADD_PRODUCT_TO_CART:
      console.log('state', state)
      return {
        ...state,
        [actions.ADD_PRODUCT_TO_CART]: action.payload
      };

    default:
      return state;
  }
};

export default productsReducer;
