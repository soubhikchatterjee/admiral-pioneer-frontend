import * as actions from "./gift-wrap.action";

const giftWrapReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_GIFT_WRAP:
      return {
        ...state,
        [actions.GET_ALL_GIFT_WRAP]: action.payload
      };

    default:
      return state;
  }
};

export default giftWrapReducer;
