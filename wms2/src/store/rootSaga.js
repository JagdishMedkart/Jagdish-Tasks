import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
// import productSaga from "../features/products/productSaga";

export default function* rootSaga() {
  yield all([authSaga()]);
}