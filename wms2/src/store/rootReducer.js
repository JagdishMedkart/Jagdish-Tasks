import { combineReducers } from "redux";
import {authReducer} from "../features/auth/authSlice";
import { dashboardReducer } from "@/features/dashboard/dashboardSlice";
import { productReducer } from "@/features/products/productSlice";
import { addProductReducer } from "@/features/addProduct/addProductSlice";
import { productDetailReducer } from "@/features/productDetails/productDetailSlice";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  products: productReducer,
  addProduct: addProductReducer,
  productDetail: productDetailReducer
});