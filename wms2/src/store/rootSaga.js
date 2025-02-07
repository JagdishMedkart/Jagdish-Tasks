import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import dashboardSaga from "@/features/dashboard/dashboardSaga";
import productSaga from "@/features/products/productSaga";
import addProductSaga from "@/features/addProduct/addProductSaga";
import productDetailSaga from "@/features/productDetails/productDetailSaga";

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), productSaga(), addProductSaga(), productDetailSaga()]);
}