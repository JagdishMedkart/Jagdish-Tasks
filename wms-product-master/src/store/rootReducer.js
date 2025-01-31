import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";

export default combineReducers({
  auth: authReducer,
  products: productReducer,
});