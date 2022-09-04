import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";

// Reducers
import productsReducer from "./products/products.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
});

export const middlewares = [Thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
