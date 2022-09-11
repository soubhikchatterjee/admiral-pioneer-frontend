import * as actions from "./tax.action";

const taxReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_TAX:
      return {
        ...state,
        [actions.GET_ALL_TAX]: action.payload
      };

    default:
      return state;
  }
};

export default taxReducer;
