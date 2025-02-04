import { combineReducers } from "redux";
import {authReducer} from "../features/auth/authSlice";
import { dashboardReducer } from "@/features/dashboard/dashboardSlice";
import { productReducer } from "@/features/products/productSlice";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  products: productReducer
});