import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";

// Reducers
import productsReducer from "./products/products.reducer";
import cartReducer from "./cart/cart.reducer";
import taxReducer from "./tax/tax.reducer";
import giftWrapReducer from "./gift-wrap/gift-wrap.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  tax: taxReducer,
  giftWrap: giftWrapReducer
});

export const middlewares = [Thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
